import React from 'react';
import {useRemoteData } from './RemoteDataHook';
import {getNoDataMessage} from './StarWarsMessages';

function ShowCharacterInfo(props) {
    const {data} = props;
    return (
        <>
            <p><b>Name:</b> {data.name}</p>
            <p><b>Hair Color:</b> {data.hair_color}</p>
            <p><b>Height:</b> {data.height}</p>
        </>
    );
}

export default function StarWarsCharacter(props) {
    const {id} = props;
    const SWAPI_API_URL = 'https://swapi.dev/api/';
    const remoteUrl = `${SWAPI_API_URL}people/${id}/`;
    const [data, isLoading, error] = useRemoteData(remoteUrl, [id]);
    const noDataMessage = getNoDataMessage(data, isLoading, error);

    return (
        <div>
            <pre>Debug: id = {id}</pre>
            {data ? <ShowCharacterInfo data={data}/> : noDataMessage}
        </div>
    );
}
