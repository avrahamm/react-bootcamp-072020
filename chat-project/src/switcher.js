import React from 'react';
import { useSelector } from 'react-redux';

import Login from './Components/Login/Login'
import MainScreen from "./Components/MainScreen/MainScreen";

const Switcher = () => {
    const username = useSelector( state => state.account.username);

    return (
        <div>
            { username ?
                <MainScreen /> :
                <Login />
            }
        </div>
    )
};

export default Switcher;