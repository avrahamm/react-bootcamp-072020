import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receivedMessage } from './redux/actions';


function AddMessage( ) {
    const dispatch = useDispatch();
    const username = useSelector( state => state.account.username);
    const [ message, setMessage ] = useState('');

    function saveNewMessage(e)
    {
        setMessage(e.target.value);
    }

    function addNewMessage( )
    {
        dispatch(receivedMessage(username, message));
    }

    return (
        <div className='banner'>
            <label htmlFor="">
                <h4>Add Message</h4>
                <input type="text" onChange={saveNewMessage}/>
            </label>
            <button onClick={addNewMessage} >Add</button>

        </div>
    )
}

export default AddMessage;