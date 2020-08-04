import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import {Carousel} from './Carousel';

const App = () => {

  return (
    <div>
        <Carousel>
            <img  src="../images/apple.jpg" alt="Apple"/>
            <img  src="../images/avocado.jpg" alt="Avocado"/>
            <img  src="../images/lemon.jpg" alt="Lemon"/>
        </Carousel>
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
