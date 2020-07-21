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

    // Fixed - all is calculated by hours.

    const [hours, setHours] = useState(0);

    const MIN_IN_HOUR = 60;
    const SECONDS_IN_HOUR = 3600;

    function updateHours(e, unitAdapter = 1) {
        const rawInput = Number(e.target.value)
        const adaptedToHours = rawInput / unitAdapter
        setHours(adaptedToHours)

    }

    return (
        <div>
            <label>
                Hours
                <input type="number" value={hours} onChange={(e) => {
                    updateHours(e)
                }}/>
            </label>
            <label>
                Minutes
                <input type="number" value={hours * MIN_IN_HOUR} onChange={(e) => {
                    updateHours(e, MIN_IN_HOUR)
                }}/>
            </label>
            <label>
                Seconds
                <input type="number" value={hours * SECONDS_IN_HOUR} onChange={(e) => {
                    updateHours(e, SECONDS_IN_HOUR)
                }}/>
            </label>
        </div>
    )
};

// main.js
const root = document.querySelector('main');
ReactDOM.render(<TimeUnits/>, root);
