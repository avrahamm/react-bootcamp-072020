import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../redux/actions";
import * as ROUTES from "../../constants/routes";

export default function SignOutForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authUser.currentUser);
    const curUserId = useSelector(state => state.authUser.curUserId);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(actions.userSignOut(curUserId));
    }

    return (
        <>
            <form className="form-signout" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-1">
                        <label htmlFor="signOut">Logged in as {
                            currentUser ? currentUser.displayName
                                : "signed out"} |
                            <button id="signOut" className="btn btn-success btn-block" type="submit">
                                <i className="fas fa-sign-out-alt"/> Sign out
                            </button>
                        </label>
                    </div>
                </div>

                <div className="row">
                    <Link to={ROUTES.PROFILE}>
                        <div className="col-md-1"><h3>Profile</h3></div>
                    </Link>
                </div>
            </form>
        </>
    )
}
