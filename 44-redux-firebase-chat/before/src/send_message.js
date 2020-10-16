import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sendToFirebase } from './redux/firebase_actions';


function SendMessage( ) {
    const username = useSelector( state => state.account.username );
    const [ message, setMessage ] = useState('');

    function saveNewMessage(e)
    {
        setMessage(e.target.value);
    }

    function sendMessage( )
    {
        sendToFirebase( username, message );
        setMessage('');
    }

    return (
        <div className='banner'>
            <label htmlFor="addMessage">
                <h4>Add Message</h4>
                <input id={"addMessage"} type="text" value={message} onChange={saveNewMessage}/>
            </label>
            <button onClick={sendMessage} >Add</button>
        </div>
    )
}

export default SendMessage;