import { combineReducers } from 'redux';
import supportReducer from '../store/support/reducers';
import maintenanceReducer from '../store/maintenance/reducers';

const rootReducer = combineReducers({
    support: supportReducer,
    maintenance: maintenanceReducer
})

const initialState = rootReducer({}, {});

const appReducer = (state, action) => {
    if (action.type === 'AUTH_LOGOUT') {
        state = initialState;
    }
    return rootReducer(state, action);
};

export default appReducer;