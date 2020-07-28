import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { useState, useEffect } from 'react';

import FilmList from './FilmList'

function ShowCharacterInfo(props)
{
    const {data} = props;

    return (
        <>
            <p><b>Name:</b> {data.name}</p>
            <p><b>Hair Color:</b> {data.hair_color}</p>
            <h4>Films</h4>
            <ul>
                {data.films.map( (url, index) => (
                    <li key={index}>{url}</li>
                ))}
            </ul>
            <FilmList films={data.films} />
        </>
    );
}

function StarWarsCharacter(props) {
  const [data, setData] = useState(null);
  const { id } = props;

  useEffect( function() {
      setData(null);
      const $xhr = $.getJSON(`https://swapi.dev/api/people/${id}/`, setData);

      return function abort()
      {
          $xhr.abort();
      }
  }, [id]);

  return (
    <div>
      <pre>Debug: id = {id}</pre>
        {data ? <ShowCharacterInfo data={data}/> : 'Loading, please wait..'}
    </div>
  );
}

const App = () => {
  const [id, setId] = useState(1);

  return (
    <div>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
      <StarWarsCharacter id={id} />
    </div>
  )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App />, root);
