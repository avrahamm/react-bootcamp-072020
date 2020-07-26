import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import FormZero from "./FormZero";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";

const App = () => {
  const FORM_ZERO = 0;
  const FORM_ONE = 1;
  const FORM_TWO = 2;

  const [username,  setUsername] = useState('');
  const [password,  setPassword] = useState('');
  const [country,  setCountry] = useState('');
  const [city,  setCity] = useState('');
  const [curFormIndex, setCurFormIndex] = useState(FORM_ZERO);

  function updateCurFormIndex(delta)
  {
    setCurFormIndex( x => x + delta);
  }

    let curForm = <FormZero
        updateCurFormIndex={updateCurFormIndex}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
    />

  if (curFormIndex === FORM_ONE) {
        curForm = <FormOne
            updateCurFormIndex={updateCurFormIndex}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
        />;
    }
    else if (curFormIndex === FORM_TWO) {
        curForm = <FormTwo
            updateCurFormIndex={updateCurFormIndex}
            username={username}
            password={password}
            country={country}
            city={city}
        />;
    }
  return (
    <>
        {curForm}
    </>
  );
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
