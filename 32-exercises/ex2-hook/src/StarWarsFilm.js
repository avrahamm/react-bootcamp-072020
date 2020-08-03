import React from 'react';
import useRemoteData from './RemoteDataHook'


function ShowFilmInfo(props) {

    const {data} = props;
    // console.log(data);
    return (
        <div>
            <h4>Film: {data.title}</h4>
            <p>opening_crawl: {data.opening_crawl}</p>
        </div>
    );
}

export default function StarWarsFilm(props) {
    const {id} = props;
    const SWAPI_API_URL = 'https://swapi.dev/api/';
    const remoteUrl = `${SWAPI_API_URL}films/${id}/`;

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
    console.log(data === null ,isLoading, error, noDataMessage);
    return (
        <div>
            {data ? <ShowFilmInfo data={data}/> : noDataMessage}
        </div>
    );
}