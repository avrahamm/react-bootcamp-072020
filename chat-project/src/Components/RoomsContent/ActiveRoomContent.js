import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import RoomHeader from "../RoomHeader/RoomHeader";
import MessagesList from "../MessagesList/MessagesList";
import NewMessage from "../NewMessage/NewMessage";

export default function ActiveRoomContent(props) {
    const { activeRoomId } = props;

    const activeRoom = useSelector(state => {
        return state.rooms.rooms.find((room) => room.id === activeRoomId);
    }, shallowEqual);

    const curUser = useSelector(state => {
        const curUserId = state.users.curUserId;
        return state.users.users.find((user) => user.id === curUserId);
    }, shallowEqual);

    const curRoomMessages = useSelector(state => {
        return state.messages.messages.filter(
            (message) => message.roomId === activeRoom.id);
    }, shallowEqual);

    const userIdToNameMap = useSelector(
        state => state.users.userIdToNameMap, shallowEqual);

    return (
        <div className="card">
            <RoomHeader messagesCount={curRoomMessages.length} roomName={activeRoom.name}/>
            <MessagesList
                messages={curRoomMessages}
                curUserId={curUser.id}
                userIdToNameMap={userIdToNameMap}
            />
            <NewMessage curUserId={curUser.id} activeRoomId={activeRoom.id} />
        </div>
    );
}