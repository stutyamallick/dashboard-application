import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './appReducer';

const appStore = createStore(appReducer, applyMiddleware(thunk));

export default appStore;