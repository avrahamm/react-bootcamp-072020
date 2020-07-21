import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'

const GuessNumber = (props) => {
  // Same comment - please save each "part" of state in a different useState call
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);
  // ...

    const {range} = props;
    const [random, setRandom] = useState(generateRandom())
    const [guess, setGuess] = useState(0)
    const initialHint = 'Start guessing:)';
    const [hint, setHint] = useState(initialHint)

    function reset() {
        setRandom(generateRandom())
        setGuess(0)
        setHint(initialHint)
    }

    function generateRandom() {
        return Math.round(Math.random()*range)
    }

    function updateGuess(e) {
        const guess = Number(e.target.value)
        setGuess(guess)
    }

    function checkGuess() {
        let curHint = "Greater"
        if ( guess === random) {
            curHint = "Exact answer! Well Done!"
        }
        else if (guess < random) {
            curHint = "Less"
        }
        setHint(curHint)
    }

  return (
    <div>
        <label>
            Please guess a number in range [0..{range}]
            <input type="text" value={guess} onChange={updateGuess}/>
        </label>
        <p>Hint: {hint} </p>
        <button type="button" onClick={checkGuess}>Check</button>
        <button type="button" onClick={reset}>Reset</button>

    </div>
  )
};

// main.js
const root = document.querySelector('main');
ReactDOM.render(<GuessNumber range={20}/>, root);
