import React from 'react';

export default function Person(props) {
    const {name} = props;
    const nextYear = props.age + 1
    return (
        <>
            <pre>{JSON.stringify(props)}</pre>
            <h2>Hello. My name is {name}</h2>
            <p>Next year {nextYear}</p>
        </>
    );
}

Person.defaultProps = {
    name: 'guest',
    age: 20
}
