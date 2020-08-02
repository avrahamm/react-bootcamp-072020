import {useEffect, useState} from "react";
import $ from "jquery";

export default function useRemoteData(remoteUrl, dependencies) {
    const [data, setData] = useState(null);

    useEffect( function() {
        setData(null);
        const $xhr = $.getJSON(remoteUrl, setData);

        return function abort()
        {
            $xhr.abort();
        }
    }, dependencies);

    return data;
}