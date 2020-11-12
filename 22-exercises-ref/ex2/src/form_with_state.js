import React from 'react';
import {useState} from 'react';

const FormWithState = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [verification, setVerification] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    function handleChange(e) {
        const {name, value} = e.target;
        switch(name) {
            case 'name':
                setName(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'verification':
                setVerification(value);
                break;
            default:
                return;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        const password = e.target.password.value;
        const verification = e.target.verification.value;
        console.log(e.target.name.value);
        console.log(e.target.password.value);
        console.log(e.target.verification.value);
        if ( password !== verification ) {
            setError(true);
        }
        setSubmitted(true)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name:
                    <input type="text" id="name" name={"name"} value={name}
                           onChange={handleChange} />
                </label>

                <label htmlFor="password">
                    Password:
                    <input type="password" id="password" name={"password"} value={password}
                           onChange={handleChange} />
                </label>

                <label htmlFor="verification">
                    Verification:
                    <input type="password" id="verification" name={"verification"} value={verification}
                           onChange={handleChange} />
                </label>

                <input type="submit" value="Register" />
            </form>

            { (submitted && error)
                ? <div style={{color:"red"}}>"Invalid!"</div>
                : (submitted && !error) ? <div>Success</div> : ""
            }

        </div>
    )
};


export default FormWithState;