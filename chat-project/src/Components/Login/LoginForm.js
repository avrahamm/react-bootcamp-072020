import React from "react";
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../../redux/actions";

export default function LoginForm({setCurForm}) {
    const dispatch = useDispatch();
    const signInErrorMessage = useSelector( state => state.users.signInErrorMessage);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(actions.userSignIn(email,password));
    }

    return (
        <form className="form-signin" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: "center"}}> Sign in</h1>
            <div className="social-login">
                <button className="btn facebook-btn social-btn" type="button"><span><i
                    className="fab fa-facebook-f"/> Sign in with Facebook</span></button>
                <button className="btn google-btn social-btn" type="button"><span>
                    <i className="fab fa-google-plus-g" /> Sign in with Google+</span></button>
            </div>
            <p style={{textAlign: "center"}}> OR </p>
            { Boolean(signInErrorMessage) ? <p style={{color:"red"}}>{signInErrorMessage}</p> : ""}
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                   autoFocus=""
                   onChange={(e) => {
                       if (signInErrorMessage) {
                           dispatch(actions.resetAuthErrors())
                       }
                       setEmail(e.target.value)
                   }}
            />
            <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                   required=""
                   onChange={(e) => {
                       if (signInErrorMessage) {
                           dispatch(actions.resetAuthErrors())
                       }
                       setPassword(e.target.value)
                   }}
            />

            <button className="btn btn-success btn-block" type="submit"><i
                className="fas fa-sign-in-alt" /> Sign in
            </button>
            <a href="#" id="forgot_pswd"
               onClick={() => {
                   if (signInErrorMessage) {
                       dispatch(actions.resetAuthErrors())
                   }
                   setCurForm('reset')
               }}
            >Forgot password?</a>
            <hr/>
            {/*<p>Don't have an account!</p>*/}
            <button className="btn btn-primary btn-block" type="button"
                    id="btn-signup"
                    onClick={() => {
                        if (signInErrorMessage) {
                            dispatch(actions.resetAuthErrors())
                        }
                        setCurForm('signUp')
                    }}
            >
                <i className="fas fa-user-plus" /> Sign up New Account
            </button>
        </form>
    )
}
