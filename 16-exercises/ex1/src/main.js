import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Score from './score';
import Board from './board';

const RedGame = ({ numberOfElements }) => {
    const [score, setScore] = useState(0);

    // const [redIndex, setRedIndex] = useState(() => getRandomIndex());
    const [redIndex, setRedIndex] = useState(getRandomIndex);

    function updateScore(delta)
    {
        // let newScore = score + delta;
        // setScore(newScore)
        setScore(score => score + delta)
    }

  // I think a better name would be
  // getRandomIndex()
  // because you already have redIndex as a state variable
  // so getRedIndex is a bit misleading
        // Fixed
    function getRandomIndex() {
        return Math.floor(Math.random()*numberOfElements)
    }

    function getNewRedIndex()
    {
        let newRedIndex = getRandomIndex()
        if (newRedIndex === redIndex) {
            newRedIndex = (newRedIndex + 1) % numberOfElements
        }
        return newRedIndex
    }

    function resetRedIndex()
    {
        let newRedIndex = getNewRedIndex()
        setRedIndex(newRedIndex)
    }

    function resetNewGame()
    {
        setScore(0)
        resetRedIndex()
    }

  return (
    <div>
      <Score score={score} resetNewGame={resetNewGame}/>
      <hr />
      <Board
            numberOfElements={numberOfElements}
            redIndex={redIndex}
            resetRedIndex={resetRedIndex}
            updateScore={updateScore}
      />
    </div>
  )
};

RedGame.defaultProps = {
    numberOfElements: 10,
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<RedGame />, root);
