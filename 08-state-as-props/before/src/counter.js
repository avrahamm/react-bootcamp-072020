import React from 'react';
import { useState } from 'react';

export default function Counter(props) {
  const [count, setCount] = useState(0);
  const {delta, resetDelta} = props;

    function inc() {
        setCount(x => x + delta);
        // console.log(count, count + delta )
        if (count + delta > 9 ) {
            resetDelta()
        }
    }

  return (
    <div>
      <p>
        I was clicked {count} times        
        <button onClick={inc}>Click Me</button>
      </p>
    </div>
  );
}
