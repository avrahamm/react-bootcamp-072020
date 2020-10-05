import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
  }
}

export default connect(mapStateToProps)(function Messages(props) {
  const { messages } = props;

  return (
    <>
      <h3>Messages</h3>
    <ul role="messages-list">
      {messages.map(msg => (
        <li role="message-item" key={msg.id}>
          <b>{msg.from}</b> {msg.text}
        </li>
      ))}
    </ul>
    </>
  );
});
