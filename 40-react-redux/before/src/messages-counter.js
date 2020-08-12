import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        messagesLength: state.messages.length
    }
}

function MessagesCounter(props) {
    const { messagesLength } = props;

    return (
        <div className='banner'>
            <h4>Messages Counter</h4>
            <p>{messagesLength}</p>

        </div>
    )
}

export default connect(mapStateToProps)(MessagesCounter);