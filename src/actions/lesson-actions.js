import LessonService from "../services/lesson-service";

const CREATE_LESSON = "CREATE_LESSON"
const DELETE_LESSON = "DELETE_LESSON"
const UPDATE_LESSON = "UPDATE_LESSON"
const FIND_LESSONS_FOR_MODULE = "FIND_LESSONS_FOR_MODULE"
const CLEAN_LESSONS = "CLEAN_LESSONS"

const createLesson = (dispatch, moduleId, title) => {
    if (!(moduleId !== "undefined" && typeof moduleId !== "undefined")) {
        alert("Please select the module first to add the lesson to")
    } else {
        LessonService.createLesson(moduleId, {title: title})
            .then(createdLesson => dispatch({
                type: CREATE_LESSON,
                lessonToCreate: createdLesson
            }))
    }
}

const deleteLesson = (dispatch, lesson) => {
    LessonService.deleteLesson(lesson._id)
        .then(status => dispatch(
            {
                type: DELETE_LESSON,
                lessonToDelete: lesson
            }
        ))
}

const updateLesson = (dispatch, lesson) => {
    LessonService.updateLesson(lesson._id, lesson)
        .then(status => dispatch({
                type: UPDATE_LESSON,
                lessonToUpdate: lesson
            })
        )
}

const findLessonsForModule = (dispatch, moduleId) => {
    LessonService.findLessonsForModule(moduleId)
        .then(allLessons => dispatch({
            type: FIND_LESSONS_FOR_MODULE,
            lessons: allLessons
        }))
}

const cleanLessons = (dispatch) => {
    dispatch({
        type: CLEAN_LESSONS
    })
}

const LessonActions = {
    createLesson,
    findLessonsForModule,
    updateLesson,
    deleteLesson,
    cleanLessons,
    CREATE_LESSON,
    UPDATE_LESSON,
    DELETE_LESSON,
    FIND_LESSONS_FOR_MODULE,
    CLEAN_LESSONS
}

export default LessonActions;