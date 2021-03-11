import React, {useEffect} from 'react'
import {connect} from "react-redux"
import EditableItem from "../editable-item"
import {useParams} from "react-router-dom"
import LessonService from "../../services/lesson-service"
import ModuleService from "../../services/module-service";
import {AppBar, IconButton, makeStyles, Tab, Tabs, withStyles} from "@material-ui/core";
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
        alignItems: 'center',
        justifyContent: 'center',
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
        width:"200px"
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

    const {layout, courseId, moduleId, lessonId} = useParams();

    useEffect(() => {
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        } else {
            setLessonsToEmpty(moduleId)
        }
    }, [moduleId, courseId])

    function a11yProps(index) {
        return {
            id: `scrollable-force-tab-${index}`,
            'aria-controls': `scrollable-force-tabpanel-${index}`,
        };
    }

    return (
        <AppBar className={classes.root} position="static" color={"default"}>
            <div className={"col col-11"}>
            <List className={classes.flexContainer}>
                {
                    lessons.map(lesson => (
                        <ListItem className={classes.items}  key={lesson["_id"]}
                                  id={lesson["_id"]}
                                  selected={lesson._id === lessonId}>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                                updateItem={updateLesson}
                                deleteItem={deleteLesson}
                                active={true}
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
        // <div className={"row display-flex"}>
        //     <div className={"col col-11"}>
        //         <AppBar position="static" color="default">
        //             <Tabs
        //                 // value={value}
        //                 // onChange={handleChange}
        //                 variant="scrollable"
        //                 scrollButtons="on"
        //                 indicatorColor="primary"
        //                 textColor="primary"
        //
        //                 aria-label="scrollable force tabs example">
        //                 {
        //                     lessons.map(lesson => (
        //                         <Tab classes={{wrapper: classes.wrapper}} label={
        //                             <>
        //                                 <EditableItem
        //                                     to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
        //                                     updateItem={updateLesson}
        //                                     deleteItem={deleteLesson}
        //                                     active={true}
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
        //     {/*{Array(10)*/}
        //     {/*    .fill()*/}
        //     {/*    .map((_, i) => (*/}
        //     {/*        <TabPanel value={value} index={i}>*/}
        //     {/*            Item {i + 1}*/}
        //     {/*        </TabPanel>*/}
        //     {/*    ))}*/}
        // </div>
        // <div className="p-3 bg-dark text-white">
        //     <ul className="nav nav-tabs bg-light">
        //         {
        //             lessons.map(lesson =>
        //                 <li className="nav-item active" key={`${lesson._id}`}>
        //                     <EditableItem
        //                         to={`/courses/${layout}/editor/${courseId}/${moduleId}/${lesson._id}`}
        //                         deleteItem={deleteLesson}
        //                         updateItem={updateLesson}
        //                         item={lesson}
        //                         active={lesson._id === lessonId}/>
        //                 </li>
        //             )
        //         }
        //         <li>
        //             <i onClick={() => createLesson(moduleId)} className="fas fa-plus-circle fa-2x text-danger"></i>
        //         </li>
        //     </ul>
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