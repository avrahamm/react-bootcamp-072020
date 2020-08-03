import React from 'react';
import ReactDOM from 'react-dom';
import {useState} from 'react';
import StarWarsFilm from './StarWarsFilm';
import StarWarsCharacter from "./StarWarsCharacter";
import StarWarsPlanet from "./StarWarsPlanet";

const App = () => {
    const [filmId, setFilmId] = useState(1);
    const [characterId, setCharacterId] = useState(1);

    return (
        <div>
            <span style={{margin:10}}>
                <input type="number" value={filmId}
                       onChange={(e) => setFilmId(e.target.value)}/>
            </span>

            <StarWarsFilm
                id={filmId}
            />

            <hr/>

            <span style={{margin:10}}>
                <input type="number" value={characterId}
                       onChange={(e) => setCharacterId(e.target.value)}/>
            </span>
            <StarWarsCharacter
                id={characterId}
            />

            <hr/>

            <span style={{margin:10}}>
                <input type="number" value={characterId}
                       onChange={(e) => setCharacterId(e.target.value)}/>
            </span>
            <StarWarsPlanet
                id={characterId}
            />
        </div>
    )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
