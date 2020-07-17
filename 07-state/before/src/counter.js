import React from 'react';
import { useState } from 'react';

export default function Counter(props) {
  // const count = 0;
  const [count, setCount] = useState(0)
  const [delta, setDelta] = useState(1)

    function inc() {
      setCount( oldValue => oldValue + delta )
    }

    function reset() {
      setCount(0)
    }

    function handleChangeDelta(e) {
      setDelta(Number(e.target.value))
    }

  return (
    <div>
      <label>
        Increase By:
        <input type="number" value={delta} onChange={handleChangeDelta}/>
      </label>
      <p>
        I was clicked {count} times        
        <button onClick={inc}>Click Me</button>
        <button onClick={reset}>Reset</button>
      </p>
    </div>
  );
}
