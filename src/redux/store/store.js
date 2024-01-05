import { rootReducer } from '../Reducers/';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger/src';

// const middleware = [thunk, logger];
const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;