import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Divider} from "@material-ui/core";
import TitleDialog from "./title-dialog";
import {render} from "@testing-library/react";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import ModuleActions from "../../actions/module-actions";

const useStyles = makeStyles({
    drawer: {
        width: "20%",
    },
    drawerPaper: {
        width: "20%",
    },
    drawerContainer: {
        overflow: 'auto',
    },
    drawerAddButton: {
        textAlign: "center"
    },
    selected: {
        '&.Mui-selected': {
            backgroundColor: "lightBlue",
            fontWeight: 600
        }
    }
});

function ModuleList(
    {
        moduleList = [],
        createModule = () => alert("Create Module 234"),
        deleteModule = (item) => alert("delete " + item._id),
        updateModule,
        findModulesForCourse = (courseId) => console.log(courseId),
        setModulesToEmpty
    }) {

    const classes = useStyles();

    const {layout, courseId, moduleId} = useParams();

    useEffect(() => {
        if (courseId !== "undefined" && typeof courseId !== "undefined") {
            findModulesForCourse(courseId)
        } else {
            setModulesToEmpty(moduleId)
        }
    }, [courseId])

    return (
        <Drawer id={"modulesDrawer"}
                className={classes.drawer}
                variant="permanent"
                classes={{paper: classes.drawerPaper}}>
            <Toolbar/>

            <div className={classes.drawerContainer}>
                <List id={"modulesList"}>
                    {
                        moduleList.map(module => (
                            <ListItem button
                                      key={module["_id"]}
                                      id={module["_id"]}
                                      selected={module._id === moduleId}
                                      classes={{ selected: classes.selected }}>
                                <EditableItem
                                    to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                                    updateItem={updateModule}
                                    deleteItem={deleteModule}
                                    item={module}/>
                            </ListItem>
                        ))
                    }
                </List>
            </div>

            <Divider/>

            <div className={classes.drawerAddButton}>
                <AddCircleIcon color={"error"}
                               fontSize={"large"}
                               onClick={() =>
                                   render(<TitleDialog openedByButton={true}
                                                       parentID={courseId}
                                                       createItem={createModule}/>)}>
                </AddCircleIcon>
            </div>
        </Drawer>
    )
}

const stpm = (state) => {
    return {
        moduleList: state.moduleReducer.modules
    }
}

const dtpm = (dispatch) => {
    return {
        createModule: (courseId, title) => ModuleActions.createModule(dispatch, courseId, title),

        deleteModule: (module) => ModuleActions.deleteModule(dispatch, module),

        updateModule: (module) => ModuleActions.updateModule(dispatch, module),

        findModulesForCourse: (courseId) => ModuleActions.findModulesForCourse(dispatch, courseId),

        setModulesToEmpty: () => ModuleActions.cleanModules(dispatch)
    }
}

export default connect(stpm, dtpm)(ModuleList)