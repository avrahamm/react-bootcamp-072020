import React from 'react';

export default function Score(props) {
  const {score, setScore} = props;

  return (
    <>
      <p>Your score is : {score}</p>
        <button onClick={()=> setScore(0) }>New Game</button>
    </>
  );
}


