import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import messages from './reducers/messages';
import rooms from './reducers/rooms';
import account from './reducers/account';
import logger from './middlewares/logger';

const reducer = combineReducers({ messages, rooms, account});
let preloadedState = window.localStorage.getItem('state');
preloadedState = preloadedState ? JSON.parse(preloadedState) : {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,
    preloadedState,
    composeEnhancers(
    applyMiddleware(
        logger
    ))
);
// debugger

window.store = store;
export default store;

