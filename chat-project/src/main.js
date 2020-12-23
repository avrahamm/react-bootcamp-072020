import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css"

import store from './redux/store';
import Switcher from "./switcher";
import { FirebaseContext } from './contexts/FirebaseContext';
import { firebase, firebaseConfig } from '../firebase'

const App = () => {

    return (
        <ReduxProvider store={store}>
            <FirebaseContext.Provider value={{ firebase, firebaseConfig }} >
                <Router>
                    <div>
                        {
                            <Switcher />
                        }
                    </div>
                </Router>
            </FirebaseContext.Provider>
        </ReduxProvider>
    )
};


ReactDOM.render(<App />, document.querySelector('main'));
