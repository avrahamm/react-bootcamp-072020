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
    const [data, isLoading, error] = useRemoteData(remoteUrl, [id]);
    let noDataMessage = '';
    if( !data ) {
        if(isLoading)
        {
            noDataMessage = 'Loading, please wait..';
        }
        if( error) {
            noDataMessage = error;
        }
    }
    // console.log(isLoading, error, noDataMessage);
    return (
        <div>
            <pre>Debug: id = {id}</pre>
            {data ? <ShowCharacterInfo data={data}/> : noDataMessage}
        </div>
    );
}
