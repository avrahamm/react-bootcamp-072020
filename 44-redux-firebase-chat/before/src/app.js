import React from 'react';
import Username from './username';
import Messages from './messages';
import SendMessage from "./send_message";

const App = () => (
    <div className='app'>
      <Username />      
      <Messages />
      <SendMessage />
    </div>
);

export default App;
