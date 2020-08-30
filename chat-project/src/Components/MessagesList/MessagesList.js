import React from "react";

import OtherUserMessage from "../Message/OtherUserMessage";
import CurrentUserMessage from "../Message/CurrentUserMessage";

export default function MessagesList(props) {
    const { messages, curUserId} = props;

    const messagesList = messages.sort(function(m1, m2) {
        let res = 0;
        let date1 = Date.parse(m1.time);
        let date2 = Date.parse(m2.time);
        if ( date1 > date2 ) {
            res = 1;
        } else if ( date1 < date2 ) {
            res = -1;
        }
        return res;
        })
        .map( (message) => (
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