import React from 'react';
import { useState } from 'react';

// General comment regarding style.
// It is sometimes useful to define all the inner styles outside, for example:
//
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  square(color) {
    return {
      width: 50,
      height: 50,
      backgroundColor: color,
      margin: 10
    }
  }
};

// Now you can use them in code:

export default function Board(props) {
    const RED_SCORE = 10;
    const GREY_SCORE = -5;
    const {numberOfElements, redIndex, resetRedIndex, updateScore} = props

   function handleClick(score)
   {
       updateScore(score)
       if ( score === RED_SCORE) {
           resetRedIndex()
       }
   }

  return (
      <div style={styles.container}>
          {
              Array(numberOfElements).fill(0).map((item, index) =>{
                  let theColor = "grey"
                  let score = GREY_SCORE

                  if ( index === redIndex) {
                      theColor = "red"
                      score = RED_SCORE
                  }

                // why not - onClick={() => handleClick(score)} ?
                // (you have extra curly braces)
                  return (
                    <div onClick={() => {handleClick(score)}}
                        key={index}
                        style={styles.square(theColor)}
                    ></div>
                  )
              })
          }
      </div>
  );
}

