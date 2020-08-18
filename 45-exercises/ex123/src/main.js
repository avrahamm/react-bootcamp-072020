import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import Username from './username';
import Messages from './messages';
import AddMessage from './add-message';
import Undo from './undo';

const App = () => (
    <Provider store={store}>
        <div className='app'>
            <Username/>
            <Username/>
            <Undo/>
            <AddMessage/>
            <Messages/>
        </div>
    </Provider>
);

ReactDOM.render(<App/>, document.querySelector('main'));
