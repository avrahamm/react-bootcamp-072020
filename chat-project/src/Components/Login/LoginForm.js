import React from "react";
import {setUsername} from "../../redux/actions";
import {useDispatch} from "react-redux";
import * as actions from "../../redux/actions";
const firebase = window.firebase;

export default function LoginForm({setCurForm}) {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(actions.userSignIn(email,password));

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("Signed in");
                console.log("user = ");
                console.log(user);
                console.log(user.user.uid);

                const currentUser = firebase.auth().currentUser;
                console.log(`firebase.auth().currentUser = `);
                console.log(currentUser);
                console.log(currentUser.uid);
                dispatch(setUsername("username"));

            })
            .catch((error) => {
                console.log(error);
            });
        console.log("LoginForm:handleSubmit");
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
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                   autoFocus=""
                onChange={ (e) => { setEmail(e.target.value)}}
            />
            <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                   required=""
                   onChange={ (e) => { setPassword(e.target.value)}}
            />

            <button className="btn btn-success btn-block" type="submit"><i
                className="fas fa-sign-in-alt" /> Sign in
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
                <i className="fas fa-user-plus" /> Sign up New Account
            </button>
        </form>
    )
}
