import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'

const MultiInput = (props) => {
    const [content, setContent] = useState('');
    const {inputNumber} = props
    const arrByInputSize = new Array(inputNumber).fill(null)

    function updateContent(e) {
        setContent(e.target.value)
    }
  // Cool. Can you modify it to 5? 10? 50?
    // Fixed by inputNumber and map
  return (    
    <div>
        {arrByInputSize.map( () => (
            <label>
                1st
                <input type="text" value={content} onChange={updateContent}/>
            </label>
            )
        )}
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<MultiInput inputNumber={3} />, root);
