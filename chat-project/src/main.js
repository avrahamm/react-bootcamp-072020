import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css"

import store from './redux/store';
import Switcher from "./switcher";

const App = () => {

    return (
        <Provider store={store}>
            <Router>
                <div>
                    {
                        <Switcher />
                    }
                </div>
            </Router>
        </Provider>
    )
};


ReactDOM.render(<App />, document.querySelector('main'));
