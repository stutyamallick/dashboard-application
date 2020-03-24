import { combineReducers } from 'redux';
import supportReducer from '../app-services/support/redux/reducers';

const rootReducer = combineReducers({
    support: supportReducer
})

const initialState = rootReducer({}, {});

const appReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        state = initialState;
    }
    return rootReducer(state, action);
};

export default appReducer;