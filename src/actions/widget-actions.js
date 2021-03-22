import WidgetService from "../services/widget-service";

const CREATE_WIDGET = "CREATE_WIDGET"
const DELETE_WIDGET = "DELETE_WIDGET"
const UPDATE_WIDGET = "UPDATE_WIDGET"
const FIND_WIDGETS_FOR_TOPIC = "FIND_WIDGETS_FOR_TOPIC"
const FIND_ALL_WIDGETS = "FIND_ALL_WIDGETS"
const FIND_WIDGET = "FIND_WIDGET"
const CLEAN_WIDGETS = "CLEAN_WIDGETS"

const createWidget = (dispatch, topicId) => {
    if (!(topicId !== "undefined" && typeof topicId !== "undefined")) {
        alert("Please select the topic first to add the widget to")
    } else {
        WidgetService.createWidget(topicId, {type: "HEADING", size: 1, text: "New Widget"})
            .then(createdWidget => dispatch({
                type: CREATE_WIDGET,
                widgetToCreate: createdWidget
            }))
    }
}

const deleteWidget = (dispatch, widget) => {
    WidgetService.deleteWidget(widget.id)
        .then(status => dispatch(
            {
                type: DELETE_WIDGET,
                widgetToDelete: widget
            }
        ))
}

const updateWidget = (dispatch, widget) => {
    WidgetService.updateWidget(widget.id, widget)
        .then(status => dispatch({
                type: UPDATE_WIDGET,
                widgetToUpdate: widget
            })
        )
}

const findWidgetsForTopic = (dispatch, topicId) => {
    WidgetService.findWidgetsForTopic(topicId)
        .then(allWidgets => dispatch({
            type: FIND_WIDGETS_FOR_TOPIC,
            widgets: allWidgets
        }))
}

const cleanWidgets = (dispatch) => {
    dispatch({
        type: CLEAN_WIDGETS
    })
}

const WidgetActions = {
    createWidget,
    updateWidget,
    deleteWidget,
    findWidgetsForTopic,
    cleanWidgets,
    CREATE_WIDGET,
    UPDATE_WIDGET,
    DELETE_WIDGET,
    FIND_WIDGETS_FOR_TOPIC,
    FIND_ALL_WIDGETS,
    FIND_WIDGET,
    CLEAN_WIDGETS
}

export default WidgetActions;