import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'
// TODO!
// import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * I have made with 3 divs only,
 * yet I hope I got the idea.
 * Delta is used to create picked color variations.
 * @returns {*}
 * @constructor
 */
const ColoredRectangles = () => {
    const [state, setState] = useState(
        ColoredRectangles.initial
        );

    function updateColor(e) {
       setState({...state, color: e.target.value})
    }

    const style = {
        backgroundColor: state.color,
        width:100,
        height:100,
    }

    let color1 = '#' + addHexColor((style.backgroundColor).substr(1),state.delta)
    console.log('color1 =' + color1)
    let color2 = '#' + addHexColor((style.backgroundColor).substr(1),2*state.delta)
    console.log(`color2 = ${color2}`)
  return (
      <div>
          <label>
              Please select color:
              <input type="color" onChange={updateColor}/>
          </label>
          <div style={style}>One</div>
          <br/>
          <div style={{...style, backgroundColor: color1 }}>Two</div>
          <br/>
          <div style={{...style, backgroundColor: color2 }}>Three</div>
          <br/>
      </div>
  )
};

ColoredRectangles.initial = {
    color: "#000000",
    delta: 400000
}

/**
 * @link:https://stackoverflow.com/questions/11023144/working-with-hex-strings-and-hex-values-more-easily-in-javascript
 * Creates hex color variations
 * @param c1
 * @param c2
 * @returns {string}
 */
function addHexColor(c1, c2) {
        // debugger
    let hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
    return hexStr;
}

// main.js
const root = document.querySelector('main');
ReactDOM.render(<ColoredRectangles />, root);
