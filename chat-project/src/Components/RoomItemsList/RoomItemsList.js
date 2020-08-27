import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import RoomItem from "../RoomItem/RoomItem";

export default function RoomItemsList() {
    const roomItems = useSelector( state => {
        const searchPattern = state.rooms.searchPattern.toLowerCase();
        return state.rooms.rooms.filter(
            (roomItem) => roomItem.name.toLowerCase().includes(searchPattern) );
    }, shallowEqual);
    const activeRoomId = useSelector( state => state.rooms.activeRoomId);

    const roomItemsList = roomItems
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