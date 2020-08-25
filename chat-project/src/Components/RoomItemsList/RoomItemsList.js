import React from "react";
import RoomItem from "../RoomItem/RoomItem";

export default function RoomItemsList(props) {
    const { roomItems } = props;
    const roomItemsList = roomItems.map((roomItem) => (
        <RoomItem
            key={roomItem.id}
            {...roomItem}
        />
    ));

    return (
        <div className="card-body contacts_body">
            <ul className="contacts">
                { roomItemsList }
            </ul>
        </div>
    )
}