import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'

const MultiInput = () => {
    const [content, setContent] = useState('');

    function updateContent(e) {
        setContent(e.target.value)
    }
  return (
    <div>
        <label>
            1st
            <input type="text" value={content} onChange={updateContent}/>
        </label>
        <label>
            2nd
            <input type="text" value={content} onChange={updateContent}/>
        </label>
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<MultiInput />, root);
