import React from "react";
import {setUsername} from "../../redux/actions";
import {useDispatch} from "react-redux";
const firebase = window.firebase;

export default function SignOutForm() {
    const dispatch = useDispatch();
    const currentUser = firebase.auth().currentUser;

    function handleSubmit(e) {
        e.preventDefault();
        firebase.auth().signOut()
            .then(() => {
                // Sign out
                console.log("Signed out");
                dispatch(setUsername(null));
            })
            .catch((error) => {
                console.log(error);
            });
        console.log("SignOut:handleSubmit");
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