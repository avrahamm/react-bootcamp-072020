import React from "react";
import { useSelector } from "react-redux";

import RoomHeader from "../RoomHeader/RoomHeader";
import MessagesList from "../MessagesList/MessagesList";
import NewMessage from "../NewMessage/NewMessage";
import {useCollectionData} from "../../../firebase/useCollectionData";

export default function ActiveRoomContent() {
    const activeRoomId = useSelector(state => state.rooms.activeRoomId);
    const activeRoomName = useSelector(state => state.rooms.activeRoomName);
    const curUserId = useSelector(state => state.authUser.curUserId);

    const curRoomFilledMessages = useCollectionData({
        activeRoomId,
        collection: "messages",
        orderColumn: "time",
        limit: 10,
        dependencies: [activeRoomId],
        conditions: [
            ["roomId", "==", activeRoomId]
        ]
    });

    return (
        <div className="card">
            {console.log("ActiveRoomContent render")}
            <RoomHeader messagesCount={curRoomFilledMessages.length} roomName={activeRoomName}/>
            <MessagesList
                messages={curRoomFilledMessages}
                curUserId={curUserId}
            />
            <NewMessage curUserId={curUserId} activeRoomId={activeRoomId} />
        </div>
    );
}