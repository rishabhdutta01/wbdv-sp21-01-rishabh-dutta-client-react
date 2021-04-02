import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import WidgetActions from "../../actions/widget-actions";
import {connect} from "react-redux";
import {IconButton, ListSubheader, makeStyles, Paper} from "@material-ui/core";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ListItem from "@material-ui/core/ListItem";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import ImageWidget from "./image-widget";
import ListWidget from "./list-widget";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listHeading: {
        width: "100%",
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: "space-between",
    }
}));


const WidgetList = ({
                        widgets = [],
                        findWidgetsForTopic,
                        createWidget,
                        deleteWidget,
                        updateWidget,
                        setWidgetsToEmpty
                    }) => {

    const classes = useStyles();

    const {layout, courseId, moduleId, lessonId, topicId} = useParams();

    useEffect(() => {
        if (topicId !== "undefined" && typeof topicId != "undefined" &&
            lessonId !== "undefined" && typeof lessonId != "undefined" &&
            moduleId !== "undefined" && typeof moduleId != "undefined") {
            findWidgetsForTopic(topicId)
        } else {
            setWidgetsToEmpty(topicId)
        }
    }, [topicId, lessonId, moduleId, courseId])

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" className={classes.listHeading}>
                    <Typography variant="h4">
                        Widget List
                    </Typography>
                    <AddCircleIcon fontSize={"large"}
                                   color={"error"}
                                    onClick={() => createWidget(topicId)}/>
                </ListSubheader>
            }
            className={classes.root}>
            {
                widgets.map(widget => (
                    <ListItem component={Paper}
                              key={widget.id}
                              id={widget.id}>
                        {
                            widget.type === "HEADING" &&
                            <HeadingWidget
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topicId}/widgets/${widget.id}`}
                                updateWidget={updateWidget}
                                deleteWidget={deleteWidget}
                                widget={widget}/>
                        }
                        {
                            widget.type === "PARAGRAPH" &&
                            <ParagraphWidget
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topicId}/widgets/${widget.id}`}
                                updateWidget={updateWidget}
                                deleteWidget={deleteWidget}
                                widget={widget}/>
                        }
                        {
                            widget.type === "IMAGE" &&
                            <ImageWidget
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topicId}/widgets/${widget.id}`}
                                updateWidget={updateWidget}
                                deleteWidget={deleteWidget}
                                widget={widget}/>
                        }
                        {
                            widget.type === "LIST" &&
                            <ListWidget
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topicId}/widgets/${widget.id}`}
                                updateWidget={updateWidget}
                                deleteWidget={deleteWidget}
                                widget={widget}/>
                        }
                    </ListItem>
                ))
            }
        </List>
    );

}

const stpm = (state) => (
    {
        widgets: state.widgetReducer.widgets
    }
)

const dtpm = (dispatch) => {
    return {
        findWidgetsForTopic: (topicId) => WidgetActions.findWidgetsForTopic(dispatch, topicId),

        createWidget: (topicId) => WidgetActions.createWidget(dispatch, topicId),

        deleteWidget: (widget) => WidgetActions.deleteWidget(dispatch, widget),

        updateWidget: (widget) => WidgetActions.updateWidget(dispatch, widget),

        setWidgetsToEmpty: () => WidgetActions.cleanWidgets(dispatch)
    }
}

export default connect(stpm, dtpm)(WidgetList)