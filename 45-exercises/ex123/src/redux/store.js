import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import messages from './reducers/messages';
import rooms from './reducers/rooms';
import account from './reducers/account';
import suspender from './middlewares/suspender';
import logger from './middlewares/logger';
import changeWords from './middlewares/changeWords';
import undo from './middlewares/undo';
import stateToLocalStorage from './middlewares/stateToLocalStorage';


const reducer = combineReducers({ messages, rooms, account});
let preloadedState = window.localStorage.getItem('state');
preloadedState = preloadedState ? JSON.parse(preloadedState) : {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,
    preloadedState,
    composeEnhancers(
    applyMiddleware(
        suspender, logger, undo, changeWords,
        stateToLocalStorage
    ))
);
// debugger

window.store = store;
export default store;

