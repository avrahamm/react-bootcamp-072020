import React from "react";
import { useState } from "react";
import './Login.css'

export default function Login(props) {
    const {setUser} = props;
    const [username, setUsername] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setUser(username);
        console.log("Login:handleSubmit");
    }

    return (
        <div className='app'>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="login"
                            className="fadeIn second"
                            name="login"
                            placeholder="login"
                            onChange={(e) => setUsername((e.target.value))}
                        />
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>
                </div>
            </div>
        </div>
    )
}