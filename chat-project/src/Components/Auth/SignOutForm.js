import React from "react";
import * as actions from "../../redux/actions";
import {useDispatch} from "react-redux";
import firebase from "../../../firebase";

export default function SignOutForm() {
    const dispatch = useDispatch();
    //TODO! switch to get data from users reducer
    const currentUser = firebase.auth().currentUser;

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(actions.userSignOut())
    }

    return (
        <form className="form-signout" onSubmit={handleSubmit}>
            <label htmlFor="signOut">Logged in as {
                currentUser ? firebase.auth().currentUser.displayName
                    : "signed out"} |
                <button id="signOut" className="btn btn-success btn-block" type="submit">
                    <i className="fas fa-sign-out-alt"/> Sign out
                </button>
            </label>
        </form>
    )
}
