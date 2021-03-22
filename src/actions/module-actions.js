import ModuleService from "../services/module-service";

const CREATE_MODULE = "CREATE_MODULE"
const DELETE_MODULE = "DELETE_MODULE"
const UPDATE_MODULE = "UPDATE_MODULE"
const FIND_MODULES_FOR_COURSE = "FIND_MODULES_FOR_COURSE"
const CLEAN_MODULES = "CLEAN_MODULES"

const createModule = (dispatch, courseId, title) => {
    ModuleService.createModule(courseId, {title: title})
        .then(createdModule => dispatch({
            type: CREATE_MODULE,
            moduleToCreate: createdModule
        }))
}

const deleteModule = (dispatch, module) =>
    ModuleService.deleteModule(module._id)
        .then(status => dispatch({
            type: DELETE_MODULE,
            moduleToDelete: module
        }))

const updateModule = (dispatch, module) =>
    ModuleService.updateModule(module._id, module)
        .then(status => dispatch({
            type: UPDATE_MODULE,
            moduleToUpdate: module
        }))

const findModulesForCourse = (dispatch, courseId) => {
    ModuleService.findModulesForCourse(courseId)
        .then(allModules => dispatch({
            type: FIND_MODULES_FOR_COURSE,
            modules: allModules
        }))
}

const cleanModules = (dispatch) => {
    dispatch({
        type: CLEAN_MODULES
    })
}

const ModuleActions = {
    createModule,
    findModulesForCourse,
    updateModule,
    deleteModule,
    cleanModules,
    CREATE_MODULE,
    UPDATE_MODULE,
    DELETE_MODULE,
    FIND_MODULES_FOR_COURSE,
    CLEAN_MODULES
}

export default ModuleActions;