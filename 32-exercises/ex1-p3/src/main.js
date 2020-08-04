import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const App = () => {

  return (
    <div>
        <Carousel>
            <div>
                <img src="../images/la.jpg" alt="Los Angeles"/>
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="../images/chicago.jpg" alt="Chicago"/>
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="../images/ny.jpg" alt="New York"/>
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
