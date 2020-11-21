import React from "react";
import firebase from "firebase";

export default function SignUpForm({setCurForm}) {

    function handleSubmit(e) {
        const {email, password} = e.target;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // Signed in
                console.log(user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="form-signup">
            <div className="social-login">
                <button className="btn facebook-btn social-btn" type="button"><span><i
                    className="fab fa-facebook-f"></i> Sign up with Facebook</span></button>
            </div>
            <div className="social-login">
                <button className="btn google-btn social-btn" type="button"><span><i
                    className="fab fa-google-plus-g"></i> Sign up with Google+</span></button>
            </div>

            <p style={{textAlign: "center"}}>OR</p>

            <input type="text" id="user-name" className="form-control" placeholder="Full name" required=""
                   autoFocus=""/>
            <input type="email" id="user-email" className="form-control" placeholder="Email address" required
                   autoFocus=""/>
            <input type="password" id="user-pass" className="form-control" placeholder="Password" required
                   autoFocus=""/>
            <input type="password" id="user-repeatpass" className="form-control"
                   placeholder="Repeat Password" required autoFocus=""/>

            <button className="btn btn-primary btn-block" type="submit"><i
                className="fas fa-user-plus"></i> Sign Up
            </button>
            <a href="#" id="cancel_signup"
               onClick={() => {
                   setCurForm('login')
               }}
            ><i className="fas fa-angle-left"></i> Back</a>
            <br/>
        </form>

    )
}
