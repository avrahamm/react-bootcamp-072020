import React from "react";
import * as isDeepEqual from "lodash.isequal";

import OtherUserMessage from "../Message/OtherUserMessage";
import CurrentUserMessage from "../Message/CurrentUserMessage";

export default React.memo(function MessagesList(props) {
    const { messages, curUserId } = props;
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
            {console.log("MessagesList render")}
            {messagesList}
        </div>
    )
},
    function isEqual(prevProps, nextProps) {
        return isDeepEqual(prevProps.messages, nextProps.messages) &&
            isDeepEqual(prevProps.curUserId, nextProps.curUserId);
    }
)