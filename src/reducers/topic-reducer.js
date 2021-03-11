const initialState = {
    topics: []
}

const TopicReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FIND_TOPICS_FOR_LESSON":
            return {
                ...state,
                topics: action.topics
            }

        case "CREATE_TOPIC":
            return  {
                topics: [
                    ...state.topics,
                    action.topicToCreate]
            }

        case "UPDATE_TOPIC":
            return {
                topics: state.topics.map(t => {
                    if (t._id === action.topicToUpdate._id) {
                        return action.topicToUpdate
                    } else {
                        return t
                    }
                })
            }

        case "DELETE_TOPIC":
            return {
                topics: state.topics.filter(t => {
                    if (t._id === action.topicToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }

        case "CLEAN_TOPICS":
            return {
                topics: []
            }

        default:
            return state
    }
}

export default TopicReducer