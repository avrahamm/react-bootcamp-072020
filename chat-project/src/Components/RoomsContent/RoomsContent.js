import React from "react";

import RoomHeader from "../RoomHeader/RoomHeader";
import MessagesList from "../MessagesList/MessagesList";
import NewMessage from "../NewMessage/NewMessage";

export default function RoomsContent(props) {

    return (
        <div className="col-md-8 col-xl-6 chat">
            <div className="card">
                <RoomHeader />
                <MessagesList />
                <NewMessage />
            </div>
        </div>
)
}