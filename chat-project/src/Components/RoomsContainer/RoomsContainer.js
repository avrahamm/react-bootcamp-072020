import React from "react";

import FilterBox from "../FilterBox/FilterBox";
import AddNewRoom from "../FilterBox/AddNewRoom";
import RoomItemsList from "../RoomItemsList/RoomItemsList";

import { setFilterRoomPattern } from "../../redux/actions";

export default function RoomsContainer() {

    return (
        <div className="col-md-2 col-xl-3 chat">
            <div className="card mb-sm-2 mb-md-0 contacts_card">
                <FilterBox setFilterAction={setFilterRoomPattern}/>
                <RoomItemsList />
                <AddNewRoom />
            </div>
        </div>
    )
}