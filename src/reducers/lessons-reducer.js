const initialState = {
    lessons: []
}

const LessonReducer = (state=initialState, action) => {
    switch (action.type) {
        case "FIND_LESSONS_FOR_MODULE":
            return {
                ...state,
                lessons: action.lessons
            }

        case "CREATE_LESSON":
            return {
                ...state,
                lessons: [
                    ...state.lessons,
                    action.lessonToCreate
                ]
            }

        case "DELETE_LESSON":
            return {
                lessons: state.lessons.filter(l => {
                    if (l._id === action.lessonToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }

        case "UPDATE_LESSON":
            return {
                lessons: state.lessons.map(l => {
                    if (l._id === action.lessonToUpdate._id) {
                        return action.lessonToUpdate
                    } else {
                        return l
                    }
                })
            }

        case "CLEAN_LESSONS":
            return {
                lessons: []
            }

        default:
            return state
    }
}

export default LessonReducer