import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import {Carousel} from './Carousel';

const App = () => {

  return (
    <div>
        <Carousel>
            <img src="../images/la.jpg" alt="Los Angeles"/>
            <img src="../images/chicago.jpg" alt="Chicago"/>
            <img src="../images/ny.jpg" alt="New York"/>
        </Carousel>
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
