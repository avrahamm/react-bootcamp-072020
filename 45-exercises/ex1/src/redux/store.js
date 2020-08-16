import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import messages from './reducers/messages';
import rooms from './reducers/rooms';
import account from './reducers/account';
import suspender from './middlewares/suspender';
import logger from './middlewares/logger';
import changeWords from './middlewares/changeWords';


const reducer = combineReducers({ messages, rooms, account });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(suspender, logger, changeWords))
);
window.store = store;
export default store;

