import React from "react";
import * as actions from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

export default function SignOutForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authUser.currentUser);
    const curUserId = useSelector(state => state.authUser.curUserId);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(actions.userSignOut(curUserId));
    }

    return (
        <form className="form-signout" onSubmit={handleSubmit}>
            <label htmlFor="signOut">Logged in as {
                currentUser ? currentUser.displayName
                    : "signed out"} |
                <button id="signOut" className="btn btn-success btn-block" type="submit">
                    <i className="fas fa-sign-out-alt"/> Sign out
                </button>
            </label>
        </form>
    )
}
