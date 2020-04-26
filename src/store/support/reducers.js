import * as actionType from './actionTypes';

const initialState = {
    counter: 0,
    userData: null,
    allUsers: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.INCREMENT:
            return { ...state, counter: state.counter + action.payload }

        case actionType.DECREMENT:
            return { ...state, counter: state.counter - action.payload }

        case actionType.GET_SINGLE_USERS:
            return { ...state, userData: action.payload }

        case actionType.GET_ALL_USERS:
            return { ...state, allUsers: action.payload }

        default:
            return state
    }
}

export default reducer;