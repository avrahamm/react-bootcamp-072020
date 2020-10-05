import { combineReducers } from 'redux';
import messages from './messages';
import rooms from './rooms';
import account from './account';

const reducer = combineReducers({ messages, rooms, account });

export default reducer;