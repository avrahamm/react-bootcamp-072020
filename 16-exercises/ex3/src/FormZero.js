import React from 'react';
import styles from './styles'

export default function FormZero(props)
{
    const {updateCurFormIndex, username, setUsername,
        password, setPassword} = props;

    return (
        <div style={styles.container}>
            <form style={styles.containerDiv}>
                <h3>Form Zero</h3>
                <label htmlFor="">
                    Username:
                    <input type="text"
                           onChange={e => setUsername(e.target.value)}
                           value={username}
                    />
                </label>

                <label htmlFor="">
                    Password:
                    <input type="text"
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                    />
                </label>
            </form>
            <div style={styles.containerDiv}>
                <span>
                    <button onClick={() => updateCurFormIndex(1)}>Next</button>
                </span>
            </div>
        </div>
    )
}