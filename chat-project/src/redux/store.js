import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

import activeRoomMessages from './reducers/activeRoomMessages';
import rooms from './reducers/rooms';
import authUser from './reducers/authUser';
import activeRoomUsers from './reducers/activeRoomUsers';
import logger from './middlewares/logger';
import firebaseApi from './middlewares/firebaseApi';
import auth from './middlewares/auth';
import session from './middlewares/session';

const reducer = combineReducers({activeRoomMessages, rooms, authUser, activeRoomUsers});
let preloadedState = window.localStorage.getItem('state');
preloadedState = preloadedState ? JSON.parse(preloadedState) : {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,
    preloadedState,
    composeEnhancers(
        applyMiddleware(
            logger,
            auth,
            firebaseApi,
            session
        )
    )
);

export default store;

