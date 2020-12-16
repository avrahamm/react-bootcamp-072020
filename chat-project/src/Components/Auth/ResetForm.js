import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";

import './AuthSwitcher.css'
import * as actions from "../../redux/actions";

export default function ResetForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const resetUserPasswordMessage = useSelector(state => state.authUser.resetUserPasswordMessage);
    const [email, setEmail] = React.useState('');
    const color = (resetUserPasswordMessage === null || resetUserPasswordMessage === "Success!") ?
        "blue" : "red";

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(actions.resetUserPassword(email));
    }

    return (
        <div id="logreg-forms">
            <form onSubmit={handleSubmit} className="form-reset">
                <p style={{color}}>{resetUserPasswordMessage}</p>

                <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required=""
                       autoFocus=""
                       onChange={(e) => {
                           if (resetUserPasswordMessage) {
                               dispatch(actions.resetAuthErrors())
                           }
                           setEmail(e.target.value);
                       }}
                />
                <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
                <a href="#" id="cancel_reset"
                   onClick={() => {
                       if (resetUserPasswordMessage) {
                           dispatch(actions.resetAuthErrors())
                       }
                       history.push("/signin");
                   }}
                ><i className="fas fa-angle-left"/> Back</a>
            </form>
        </div>
    )
}
