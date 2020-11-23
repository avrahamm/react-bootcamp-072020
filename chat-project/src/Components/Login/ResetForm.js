import React from "react";
const firebase = window.firebase;

export default function ResetForm({setCurForm}) {
    const [email, setEmail] = React.useState('');
    function handleSubmit(e) {
        e.preventDefault();
        const auth = firebase.auth();
        auth.sendPasswordResetEmail(email).then(function() {
            console.log("Reset Email sent.");
            setCurForm('login')
        }).catch(function(error) {
            console.log(error);
        });
    }
    return (
        <form onSubmit={handleSubmit} className="form-reset">
            <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required=""
                   autoFocus=""
                   onChange={ (e) => { setEmail(e.target.value)}}
            />
            <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
            <a href="#" id="cancel_reset"
               onClick={() => {
                   setCurForm('login')
               }}
            ><i className="fas fa-angle-left" /> Back</a>
        </form>
    )
}
