import * as actionType from './actionTypes';

const initialState = {
    formRoutePermission: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.UPDATE_FORM_ROUTE_PERMISSION:
            return { ...state, formRoutePermission: action.payload }

        default:
            return state
    }
}

export default reducer;