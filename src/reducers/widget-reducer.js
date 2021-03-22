import WidgetActions from "../actions/widget-actions";

const initialState = {
    widgets: []
}

const WidgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case WidgetActions.FIND_WIDGETS_FOR_TOPIC:
            return {
                ...state,
                widgets: action.widgets
            }

        case WidgetActions.CREATE_WIDGET:
            return  {
                widgets: [
                    ...state.widgets,
                    action.widgetToCreate]
            }

        case WidgetActions.UPDATE_WIDGET:
            return {
                widgets: state.widgets.map(w => {
                    if (w.id === action.widgetToUpdate.id) {
                        return action.widgetToUpdate
                    } else {
                        return w
                    }
                })
            }

        case WidgetActions.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(w => {
                    if (w.id === action.widgetToDelete.id) {
                        return false
                    } else {
                        return true
                    }
                })
            }

        // case WidgetActions.FIND_ALL_WIDGETS:
        //     return {
        //
        //     }
        //
        // case WidgetActions.FIND_WIDGET:
        //     return {
        //
        //     }

        case WidgetActions.CLEAN_WIDGETS:
            return {
                widgets: []
            }

        default:
            return state
    }
}

export default WidgetReducer