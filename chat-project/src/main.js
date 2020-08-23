import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Login from './Components/Login/Login'
import MainScreen from "./Components/MainScreen/MainScreen";
// import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState(null);

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
