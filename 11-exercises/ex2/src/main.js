import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react'

// Can you rewrite it to use ONLY one numeric value in state?

const TimeUnits = () => {
  // not sure this is the best name...
  // But more important - don't save an object in state
  // state should be simple data
  // And if you insist please watch this one first:
  // https://www.tocode.co.il/bundles/react/lessons/state
    const [content, setContent] = useState(
        TimeUnits.initial
        );

    function updateByHours(e) {
        const hours = Number(e.target.value)

        let minutes = ( hours * 60 )
        let seconds = ( hours *3600 )
        const updatedContent = {
            hours,
            minutes,
            seconds
        }
        console.log(updatedContent)
        setContent(updatedContent)
    }

    function updateByMinutes(e) {
        const minutes = Number(e.target.value)

        let hours = ( minutes/60 ).toString()
        let seconds = ( minutes*60 ).toString()
        const updatedContent = {
            hours,
            minutes,
            seconds
        }
        console.log(updatedContent)
        setContent(updatedContent)
    }

    function updateBySeconds(e) {
        const seconds = Number(e.target.value)
        let hours = ( seconds/3600 ).toString()
        let minutes = ( seconds/60 ).toString()
        const updatedContent = {
            hours,
            minutes,
            seconds
        }
        console.log(updatedContent)
        setContent(updatedContent)
    }

  return (
    <div>
        <label>
            Hours
            <input type="text" value={content.hours} onChange={updateByHours}/>
        </label>
        <label>
            Minutes
            <input type="text" value={content.minutes} onChange={updateByMinutes}/>
        </label>
        <label>
            Seconds
            <input type="text" value={content.seconds} onChange={updateBySeconds}/>
        </label>
    </div>
  )
};

TimeUnits.initial = {
    'hours': 0,
    'minutes': 0,
    'seconds': 0,
}


// main.js
const root = document.querySelector('main');
ReactDOM.render(<TimeUnits />, root);
