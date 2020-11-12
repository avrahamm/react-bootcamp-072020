import React from 'react';
import ReactDOM from 'react-dom';

import FormWithState from "./form_with_state";

const App = () => {
    return (
        <div>
            <FormWithState />
        </div>
    )
}
// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
