import React from "react";

import Film from './Film'

export default function FilmList(props)
{
    const {films} = props;

    return (
        <div>
            <h4>Film titles</h4>
            <ul>
                { films.map( ( filmUrl, index) => (
                    <Film key={index} filmUrl={filmUrl}/>
                ))}
            </ul>
        </div>
    )
}