import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'

const ColorSelector = () => {
    const [state, setState] = useState(
        ColorSelector.initial
        );

    function updateColor(e) {
       setState({...state, color: e.target.value})
    }

    const style = {
        backgroundColor: state.color,
        width:100,
        height:100,
    }

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
