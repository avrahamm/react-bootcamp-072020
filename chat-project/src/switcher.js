import React from 'react';
import { useSelector } from 'react-redux';
import AuthSwitcher from './Components/Auth/AuthSwitcher'
import MainScreen from "./Components/MainScreen/MainScreen";

const Switcher = () => {
    const curUserId = useSelector( state => state.users.curUserId);

    return (
        <>
            { curUserId !== null ?
                <MainScreen /> :
                <AuthSwitcher />
            }
        </>
    )
};

export default Switcher;