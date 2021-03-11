import React, {useEffect} from 'react'
import {connect} from "react-redux"
import EditableItem from "../editable-item"
import {useParams} from "react-router-dom"
import TopicService from "../../services/topic-service";
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


const TopicPills = ({
                        topics = [],
                        findTopicsForLesson,
                        createTopic,
                        deleteTopic,
                        updateTopic,
                        setTopicsToEmpty
                    }) => {
    const classes = useStyles();

    const {layout, courseId, moduleId, lessonId, topicId} = useParams();

    useEffect(() => {
        if (lessonId !== "undefined" && typeof lessonId !== "undefined") {
            findTopicsForLesson(lessonId)
        } else {
            setTopicsToEmpty(moduleId)
        }
    }, [lessonId, moduleId, courseId])

    return (
        <AppBar className={classes.root} position="static" color={"default"}>
            <div className={"col col-11"}>
                <List className={classes.flexContainer}>
                    {
                        topics.map(topic => (
                            <ListItem className={classes.items} key={topic["_id"]}
                                      id={topic["_id"]}
                                      selected={topic._id === topicId}>
                                <EditableItem
                                    to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                                    updateItem={updateTopic}
                                    deleteItem={deleteTopic}
                                    active={true}
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
        topics: state.topicReducer.topics
    }
)

const dtpm = (dispatch) => {
    return {
        findTopicsForLesson: (lessonId) => {
            TopicService.findTopicsForLesson(lessonId)
                .then(allTopics => dispatch({
                    type: "FIND_TOPICS_FOR_LESSON",
                    topics: allTopics
                }))
        },

        createTopic: (lessonId, title) => {
            if (!(lessonId !== "undefined" && typeof lessonId !== "undefined")) {
                alert("Please select the module first to add the lesson to")
            } else {
                TopicService.createTopic(lessonId, {title: title})
                    .then(createdTopic => dispatch({
                        type: "CREATE_TOPIC",
                        topicToCreate: createdTopic
                    }))
            }
        },

        deleteTopic: (topic) => {
            TopicService.deleteTopic(topic._id)
                .then(status => dispatch(
                    {
                        type: "DELETE_TOPIC",
                        topicToDelete: topic
                    }
                ))
        },

        updateTopic: (topic) => {
            TopicService.updateTopic(topic._id, topic)
                .then(status => dispatch({
                        type: "UPDATE_TOPIC",
                        topicToUpdate: topic
                    })
                )
        },

        setTopicsToEmpty: () => {
            dispatch({
                type: "CLEAN_TOPICS"
            })
        }
    }
}

export default connect(stpm, dtpm)(TopicPills)