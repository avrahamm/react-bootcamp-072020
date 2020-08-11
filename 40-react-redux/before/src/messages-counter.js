import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}

function MessagesCounter(props) {
    const { messages } = props;

    return (
        <div className='banner'>
            <h4>Messages Counter</h4>
            <p>{messages.length}</p>

        </div>
    )
}

export default connect(mapStateToProps)(MessagesCounter);