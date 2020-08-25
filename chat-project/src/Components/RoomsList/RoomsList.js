import React from "react";
import RoomSearch from "../RoomSearch/RoomSearch";
import RoomItemsList from "../RoomItemsList/RoomItemsList";

export default function RoomsList(props) {
    //Todo! to pull from Redux
    const roomItems = [
        {
            id: 1,
            name: "Room1",
            active: true,
        },
        {
            id: 2,
            name: "Room2",
            active: false,
        },
    ];

    return (
        <div className="col-md-2 col-xl-3 chat">

            <div className="card mb-sm-2 mb-md-0 contacts_card">
                <RoomSearch />
                <RoomItemsList roomItems={roomItems} />
            </div>
        </div>
    )
}