import { createStore, combineReducers, applyMiddleware } from 'redux';
import messages from './reducers/messages';
import rooms from './reducers/rooms';
import account from './reducers/account';

const logger = store => next => action => {
    console.log('Action:', action)
    return next(action);
}

const changeWords = store => next => action => {
    if (action.type === 'RECEIVED_MESSAGE') {
        action.payload.text = action.payload.text.replace(/angular/g, 'react');
    }
    return next(action);
}

const reducer = combineReducers({ messages, rooms, account });

const store = createStore(reducer, applyMiddleware(logger, changeWords));
window.store = store;
export default store;

