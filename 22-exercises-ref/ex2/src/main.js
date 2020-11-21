import React from 'react';
import ReactDOM from 'react-dom';

import FormWithState from "./form_with_state";
import FormWithRef from "./form_with_ref";

const App = () => {
    return (
        <div>
            <FormWithRef />
        </div>
    )
}
// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
