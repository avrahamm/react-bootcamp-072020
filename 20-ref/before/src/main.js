import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useRef } from 'react';

const App = () => {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const rootElement = useRef(null);
  const secondWordRef = useRef(null)

  function showMyThing(e) {
    const myDomElement = rootElement.current;
    alert(myDomElement.dataset.myStuff);
  }

  function setFirstWord(val) {
    setWord1(val);
    if (val.endsWith(' ')) {
      // jump focus to second word
      secondWordRef.current.focus();
    }
  }

  function setSecondWord(val) {
    setWord2(val);
  }

  return (
    <div data-my-stuff="hello" ref={rootElement}>
      <button onClick={showMyThing}>Show My Thing</button>
      <input type="text" value={word1} onChange={(e) => setFirstWord(e.target.value)} />
      <input ref={secondWordRef} type="text" value={word2} onChange={(e) => setSecondWord(e.target.value)} />
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
