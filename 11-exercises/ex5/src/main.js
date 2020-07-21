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

// I got the idea, but I think a loop is just as easy. When you have time try to modify
// to use a loop
    // Fixed, added rectanglesNumber, uses loop.
const ColoredRectangles = (props) => {
        const initialColor = "#800000";
        const initialDelta = 50000;

        const {rectanglesNumber} = props;
        const delta = initialDelta

        const [color, setColor] = useState(initialColor)

        function updateColor(e) {
            setColor(e.target.value)
        }

        const style = {
            backgroundColor: color,
            width: 100,
            height: 100,
            margin: 20,
        }

        let arr = new Array(rectanglesNumber).fill(null)

        return (
            <div>
                <label>
                    Please select color:
                    <input type="color" onChange={updateColor}/>
                </label>
                <ul>
                    {
                        arr.map((item, index) => {
                            let color = '#' + addHexColor((style.backgroundColor).substr(1), delta * index)
                            return (
                                <li key={index} style={{...style, backgroundColor: color}}>{color}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    };

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
    while (hexStr.length < 6) {
        hexStr = '0' + hexStr;
    } // Zero pad.
    return hexStr;
}

// main.js
const root = document.querySelector('main');
ReactDOM.render(<ColoredRectangles rectanglesNumber={10}/>, root);
