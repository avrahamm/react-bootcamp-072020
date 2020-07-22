import React from 'react';
import { useState } from 'react';

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
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          {
              Array(numberOfElements).fill(0).map((item, index) =>{
                  let theColor = "grey"
                  let score = GREY_SCORE

                  if ( index === redIndex) {
                      theColor = "red"
                      score = RED_SCORE
                  }

                  return (
                    <div onClick={() => {handleClick(score)}}
                        key={index}
                        style={{
                            width: 50,
                            height: 50,
                            backgroundColor: theColor,
                            margin: 10
                        }}
                    ></div>
                  )
              })
          }
      </div>
  );
}

