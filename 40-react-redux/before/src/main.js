import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './header';
import Banner from './banner';
import MessagesList from './messages-list';
import MessagesCounter from './messages-counter';
import AddMessage from './add-message';
import ActiveRoom from './active-room'

const App = (props) => (
    <Provider store={store}>
        <p>Hello World</p>
        <Header />
        <Banner />
        <ActiveRoom />
        <MessagesCounter />
        <MessagesList />
        <AddMessage />
    </Provider>
);

ReactDOM.render(<App />, document.querySelector('main'));
