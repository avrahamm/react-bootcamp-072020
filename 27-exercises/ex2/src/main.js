import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {useState, useEffect} from 'react';


function ShowEntityInfo(props) {
    const {entity, data, attributes} = props;
    console.log(data);
    return (
        <div>
            <h4>{entity}</h4>
            <ul>
                {
                    attributes.map((attribute, index) => (
                            <li key={index + attribute}><b>{attribute}:</b> {data[attribute]}</li>
                        )
                    )}
            </ul>
        </div>
    );
}

function StarWarsEntity(props) {
    const [data, setData] = useState(null);
    const {entity, id, attributes} = props;
    const SWAPI_API_URL = 'https://swapi.dev/api/';

    useEffect(function () {
        setData(null);
        const $xhr = $.getJSON(`${SWAPI_API_URL}${entity}/${id}/`,
            (data) => {
                setData(data);
                // console.log(Object.keys(data));
            });

        return function abort() {
            $xhr.abort();
        }
    }, [entity, id]);

    return (
        <div>
            {data ? <ShowEntityInfo entity={entity} data={data} attributes={attributes}/> : 'Loading, please wait..'}
        </div>
    );
}

const App = () => {
    const entities = ['people', 'films','planets'];
    const entityAttributes = {
        'people': ['name', 'hair_color'],
        'films': ['title', 'opening_crawl'],
        'planets': ["name", "rotation_period", "population"],
    };
    const [entity, setEntity] = useState('people');
    const [id, setId] = useState(1);

    return (
        <div>
            <span style={{margin:10}}>
                <input type="number" value={id} onChange={(e) => setId(e.target.value)}/>
            </span>
            <span>
                <select defaultValue={""}
                        onChange={(e) => setEntity(e.target.value)}>
                    <option key={0} disabled value="" > Please select an entity</option>
                    {entities.map((entity, index) => (
                        <option key={index+1} value={entity}>{entity}</option>
                    ))}
                </select>
            </span>
            <StarWarsEntity
                entity={entity}
                id={id}
                attributes={entityAttributes[entity]}/>
        </div>
    )
};


// main.js
const root = document.querySelector('main');
ReactDOM.render(<App/>, root);
