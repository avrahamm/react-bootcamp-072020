import React from 'react';
import { useSelector } from 'react-redux';
import MainScreen from "./Components/MainScreen/MainScreen";
import {Switch,Route, Redirect} from "react-router-dom";

import SignInForm from "./Components/Auth/SignInForm";
import SignUpForm from "./Components/Auth/SignUpForm";
import ResetForm from "./Components/Auth/ResetForm";
import NotFound from "./Components/NotFound/NotFound";

const Switcher = () => {
    const curUserId = useSelector( state => state.authUser.curUserId);

    return (
        <Switch>
            <Route path={"/signin"}>
                { Boolean(curUserId) ?
                    <Redirect to={"/"} /> :
                    <SignInForm />
                }
            </Route>
            <Route path={"/signup"}>
                { Boolean(curUserId) ?
                    <Redirect to={"/"} /> :
                    <SignUpForm />
                }
            </Route>
            <Route path={"/reset"}>
                <ResetForm />
            </Route>
            <Route exact path={"/"}>
                {Boolean(curUserId) ?
                    <MainScreen /> :
                    <Redirect to={"/signin"} />
                }
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
};

export default Switcher;