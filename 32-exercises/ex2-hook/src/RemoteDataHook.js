import {useEffect, useState} from "react";
import $ from "jquery";

export default function useRemoteData(remoteUrl, dependencies) {
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