import React from 'react';
import ReactDOM from 'react-dom';
import Person from './person';

const App = () => {
    const colors = ['red', 'blue']
    return (
        <div>
            <Person
                // name="bob" age={20}
                colors={colors}/>
        </div>
    )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
