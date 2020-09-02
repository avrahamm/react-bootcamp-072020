import React from "react";
import { useSelector } from "react-redux";

import RoomItem from "../RoomItem/RoomItem";
import { roomItemsSelector } from "../../redux/reducers/selectors"

export default function RoomItemsList() {
    const roomItems = useSelector( roomItemsSelector );
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