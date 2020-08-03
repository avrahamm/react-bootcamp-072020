import React from 'react';
import {useRemoteData } from './RemoteDataHook';
import {getNoDataMessage} from './StarWarsMessages';

function ShowPlanetInfo(props) {

    const {data} = props;
    // console.log(data);
    return (
        <div>
            <h4>Planet {data.name}</h4>
            <ul>
                <li>rotation_period: {data.rotation_period}</li>
                <li>orbital_period: {data.orbital_period}</li>
                <li>diameter: {data.diameter}</li>
                <li>climate: {data.climate}</li>
            </ul>
        </div>
    );
}

export default function StarWarsPlanet(props) {
    const {id} = props;
    const SWAPI_API_URL = 'https://swapi.dev/api/';
    const remoteUrl = `${SWAPI_API_URL}planets/${id}/`;

    const [data, isLoading, error] = useRemoteData(remoteUrl, [id]);
    const noDataMessage = getNoDataMessage(data, isLoading, error);
    return (
        <div>
            {data ? <ShowPlanetInfo data={data}/> : noDataMessage}
        </div>
    );
}