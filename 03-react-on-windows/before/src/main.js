import React from 'react';
import ReactDOM from 'react-dom';

import Person from './person'

import '../css/main.css';

function MyGroup() {
    return (
        <>
            <p>1111</p>
            <p>2222</p>
        </>
    )
}

const App = () => {
    const p = Math.random()
  return (
    <div>
        <MyGroup />
        <p>1 + 1 = {1 + 1}</p>
        <Person name="a1" />
        <Person name="aaaa2" />

        { p > 0.5 ? <Person name="luck" /> : false}

    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
