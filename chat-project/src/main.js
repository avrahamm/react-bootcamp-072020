import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store';

import "bootstrap/dist/css/bootstrap.min.css"
import "jquery";
import Switcher from "./switcher";

const App = () => {

    return (
        <Provider store={store}>
            <div>
                {
                    <Switcher />
                }
            </div>
        </Provider>
    )
};

ReactDOM.render(<App />, document.querySelector('main'));
