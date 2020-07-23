import React from 'react';
import { useState } from 'react';

export default function Board(props) {
    const {size} = props

    const [content, setContent] = useState([
        [new Cell('X'),new Cell(),new Cell()],
        [new Cell(),new Cell('O'),new Cell('O')],
        [new Cell(),new Cell(),new Cell('X')],
        ]
    )


  return (
      <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>

      </div>
  );
}

