import React from 'react';
import {useState, useRef, useEffect} from 'react';

const FormWithRef = () => {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const verificationRef = useRef(null);

    useEffect( () => {
        nameRef.current.focus();
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        const name = nameRef.current.value;
        const password = passwordRef.current.value;
        const verification = verificationRef.current.value;
        console.log(name);
        console.log(password);
        console.log(verification);
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
                    <input ref={nameRef} type="text" id="name" name={"name"}
                           defaultValue="" />
                </label>

                <label htmlFor="password">
                    Password:
                    <input ref={passwordRef} type="password" id="password" name={"password"}
                           defaultValue="" />
                </label>

                <label htmlFor="verification">
                    Verification:
                    <input ref={verificationRef} type="password" id="verification" name={"verification"}
                           defaultValue="" />
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


export default FormWithRef;