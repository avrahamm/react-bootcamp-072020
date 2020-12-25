import React from 'react';
import { useSelector } from 'react-redux';
import MainScreen from "./Components/MainScreen/MainScreen";
import {Switch,Route, Redirect} from "react-router-dom";

import SignInForm from "./Components/Auth/SignInForm";
import SignUpForm from "./Components/Auth/SignUpForm";
import ResetForm from "./Components/Auth/ResetForm";
import NotFound from "./Components/NotFound/NotFound";
import * as ROUTES from "./constants/routes";
import Profile from "./Components/Profile/Profile";

const Switcher = () => {
    const curUserId = useSelector( state => state.authUser.curUserId);

    return (
        <Switch>
            <Route path={ROUTES.SIGN_IN}>
                { Boolean(curUserId) ?
                    <Redirect to={ROUTES.HOME} /> :
                    <SignInForm />
                }
            </Route>
            <Route path={ROUTES.SIGN_UP}>
                { Boolean(curUserId) ?
                    <Redirect to={ROUTES.HOME} /> :
                    <SignUpForm />
                }
            </Route>
            <Route path={ROUTES.RESET}>
                <ResetForm />
            </Route>

            <Route path={ROUTES.PROFILE}>
                <Profile />
            </Route>

            <Route exact path={ROUTES.HOME}>
                {Boolean(curUserId) ?
                    <MainScreen /> :
                    <Redirect to={ROUTES.SIGN_IN} />
                }
            </Route>

            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
};

export default Switcher;