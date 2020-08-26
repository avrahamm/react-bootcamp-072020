import ReactDOM from 'react-dom';
import React, { useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css"
import "jquery";
import Login from './Components/Login/Login'
import MainScreen from "./Components/MainScreen/MainScreen";

const App = () => {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState(null);

    return (
        <div>
            { user ?
                <MainScreen /> :
                <Login setUser={setUser}/>
            }
        </div>
    )
};

ReactDOM.render(<App />, document.querySelector('main'));
