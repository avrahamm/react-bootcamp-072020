import React from 'react';
import styles from './styles'

export default function FormTwo(props)
{
    const {updateCurFormIndex, username, password, country, city} = props;
    return (
        <div style={styles.container}>
            <div style={styles.containerDiv}>
                <h3>Form Two</h3>
                <p>Username: {username}</p>
                <p>Password: {password}</p>
                <p>Country: {country}</p>
                <p>City: {city}</p>

            </div>
            <div style={styles.containerDiv}>
                <span>
                    <button onClick={() => updateCurFormIndex(-1)}>Previous</button>
                </span>
            </div>
        </div>
    )
}