import ModuleActions from "../actions/module-actions";

const initialState = {
    modules: []
}

const ModuleReducer = (state=initialState, action) => {
    switch (action.type) {
        case ModuleActions.FIND_MODULES_FOR_COURSE:
            return {
                ...state,
                modules: action.modules
            }

        case ModuleActions.CREATE_MODULE:
            const newState1 = {
                modules: [
                    ...state.modules,
                    action.moduleToCreate
                ]
            }
            return newState1

        case ModuleActions.DELETE_MODULE:
            const newState2 = {
                modules: state.modules.filter(m => {
                    if(m._id === action.moduleToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState2

        case ModuleActions.UPDATE_MODULE:
            const newState3 = {
                modules: state.modules.map(m => {
                    if(m._id === action.moduleToUpdate._id) {
                        return action.moduleToUpdate
                    } else {
                        return m
                    }
                })
            }
            return newState3

        case ModuleActions.CLEAN_MODULES:
            return {
                modules: []
            }

        default:
            return state
    }
}

export default ModuleReducer