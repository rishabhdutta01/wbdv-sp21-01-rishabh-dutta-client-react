import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {findCourseById} from "../../services/course-service";
import {makeStyles} from "@material-ui/core/styles";
import CloseIcon from '@material-ui/icons/Close';
import {combineReducers, createStore} from "redux";
import ModuleList from "./module-list";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {IconButton} from "@material-ui/core";
import ModuleReducer from "../../reducers/module-reducer";
import LessonReducer from "../../reducers/lesson-reducer";
import TopicReducer from "../../reducers/topic-reducer";
import WidgetReducer from "../../reducers/widget-reducer";
import {Provider} from "react-redux";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills";
import Drawer from "@material-ui/core/Drawer";
import WidgetList from "../widgets/widget-list";

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
    topicReducer: TopicReducer,
    widgetReducer: WidgetReducer
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
            <AppBar id={"courseEditorAppBar"}
                    position="fixed"
                    className={classes.appBar}>
                <Toolbar>
                    <IconButton component={Link}
                                to={`/courses/${layout}`}>
                        <CloseIcon fontSize={"large"}
                                   color={"error"}
                        />
                    </IconButton>
                    <Typography id={"courseEditorTitle"} variant="h6" noWrap>
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
                    <WidgetList/>
                </div>

            </div>
        </Provider>
    );
}