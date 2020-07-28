import React from "react";
import $ from 'jquery';
import { useState, useEffect } from 'react';

export default function Film(props)
{
    const {filmUrl} = props;
    const [title, setTitle] = useState(null);
    const [episodeId, setEpisodeId] = useState(0);


    useEffect( function() {
        setTitle(null);
        const $xhr = $.getJSON(filmUrl,
            (filmData) => {
                console.log(filmData);
                setTitle(filmData.title)
                setEpisodeId(filmData.episode_id)
            }
        );

        return function abort()
        {
            $xhr.abort();
        }
    }, [filmUrl]);

    return (
        <div>
            {
                <li key={episodeId}>{title}</li>
            }
        </div>
    )
}