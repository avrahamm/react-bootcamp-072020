import { createStore, combineReducers, applyMiddleware } from 'redux';
import messages from './reducers/messages';
import rooms from './reducers/rooms';
import account from './reducers/account';

// { type: 'ALERT', payload: 'hello world', meta: { delay: 1000 } }
const suspender = store => next => action => {
    if( action.hasOwnProperty('meta') && action.meta.hasOwnProperty('delay')) {
        console.log('meta', action.meta);
        setTimeout(() => {
            console.log("suspender completed");
            return next(action);
        }, action.meta.delay )
    }
    else {
        return next(action);
    }
}

const logger = store => next => action => {
    console.log('Action:', action)
    return next(action);
}

const changeWords = store => next => action => {
    if (action.type === 'RECEIVED_MESSAGE') {
        console.log('changeWords');
        action.payload.text = action.payload.text.replace(/angular/g, 'react');
    }
    return next(action);
}

const reducer = combineReducers({ messages, rooms, account });

const store = createStore(reducer, applyMiddleware(suspender, logger, changeWords));
window.store = store;
export default store;

