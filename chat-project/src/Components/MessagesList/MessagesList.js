import React from "react";

import OtherUserMessage from "../Message/OtherUserMessage";
import CurrentUserMessage from "../Message/CurrentUserMessage";

export default function MessagesList(props) {
    const { messages, curUserId} = props;

    const messagesList = messages.map( (message) => (
             message.userId === curUserId
                 ?
                 <CurrentUserMessage
                     key={message.id}
                     {...message}
                 />
                 :
                 <OtherUserMessage
                     key={message.id}
                     {...message}
                 />
        )
    )

    return (
        <div className="card-body msg_card_body">
            {messagesList}
        </div>
)
}