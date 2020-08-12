import { createStore } from 'redux';
import account from './reducers/account'
import messages from './reducers/messages'
import rooms from './reducers/rooms'

const reducer = function( state, action)
{
  return {
    account: account( state, action),
    messages: messages( state, action),
    rooms: rooms( state, action)
  };
}


const store = createStore(reducer);
window.store = store;
export default store;

