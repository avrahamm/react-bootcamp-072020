import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { receivedMessage } from './redux/actions';

function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}

function AddMessage(props) {
    const { dispatch } = props;
    const [ message, setMessage ] = useState('');

    function saveNewMessage(e)
    {
        setMessage(e.target.value);
    }

    function addNewMessage( )
    {
        dispatch(receivedMessage(message));
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

export default connect(mapStateToProps)(AddMessage);