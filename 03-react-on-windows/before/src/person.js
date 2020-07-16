import React from 'react';

export default function Person(props) {
    const {name} = props

    const style = {
        color: "blue",
        fontSize: "16",
    }

    if( name.length > 3 ) {
        style.color = "green";
    }
    return (
        <div style = {style}>
            <h1>Hi</h1>
            <div>I am {name}</div>
        </div>
    )
}