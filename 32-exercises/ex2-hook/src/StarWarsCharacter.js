import React from 'react';
import useRemoteData from './RemoteDataHook'


function ShowCharacterInfo(props) {
    const {data} = props;
    // console.log(data);
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
    const data = useRemoteData(remoteUrl, [id]);

    return (
        <div>
            <pre>Debug: id = {id}</pre>
            {data ? <ShowCharacterInfo data={data}/> : 'Loading, please wait..'}
        </div>
    );
}
