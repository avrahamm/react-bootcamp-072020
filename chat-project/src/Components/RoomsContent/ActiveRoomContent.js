import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import RoomHeader from "../RoomHeader/RoomHeader";
import MessagesList from "../MessagesList/MessagesList";
import NewMessage from "../NewMessage/NewMessage";

const activeRoomSelector = ( state ) =>
    state.rooms.rooms.find((room) => room.id === state.rooms.activeRoomId);

const curUserSelector = state => {
    const curUserId = state.users.curUserId;
    return state.users.users.find((user) => user.id === curUserId);
};

const messagesSelector = state => state.messages.messages;

const userIdToNameMapSelector = state => state.users.userIdToNameMap;

export default function ActiveRoomContent(props) {
    const { activeRoomId } = props;

    const { activeRoom, curUser, curRoomMessages }  = useSelector( createSelector(
        [activeRoomSelector, curUserSelector, messagesSelector, userIdToNameMapSelector] ,
        ( activeRoom, curUser, messages, userIdToNameMap )  => {
            // debugger
         const curRoomMessages = messages
             .filter( message => message.roomId === activeRoom.id)
             .map( message => {
                 return {...message, username: userIdToNameMap.get(message.userId) }
                }
             );

            return {activeRoom, curUser,curRoomMessages }
        }
    ))
    ;

    return (
        <div className="card">
            {/*{console.log("ActiveRoomContent render")}*/}
            <RoomHeader messagesCount={curRoomMessages.length} roomName={activeRoom.name}/>
            <MessagesList
                messages={curRoomMessages}
                curUserId={curUser.id}
                // userIdToNameMap={userIdToNameMap}
            />
            <NewMessage curUserId={curUser.id} activeRoomId={activeRoom.id} />
        </div>
    );
}