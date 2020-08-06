import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';

function withClock(Component)
{
  return function WithClock(props)
  {
    const [ticks, setTicks] = useState(0);

    function tick() {
      setTicks(t => t + 1);
    }

    useEffect(function() {
      const timer = setInterval(tick, 1000);

      return function abort() {
        clearInterval(timer);
      }
    }, []);

    return <Component {...props} ticks={ticks} />
  }
}

const NewsTicker = withClock(class NewsTicker extends React.Component {

  render() {
    const { items, ticks } = this.props;
    const itemIndex = ticks % items.length ;
    // console.log(`NewsTicker render ${itemIndex}`)

    return (
        <p>{items[itemIndex]}</p>
    );
  }
});


const Clock = withClock(class Clock extends React.Component {
  render() {
    const { ticks } = this.props;

    return (
        <p>Ticks... {ticks}</p>
    );
  }
});

const DoubleClock = withClock(function DoubleClock(props) {
  const {ticks} = props;
  return <p>Double {2 * ticks}</p>
});


const App = () => {

  const items = [
    "I lit up from Reno",
    "I was trailed by twenty hounds",
    "Didn't get to sleep that night",
    "Till the morning came around",
  ];

  return (
      <div>
        <Clock />
        <NewsTicker items={items} />
        <DoubleClock />
      </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
