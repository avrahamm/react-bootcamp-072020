import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'

const GuessNumber = () => {
  // Same comment - please save each "part" of state in a different useState call
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);
  // ...
    const [state, setState] = useState(
        {...GuessNumber.initial, random: generateRandom()}
        );

    function reset() {
        setState({...GuessNumber.initial, random: generateRandom()})
    }

    function generateRandom() {
        return Math.round(Math.random()*GuessNumber.range)
    }

    function updateGuess(e) {
        const guess = Number(e.target.value)
        setState({...state, guess})
        console.log(state)
    }

    function checkGuess() {
        let hint = "Greater"
        if ( state.guess === state.random) {
            hint = "Exact answer! Well Done!"
        }
        else if ( state.guess < state.random) {
            hint = "Less"
        }
        setState({...state, hint})
        console.log(state)
    }

  return (
    <div>
        <label>
            Please guess a number in range [0..{GuessNumber.range}]
            <input type="text" value={state.guess} onChange={updateGuess}/>
        </label>
        <p>Hint: {state.hint} </p>
        <button type="button" onClick={checkGuess}>Check</button>
        <button type="button" onClick={reset}>Reset</button>

    </div>
  )
};

GuessNumber.range = 20
GuessNumber.initial = {
    'random': 0,
    'guess': 0,
    'hint': ''
}


// main.js
const root = document.querySelector('main');
ReactDOM.render(<GuessNumber />, root);
