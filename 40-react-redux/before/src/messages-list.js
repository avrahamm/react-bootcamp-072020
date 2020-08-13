import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessage } from './redux/actions';


function MessagesList( ) {
    const messages = useSelector(state => state.messages);
    const dispatch = useDispatch();

    function removeMessage(messageId)
    {
        dispatch(deleteMessage(messageId));
    }

    return (
        <div className='banner'>
            <h4>Messages List</h4>
            <ul>
                {
                    messages.map( (message) => (
                        <li key={message.id}>
                            <p>
                                {message.from} : {message.text}
                                <span>
                                    <button onClick={() => removeMessage(message.id)}>Delete</button>
                                </span>
                            </p>
                        </li>
                    ) )
                }
            </ul>
        </div>
    )
}

export default MessagesList;