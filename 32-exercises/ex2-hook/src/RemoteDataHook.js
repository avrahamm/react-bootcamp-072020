import {useEffect, useState} from "react";
import $ from "jquery";

function useRemoteData(remoteUrl, dependencies) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( function() {
        setData(null);
        setIsLoading(true);
        setError(null);
        const $xhr = $.getJSON(remoteUrl,
            (data) => {
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .fail(function( jqxhr, textStatus ) {
                setData(null);
                setIsLoading(false);
                setError(textStatus);
            });

        return function abort()
        {
            $xhr.abort();
        }
    }, dependencies);

    return [data, isLoading, error];
}

function getNoDataMessage(data,isLoading, error)
{
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
    return noDataMessage;
}

export {
    useRemoteData,
    getNoDataMessage,
}