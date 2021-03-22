import LessonActions from "../actions/lesson-actions";

const initialState = {
    lessons: []
}

const LessonReducer = (state=initialState, action) => {
    switch (action.type) {
        case LessonActions.FIND_LESSONS_FOR_MODULE:
            return {
                ...state,
                lessons: action.lessons
            }

        case LessonActions.CREATE_LESSON:
            return {
                ...state,
                lessons: [
                    ...state.lessons,
                    action.lessonToCreate
                ]
            }

        case LessonActions.DELETE_LESSON:
            return {
                lessons: state.lessons.filter(l => {
                    if (l._id === action.lessonToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }

        case LessonActions.UPDATE_LESSON:
            return {
                lessons: state.lessons.map(l => {
                    if (l._id === action.lessonToUpdate._id) {
                        return action.lessonToUpdate
                    } else {
                        return l
                    }
                })
            }

        case LessonActions.CLEAN_LESSONS:
            return {
                lessons: []
            }

        default:
            return state
    }
}

export default LessonReducer