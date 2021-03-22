import TopicService from "../services/topic-service";

const CREATE_TOPIC = "CREATE_TOPIC"
const DELETE_TOPIC = "DELETE_TOPIC"
const UPDATE_TOPIC = "UPDATE_TOPIC"
const FIND_TOPICS_FOR_LESSON = "FIND_TOPICS_FOR_LESSON"
const CLEAN_TOPICS = "CLEAN_TOPICS"

const createTopic = (dispatch, lessonId, title) => {
    if (!(lessonId !== "undefined" && typeof lessonId !== "undefined")) {
        alert("Please select the lesson first to add the topic to")
    } else {
        TopicService.createTopic(lessonId, {title: title})
            .then(createdTopic => dispatch({
                type: CREATE_TOPIC,
                topicToCreate: createdTopic
            }))
    }
}

const deleteTopic = (dispatch, topic) => {
    TopicService.deleteTopic(topic._id)
        .then(status => dispatch(
            {
                type: DELETE_TOPIC,
                topicToDelete: topic
            }
        ))
}

const updateTopic = (dispatch, topic) => {
    TopicService.updateTopic(topic._id, topic)
        .then(status => dispatch({
                type: UPDATE_TOPIC,
                topicToUpdate: topic
            })
        )
}

const findTopicsForLesson = (dispatch, lessonId) => {
    TopicService.findTopicsForLesson(lessonId)
        .then(allTopics => dispatch({
            type: FIND_TOPICS_FOR_LESSON,
            topics: allTopics
        }))
}

const cleanTopics = (dispatch) => {
    dispatch({
        type: CLEAN_TOPICS
    })
}

const TopicActions = {
    createTopic,
    findTopicsForLesson,
    updateTopic,
    deleteTopic,
    cleanTopics,
    CREATE_TOPIC,
    UPDATE_TOPIC,
    DELETE_TOPIC,
    FIND_TOPICS_FOR_LESSON,
    CLEAN_TOPICS
}

export default TopicActions;