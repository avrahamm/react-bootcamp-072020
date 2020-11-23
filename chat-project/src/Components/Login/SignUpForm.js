import React from "react";
import { useDispatch } from 'react-redux';

const firebase = window.firebase;

export default function SignUpForm({setCurForm}) {
    const dispatch = useDispatch();
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [error, setError] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if ( password !== repeatPassword) {
            setError("Passwords must be equal")
        }
        // const email = "papaabram@hotmail.com";
        // const password = "123456";
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // Signed in
                console.log(`Signed up!`);
                console.log(user)
            })
            .then( () => {
                const user = firebase.auth().currentUser;
                console.log(`firebase.auth().currentUser = `);
                console.log(user);
                return user.updateProfile({
                    displayName: username,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
            })
            .then(function() {
                // Update successful.
                console.log("Update successful.");
                const user = firebase.auth().currentUser;
                const username = user.displayName;
                dispatch(setUsername(username));
            })
            .catch((error) => {
                console.log(`Sign up failed`);
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="form-signup">
            <div className="social-login">
                <button className="btn facebook-btn social-btn" type="button"><span><i
                    className="fab fa-facebook-f" /> Sign up with Facebook</span></button>
            </div>
            <div className="social-login">
                <button className="btn google-btn social-btn" type="button"><span><i
                    className="fab fa-google-plus-g" /> Sign up with Google+</span></button>
            </div>

            <p style={{textAlign: "center"}}>OR</p>

            { Boolean(error) ? <p style={{color:"red"}}>{error}</p> : ""}

            <input type="text" id="user-name" className="form-control" placeholder="Full name" required=""
                   autoFocus=""
                   onChange={ (e) => { setUsername(e.target.value)}}
            />
            <input type="email" id="user-email" className="form-control" placeholder="Email address" required
                   autoFocus=""
                   onChange={ (e) => { setEmail(e.target.value)}}
            />
            <input type="password" id="user-pass" className="form-control" placeholder="Password" required
                   autoFocus=""
                   onChange={ (e) => { setPassword(e.target.value)}}
            />
            <input type="password" id="user-repeatpass" className="form-control"
                   placeholder="Repeat Password" required autoFocus=""
                   onChange={ (e) => { setRepeatPassword(e.target.value)}}
            />

            <button className="btn btn-primary btn-block" type="submit"><i
                className="fas fa-user-plus" /> Sign Up
            </button>
            <a href="#" id="cancel_signup"
               onClick={() => {
                   setCurForm('login')
               }}
            ><i className="fas fa-angle-left" /> Back</a>
            <br/>
        </form>
    )
}
