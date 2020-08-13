import React from 'react';
import { useSelector } from 'react-redux';

function MessagesCounter( ) {
    const messagesLength = useSelector(state => state.messages.length);

    return (
        <div className='banner'>
            <h4>Messages Counter</h4>
            <p>{messagesLength}</p>
        </div>
    )
}

export default MessagesCounter;