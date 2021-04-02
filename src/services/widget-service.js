const TOPICS_URL = "http://localhost:8080/api/topics"
const WIDGETS_URL = "http://localhost:8080/api/widgets";
//const TOPICS_URL = "https://webdev-assignment1-rishabh.herokuapp.com/api/topics"
//const WIDGETS_URL = "https://webdev-assignment1-rishabh.herokuapp.com/api/widgets";

const createWidget = (topicId, widget) =>
    fetch(`${TOPICS_URL}/${topicId}/widgets`, {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }}
    ).then(response => response.json())

const findWidgetsForTopic = (topicId) =>
    fetch(`${TOPICS_URL}/${topicId}/widgets`)
        .then(response => response.json())

const findWidgetById = (widgetId) =>
    fetch(`${WIDGETS_URL}/${widgetId}`)
        .then(response => response.json())

const updateWidget = (widgetId, widget) =>
    fetch(`${WIDGETS_URL}/${widgetId}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

const deleteWidget = (widgetId) =>
    fetch(`${WIDGETS_URL}/${widgetId}`,{
        method: "DELETE"
    })
        .then(response => response.json())

const findAllWidgets = () =>
    fetch(`${WIDGETS_URL}`)
        .then(response => response.json())

const WidgetService = {
    createWidget,
    findWidgetsForTopic,
    updateWidget,
    deleteWidget,
    findWidgetById,
    findAllWidgets
}

export default WidgetService