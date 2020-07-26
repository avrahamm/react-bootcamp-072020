import React from 'react';
import styles from './styles'

export default function FormOne(props) {
    const {updateCurFormIndex, country, setCountry,
        city, setCity} = props;

    return (
        <div style={styles.container}>
            <form style={styles.containerDiv}>
                <h3>Form Zero</h3>
                <label htmlFor="">
                    Country:
                    <input type="text"
                           onChange={e => setCountry(e.target.value)}
                            value={country}
                    />
                </label>

                <label htmlFor="">
                    City:
                    <input type="text"
                           onChange={e => setCity(e.target.value)}
                            value={city}
                    />
                </label>
            </form>
            <div style={styles.containerDiv}>
                <span style={styles.button}>
                    <button onClick={() => updateCurFormIndex(-1)}>Previous</button>
                </span>
                <span style={styles.button}>
                    <button onClick={() => updateCurFormIndex(1)}>Next</button>
                </span>
            </div>
        </div>
    )
}