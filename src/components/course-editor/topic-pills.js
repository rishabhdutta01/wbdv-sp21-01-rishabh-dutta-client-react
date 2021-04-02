import React, {useEffect} from 'react'
import {connect} from "react-redux"
import EditableItem from "./editable-item"
import {useParams} from "react-router-dom"
import {AppBar, IconButton, makeStyles, Tab, Tabs, withStyles} from "@material-ui/core";
import {render} from "@testing-library/react";
import TitleDialog from "./title-dialog";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import TopicActions from "../../actions/topic-actions";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:"15px",
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        width: "100%"
    },
    wrapper: {
        display: 'inline-flex',
        width: '100%',
        flexDirection: 'row',
    },
    flexContainer: {
        display: 'flex',
        overflow: "auto",
        flexDirection:"row",
    },
    items:{
        minWidth: "200px",
        width:"200px",
        border: "1px solid black",
        margin: "0px 0px 0px 10px",
        borderRadius: "50px"
    },
    selected: {
        '&.Mui-selected': {
            backgroundColor: "lightBlue",
            fontWeight: 600
        }
    }
}));

const TopicPills = ({
                        topics = [],
                        findTopicsForLesson,
                        createTopic,
                        deleteTopic,
                        updateTopic,
                        setTopicsToEmpty
                    }) => {
    const classes = useStyles();

    // const [value, setValue] = React.useState(0);
    //
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const {layout, courseId, moduleId, lessonId, topicId} = useParams();

    useEffect(() => {
        if (lessonId !== "undefined" && typeof lessonId != "undefined" &&
            moduleId !== "undefined" && typeof moduleId != "undefined" ) {
            findTopicsForLesson(lessonId)
        } else {
            setTopicsToEmpty(lessonId)
        }
    }, [lessonId, moduleId, courseId])

    return (
        <AppBar className={classes.root} position="static" color={"default"} component={Paper}>
            <div className={"col col-11"}>
                <List className={classes.flexContainer}>
                    {
                        topics.map(topic => (
                            <ListItem className={classes.items} key={topic["_id"]}
                                      id={topic["_id"]}
                                      selected={topic._id === topicId}
                                      classes={{ selected: classes.selected }}>
                                <EditableItem
                                    to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                                    updateItem={updateTopic}
                                    deleteItem={deleteTopic}
                                    item={topic}/>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
            <div className={"col col-1"}>
                <AddCircleIcon
                    color={"error"}
                    fontSize={"large"}
                    onClick={() =>
                        render(<TitleDialog openedByButton={true}
                                            parentID={lessonId}
                                            createItem={createTopic}/>)}>
                </AddCircleIcon>
            </div>
        </AppBar>
        // <div className={"row display-flex mt-4"}>
        //     <div className={"col col-11"}>
        //         <AppBar position="static" color="default">
        //             <Tabs
        //                 value={value}
        //                 onChange={handleChange}
        //                 variant="scrollable"
        //                 scrollButtons="on"
        //                 indicatorColor="primary"
        //                 textColor="primary"
        //
        //                 aria-label="scrollable force tabs example">
        //                 {
        //                     topics.map(topic => (
        //                         <Tab classes={{wrapper: classes.wrapper}}
        //                              selected={topic._id === topicId}
        //                              className={classes.items}
        //                              key={topic._id}
        //                              id={topic._id}
        //                              label={
        //                                  <>
        //                                      <EditableItem
        //                                          to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
        //                                          updateItem={updateTopic}
        //                                          deleteItem={deleteTopic}
        //                                          item={topic}/>
        //                                  </>
        //                              } />
        //                     ))
        //                 }
        //             </Tabs>
        //         </AppBar>
        //     </div>
        //     <div className={"col col-1"}>
        //         <AddCircleIcon
        //             color={"error"}
        //             fontSize={"large"}
        //             onClick={() =>
        //                 render(<TitleDialog openedByButton={true}
        //                                     parentID={moduleId}
        //                                     createItem={createTopic}/>)}>
        //         </AddCircleIcon>
        //     </div>
        // </div>
    )
}

const stpm = (state) => (
    {
        topics: state.topicReducer.topics
    }
)

const dtpm = (dispatch) => {
    return {
        findTopicsForLesson: (lessonId) => TopicActions.findTopicsForLesson(dispatch, lessonId),

        createTopic: (lessonId, title) => TopicActions.createTopic(dispatch, lessonId, title),

        deleteTopic: (topic) => TopicActions.deleteTopic(dispatch, topic),

        updateTopic: (topic) => TopicActions.updateTopic(dispatch, topic),

        setTopicsToEmpty: () => TopicActions.cleanTopics(dispatch)
    }
}

export default connect(stpm, dtpm)(TopicPills)