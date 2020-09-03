import React from "react";
import { useSelector } from "react-redux";

import RoomHeader from "../RoomHeader/RoomHeader";
import MessagesList from "../MessagesList/MessagesList";
import NewMessage from "../NewMessage/NewMessage";
import {
    activeRoomByPropsSelector,
    curUserSelector,
    curRoomFilledMessagesSelector
} from "../../redux/reducers/selectors"

export default function ActiveRoomContent(props) {

    const activeRoom = useSelector(state => activeRoomByPropsSelector(state, props));
    const curUser = useSelector(curUserSelector);
    const curRoomFilledMessages  =
        useSelector( state => curRoomFilledMessagesSelector(state, props));

    return (
        <div className="card">
            {console.log("ActiveRoomContent render")}
            <RoomHeader messagesCount={curRoomFilledMessages.length} roomName={activeRoom.name}/>
            <MessagesList
                messages={curRoomFilledMessages}
                curUserId={curUser.id}
            />
            <NewMessage curUserId={curUser.id} activeRoomId={activeRoom.id} />
        </div>
    );
}