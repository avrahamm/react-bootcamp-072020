import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Username from './username';
import Messages from './messages';
import SendMessage from "./send_message";

const App = () => (
  <Provider store={store}>
    <div className='app'>
      <Username />      
      <Messages />
      <SendMessage />
    </div>
  </Provider>
);

export default App;
