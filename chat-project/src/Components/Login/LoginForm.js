import React from "react";
import {setUsername} from "../../redux/actions";
import {useDispatch} from "react-redux";

export default function LoginForm({setCurForm}) {
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.querySelector('[name="login"]').value
        dispatch(setUsername(username));
        console.log("Login:handleSubmit");
    }

    return (
        <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal" style={{textAlign: "center"}}> Sign in</h1>
            <div className="social-login">
                <button className="btn facebook-btn social-btn" type="button"><span><i
                    className="fab fa-facebook-f"></i> Sign in with Facebook</span></button>
                <button className="btn google-btn social-btn" type="button"><span><i
                    className="fab fa-google-plus-g"></i> Sign in with Google+</span></button>
            </div>
            <p style={{textAlign: "center"}}> OR </p>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                   autoFocus=""/>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                   required=""/>

            <button className="btn btn-success btn-block" type="submit"><i
                className="fas fa-sign-in-alt"></i> Sign in
            </button>
            <a href="#" id="forgot_pswd"
               onClick={() => {setCurForm('reset')}}
            >Forgot password?</a>
            <hr/>
            {/*<p>Don't have an account!</p>*/}
            <button className="btn btn-primary btn-block" type="button"
                    id="btn-signup"
                    onClick={() => {setCurForm('signUp')}}
            >
                <i className="fas fa-user-plus"></i> Sign up New Account
            </button>
        </form>
    )
}
