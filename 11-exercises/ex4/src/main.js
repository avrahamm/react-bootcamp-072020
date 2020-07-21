import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'

// So look (about the multiple state vars. I've changed it to illustrate):
const ColorSelector = () => {
    const [color, setColor] = useState('black');

    function updateColor(e) {
        // console.log(e.target.value)
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
  // Fixed

  return (
    <div>
        <label>
            Please select color:
            <input type="color" onChange={updateColor} />
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
