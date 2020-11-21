import React from "react";

export default function ResetForm({setCurForm}) {
    return (
        <form action="/reset/password/" className="form-reset">
            <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required=""
                   autoFocus=""/>
            <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
            <a href="#" id="cancel_reset"
               onClick={() => {
                   setCurForm('login')
               }}
            ><i className="fas fa-angle-left"></i> Back</a>
        </form>
    )
}
