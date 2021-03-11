import React, {useEffect} from 'react'
import {connect} from "react-redux"
import EditableItem from "../editable-item"
import {useParams} from "react-router-dom"
import LessonService from "../../services/lesson-service"
import {AppBar, IconButton, makeStyles, Paper, Tab, Tabs, withStyles} from "@material-ui/core";
import {render} from "@testing-library/react";
import TitleDialog from "./title-dialog";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    root: {
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
        border: "0px 1px 0px 1px solid black",
        boxShadow: "2px 2px 1px black",
        margin: "0px 0px 0px 10px"
    },
    selected: {
        '&.Mui-selected': {
            backgroundColor: "lightBlue",
            fontWeight: 600
        }
    }
}));

const LessonTabs = ({
                        lessons = [],
                        findLessonsForModule,
                        createLesson,
                        deleteLesson,
                        updateLesson,
                        setLessonsToEmpty
                    }) => {
    const classes = useStyles();

    // const [value, setValue] = React.useState(0);
    //
    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const {layout, courseId, moduleId, lessonId} = useParams();

    useEffect(() => {
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        } else {
            setLessonsToEmpty(moduleId)
        }
    }, [moduleId, courseId])

    return (
        <AppBar className={classes.root} position="static" color={"default"} component={Paper}>
            <div className={"col col-11"}>
                <List className={classes.flexContainer}>
                    {
                        lessons.map(lesson => (
                            <ListItem className={classes.items}
                                      button
                                      key={lesson["_id"]}
                                      id={lesson["_id"]}
                                      selected={lesson._id === lessonId}
                                      classes={{ selected: classes.selected }}>
                                <EditableItem
                                    to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                                    updateItem={updateLesson}
                                    deleteItem={deleteLesson}
                                    item={lesson}/>
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
                                            parentID={moduleId}
                                            createItem={createLesson}/>)}>
                </AddCircleIcon>
            </div>
        </AppBar>
        // <div className={"row display-flex align-items-center"}>
        //     <div className={"col col-11"}>
        //         <AppBar position="static" color="default">
        //             <Tabs
        //                 value={value}
        //                 onChange={handleChange}
        //                 variant="scrollable"
        //                 scrollButtons="on"
        //                 indicatorColor="primary"
        //                 textColor="primary"
        //                 aria-label="scrollable force tabs example">
        //                 {
        //                     lessons.map(lesson => (
        //                         <Tab classes={{wrapper: classes.wrapper}}
        //                              selected={lesson._id === lessonId}
        //                              className={classes.items}
        //                              key={lesson._id}
        //                              id={lesson._id}
        //                              label={
        //                             <>
        //                                 <EditableItem
        //                                     to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
        //                                     updateItem={updateLesson}
        //                                     deleteItem={deleteLesson}
        //                                     item={lesson}/>
        //                             </>
        //                         } />
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
        //                                     createItem={createLesson}/>)}>
        //         </AddCircleIcon>
        //     </div>
        // </div>
    )
}

const stpm = (state) => (
    {
        lessons: state.lessonReducer.lessons
    }
)

const dtpm = (dispatch) => {
    return {
        findLessonsForModule: (moduleId) => {
            LessonService.findLessonsForModule(moduleId)
                .then(allLessons => dispatch({
                    type: "FIND_LESSONS_FOR_MODULE",
                    lessons: allLessons
                }))
        },

        createLesson: (moduleId, title) => {
            if (!(moduleId !== "undefined" && typeof moduleId !== "undefined")) {
                alert("Please select the module first to add the lesson to")
            } else {
                LessonService.createLesson(moduleId, {title: title})
                    .then(createdLesson => dispatch({
                        type: "CREATE_LESSON",
                        lessonToCreate: createdLesson
                    }))
            }
        },

        deleteLesson: (lesson) => {
            LessonService.deleteLesson(lesson._id)
                .then(status => dispatch(
                    {
                        type: "DELETE_LESSON",
                        lessonToDelete: lesson
                    }
                ))
        },

        updateLesson: (lesson) => {
            LessonService.updateLesson(lesson._id, lesson)
                .then(status => dispatch({
                        type: "UPDATE_LESSON",
                        lessonToUpdate: lesson
                    })
                )
        },

        setLessonsToEmpty: () => {
            dispatch({
                type: "CLEAN_LESSONS"
            })
        }
    }
}

export default connect(stpm, dtpm)(LessonTabs)