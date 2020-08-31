import React from 'react';
import { useSelector } from 'react-redux';

import Login from './Components/Login/Login'
import MainScreen from "./Components/MainScreen/MainScreen";

const Switcher = () => {
    const curUserId = useSelector( state => state.users.curUserId);

    return (
        <>
            { curUserId !== null ?
                <MainScreen /> :
                <Login />
            }
        </>
    )
};

export default Switcher;