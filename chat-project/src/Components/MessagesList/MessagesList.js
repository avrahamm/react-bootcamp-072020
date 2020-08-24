import React from "react";

import OtherUserMessage from "../Message/OtherUserMessage";
import CurrentUserMessage from "../Message/CurrentUserMessage";

export default function MessagesList(props) {
    const curUsername = 2;
    const initialState = {
        messages: [
            {
                userId: 1,
                username: "user1",
                imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
                text: "Hi, how are you samim?",
                time: "8:40 AM, Today"
            },
            {
                userId: 2,
                username: "user2",
                imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
                text: "blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ?",
                time: "8:40 AM, Today"
            },
        ]
    };

    const messagesList = initialState.messages.map( (message, index) => (
             message.userId === curUserId
                 ? <CurrentUserMessage
                     {...message}
                 />
                 : <OtherUserMessage
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