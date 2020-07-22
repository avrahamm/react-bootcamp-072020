import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Score from './score';
import Board from './board';


const App = () => {
    // TODO! move redIndex from Board up to parent
    const [score, setScore] = useState(0)

    function updateScore(delta)
    {
       // let newScore = score + delta;
       // setScore(newScore)
       setScore(score => score + delta)
    }


  return (
    <div>
      <Score score={score} setScore={setScore}/>
      <hr />
      <Board numberOfElements={10} updateScore={updateScore}  />
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
