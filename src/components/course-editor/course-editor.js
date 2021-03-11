import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {breakpoints} from "../course-table/course-table";
import {findCourseById} from "../../services/course-service";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import {combineReducers, createStore} from "redux";
import './course-editor.css';
import ModuleList from "./module-list";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {IconButton} from "@material-ui/core";
import ModuleReducer from "../../reducers/modules-reducer";
import LessonReducer from "../../reducers/lessons-reducer";
import TopicReducer from "../../reducers/topic-reducer";
import {Provider} from "react-redux";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    noOverflow: {
        flexGrow: 1,
        overflowX: "hidden"
    }
}));

const reducer = combineReducers({
    moduleReducer: ModuleReducer,
    lessonReducer: LessonReducer,
    topicReducer: TopicReducer
})

const store = createStore(reducer)

export default function CourseEditor() {
    const classes = useStyles();

    const {layout, courseId, moduleId} = useParams();

    const [courseTitle, setCourseTitle] = useState({title: ""})

    useEffect(() => {
        findCourseById(courseId).then(course => {
            setCourseTitle({title: course.title})
        })
    }, [courseId]);

    return (
        <Provider store={store}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton component={Link} to={`/courses/${layout}`}>
                        <CloseIcon fontSize={"large"}
                                   color={"error"}
                                   />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {courseTitle.title}
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.root}>
                    <ModuleList/>

                <div className={classes.noOverflow}>
                    <Toolbar/>
                    <LessonTabs/>
                    <TopicPills/>
                </div>
            </div>
        </Provider>
    );
}