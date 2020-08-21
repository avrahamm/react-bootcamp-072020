import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Login from './Components/Login/Login'
import MainScreen from "./Components/MainScreen/MainScreen";

const App = () => {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState("a1");

    return (
        <div>
            { user ?
                <MainScreen /> :
                <Login />
            }
        </div>
    )
};

ReactDOM.render(<App />, document.querySelector('main'));
