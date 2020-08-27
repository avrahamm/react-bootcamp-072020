import React from "react";
import RoomSearch from "../RoomSearch/RoomSearch";
import RoomItemsList from "../RoomItemsList/RoomItemsList";

export default function RoomsContainer() {

    return (
        <div className="col-md-2 col-xl-3 chat">
            <div className="card mb-sm-2 mb-md-0 contacts_card">
                <RoomSearch />
                <RoomItemsList />
            </div>
        </div>
    )
}