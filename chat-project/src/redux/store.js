import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import messages from './reducers/messages';
import rooms from './reducers/rooms';
import users from './reducers/users';
import logger from './middlewares/logger';
import firebaseApi from './middlewares/firebaseApi';
import auth from './middlewares/auth';

const reducer = combineReducers({messages, rooms, users});
let preloadedState = window.localStorage.getItem('state');
preloadedState = preloadedState ? JSON.parse(preloadedState) : {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(
            logger,
            auth,
            firebaseApi
        )
    )
);

export default store;

