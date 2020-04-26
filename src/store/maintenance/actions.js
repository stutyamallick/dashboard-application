import * as actionType from './actionTypes';

export const updateFormRoutePermission = query => (dispatch) => {
    dispatch({
        type: actionType.UPDATE_FORM_ROUTE_PERMISSION,
        payload: query
    })
}