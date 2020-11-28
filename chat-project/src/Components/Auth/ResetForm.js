import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../redux/actions";

export default function ResetForm({setCurForm}) {
    const dispatch = useDispatch();
    const resetUserPasswordMessage = useSelector(state => state.users.resetUserPasswordMessage);
    const [email, setEmail] = React.useState('');
    const color = ( resetUserPasswordMessage === null || resetUserPasswordMessage === "Success!") ?
        "blue" : "red";
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(actions.resetUserPassword(email));
    }

    return (

        <form onSubmit={handleSubmit} className="form-reset">
            <p style={{color}}>{resetUserPasswordMessage}</p>

            <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required=""
                   autoFocus=""
                   onChange={ (e) => {
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
                   setCurForm('login');
               }}
            ><i className="fas fa-angle-left" /> Back</a>
        </form>
    )
}
