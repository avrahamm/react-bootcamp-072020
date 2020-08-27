import React from "react";
import { useDispatch } from 'react-redux';
import { setUsername } from "../../redux/actions";
import './Login.css'

// 1. The form is missing a label
// (placeholder does not appear everywhere)
//
// 2. Don't user onChange without value - they always come together
//
// 3. We can implement the same functionality without state easily by modifying the event handler
// 
// See my inline modifications here

export default function Login() {
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.querySelector('[name="login"]').value
        dispatch(setUsername(username));
        console.log("Login:handleSubmit");
    }
    return (
        <div className='app'>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                      <label>Select Username:
                        <input
                            type="text"
                            id="login"
                            className="fadeIn second"
                            name="login"
                            placeholder="login"
                        />
                      </label>
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>
                </div>
            </div>
        </div>
    )
}
