import React, {useState } from "react";
import './AuthSwitcher.css'

import SignInForm from "./SignInForm";
import ResetForm from "./ResetForm";
import SignUpForm from "./SignUpForm";

const components = {
    login: SignInForm,
    reset: ResetForm,
    signUp: SignUpForm
};


/**
 * bootstrap template comes from
 * @link:https://bootsnipp.com/snippets/GavAo
 */
export default function AuthSwitcher() {
    const [curForm, setCurForm] = useState('login');

    const CurrentForm = components[curForm];
    console.log(`curForm = ${curForm}`);
    return (
        <div id="logreg-forms">
            <CurrentForm setCurForm={setCurForm}/>
        </div>
    )
}
