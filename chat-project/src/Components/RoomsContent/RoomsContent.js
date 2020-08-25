import React from "react";

import RoomHeader from "../RoomHeader/RoomHeader";
import MessagesList from "../MessagesList/MessagesList";
import NewMessage from "../NewMessage/NewMessage";

export default function RoomsContent(props) {

    // TODO! pull from Redux
    const roomName = "Room1";
    const curUserId = 2;
    const messages = [
            {
                id: 1,
                userId: 1,
                username: "user1",
                imgUrl: "https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg",
                text: "Hi, how are you samim?",
                time: "8:40 AM, Today"
            },
            {
                id: 2,
                userId: 2,
                username: "user2",
                imgUrl: "https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg",
                text: "blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ?",
                time: "8:40 AM, Today"
            },
        ];

    return (
        <div className="col-md-8 col-xl-6 chat">
            <div className="card">
                <RoomHeader messagesCount={messages.length} roomName={roomName}/>
                <MessagesList messages={messages} curUserId={curUserId}  />
                <NewMessage />
            </div>
        </div>
)
}