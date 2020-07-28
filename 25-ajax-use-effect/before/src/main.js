import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { useState, useEffect } from 'react';

function ShowFilmTitles(props)
{
    const {films} = props;
    const [titles, setTitles] = useState([])

    useEffect(function() {
        fetchFilms();
    }, [films]);

    function fetchFilms()
    {
        let promiseArr = []
        films.forEach( (url, index) => {
            const p = new Promise((resolve, reject) => {
                resolve($.getJSON(url));
            });
            promiseArr.push(p);
        });

        Promise.all(promiseArr).then((films) => {
            const titles = films.map( film => film.title);
            console.log(titles);
            setTitles(titles);
        });

    }

    return (
        <div>
            <h4>Film titles</h4>
            <ul>
                { titles.map( ( title, index) => (
                   <li key={index}>{title}</li>
                ))}
            </ul>
        </div>
    )
}

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
            <ShowFilmTitles films={data.films} />
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
