import React from 'react';

export default function Score(props) {
  const {score, resetNewGame} = props;

  return (
    <>
      <p>Your score is : {score}</p>
        <button onClick={resetNewGame }>New Game</button>
    </>
  );
}


