import React, {useState } from "react";
import './Login.css'

import LoginForm from "./LoginForm";
import ResetForm from "./ResetForm";
import SignUpForm from "./SignUpForm";

const components = {
    login: LoginForm,
    reset: ResetForm,
    signUp: SignUpForm
};


/**
 * bootstrap template comes from
 * @link:https://bootsnipp.com/snippets/GavAo
 */
export default function Login() {
    const [curForm, setCurForm] = useState('login');

    const CurrentForm = components[curForm];
    console.log(`curForm = ${curForm}`);
    return (
        <div id="logreg-forms">
            <CurrentForm setCurForm={setCurForm}/>
        </div>
    )
}
