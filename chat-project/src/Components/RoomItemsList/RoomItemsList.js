import React from "react";
import { useSelector } from "react-redux";
import {useCollectionData} from "../../../firebase/useCollectionData";

import RoomItem from "../RoomItem/RoomItem";

export default function RoomItemsList({filterRoomPattern}) {
    const activeRoomId = useSelector( state => state.rooms.activeRoomId);

    const roomItems = useCollectionData({
        activeRoomId: activeRoomId ? activeRoomId : true,
        collection: "rooms",
        orderColumn: "name",
        limit: 10,
        dependencies:[],
        conditions: []
    });

    const roomItemsList = roomItems
        .filter( roomItem => {
            return roomItem.name.includes(filterRoomPattern);
        })
        .map((roomItem) => (
            <RoomItem
                key={roomItem.id}
                activeRoomId={activeRoomId}
                {...roomItem}
            />
            )
        );

    return (
        <div className="card-body contacts_body">
            <ul className="contacts">
                {/*{ console.log("RoomItemsList render") }*/}
                { roomItemsList }
            </ul>
        </div>
    )
}