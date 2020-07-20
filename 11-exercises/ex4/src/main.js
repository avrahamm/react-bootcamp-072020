import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'

// So look (about the multiple state vars. I've changed it to illustrate):
const ColorSelector = () => {
    const [color, setColor] = useState('black');

    function updateColor(e) {
       setColor(e.target.value);
    }

    const style = {
        backgroundColor: color,
        width:100,
        height:100,
    }

  // HTML now has an
  // <input type="color" />
  // and it's cool

  return (
    <div>
        <label>
            Please select color:
            <select id="mySelect" onChange={updateColor}>
                <option value="black">black</option>
                <option value="blue">blue</option>
                <option value="green">green</option>
                <option value="orange">orange</option>
            </select>
        </label>

        <div style={ style } > Hello!
        </div>
    </div>
  )
};

ColorSelector.initial = {
    color: "black"
}
// main.js
const root = document.querySelector('main');
ReactDOM.render(<ColorSelector />, root);
