import React from 'react';
import { useState } from 'react';

export default function Board(props) {
    const RED_SCORE = 10;
    const GREY_SCORE = -5;
    const {numberOfElements, updateScore} = props
    const [redIndex, setRedIndex] = useState(getRedIndex())

   function getRedIndex() {
        return Math.floor(Math.random()*numberOfElements)
   }

   function handleClick(score)
   {
       updateScore(score)
       if ( score === RED_SCORE) {
           let newRedIndex = getNewRedIndex()
           setRedIndex(newRedIndex)
       }
   }

   function getNewRedIndex()
   {
       let newRedIndex = getRedIndex()
       if (newRedIndex === redIndex) {
           newRedIndex = (newRedIndex + 1) % numberOfElements
       }
       return newRedIndex
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

