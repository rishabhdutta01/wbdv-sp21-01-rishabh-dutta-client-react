import TopicActions from "../actions/topic-actions";

const initialState = {
    topics: []
}

const TopicReducer = (state = initialState, action) => {
    switch (action.type) {
        case TopicActions.FIND_TOPICS_FOR_LESSON:
            return {
                ...state,
                topics: action.topics
            }

        case TopicActions.CREATE_TOPIC:
            return  {
                topics: [
                    ...state.topics,
                    action.topicToCreate]
            }

        case TopicActions.UPDATE_TOPIC:
            return {
                topics: state.topics.map(t => {
                    if (t._id === action.topicToUpdate._id) {
                        return action.topicToUpdate
                    } else {
                        return t
                    }
                })
            }

        case TopicActions.DELETE_TOPIC:
            return {
                topics: state.topics.filter(t => {
                    if (t._id === action.topicToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }

        case TopicActions.CLEAN_TOPICS:
            return {
                topics: []
            }

        default:
            return state
    }
}

export default TopicReducer