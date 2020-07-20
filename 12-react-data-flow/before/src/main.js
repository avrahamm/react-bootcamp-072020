import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';

function Display(props) {
    const {count, resetCounter, isMax} = props;
    const bgColor = isMax ? "orange" : '#d2d2d2'
    return (
        <div className={'row'} style={{
            background: bgColor,
            padding: '10px 2px',
            boxShadow: '0 0 1px 1px rgba(0,0,0,0.6)',
        }}>
            <div className={'col-1'}>You scored:</div>
            <div className={'col-1'} style={{
                display: 'inline-block',
                background: 'black',
                color: 'white',
                padding: '10px',
                fontFamily: 'Orbitron, sans-serif',
            }}>{count}</div>
            <button onClick={resetCounter}>Reset</button>
        </div>
    );
}

function Counter(props) {
    const {updateCounter, resetCounter, count, isMax} = props;

    return (
        <div>
            <Display count={count} resetCounter={resetCounter} isMax={isMax}/>
            <button onClick={updateCounter}>Click Me</button>
        </div>
    );
}

const App = () => {
    const [counters, setCounters] = useState([0, 0, 0, 0]);

    function updateCounter(idx, func) {
        const updatedCounters = [...counters]
        updatedCounters[idx] = func(updatedCounters[idx]);
        setCounters(updatedCounters)
    }

    function inc(val) {
        return val + 1
    }

    function reset() {
        return 0
    }

    const max = counters.reduce((acc, val) => val > acc ? val : acc)

    return (
        <div className={'container'}>
            <Counter
                updateCounter={() => updateCounter(0, inc)}
                resetCounter={() => updateCounter(0, reset)}
                count={counters[0]}
                isMax={counters[0] === max}
            />
            <Counter
                updateCounter={() => updateCounter(1, inc)}
                resetCounter={() => updateCounter(1, reset)}
                count={counters[1]} isMax={counters[1] === max}
            />
        </div>
    )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
