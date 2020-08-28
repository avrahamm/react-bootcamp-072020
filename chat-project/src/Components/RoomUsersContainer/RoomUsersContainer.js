import React from "react";

import FilterBox from "../FilterBox/FilterBox";
import { setFilterRoomUsersPattern } from "../../redux/actions";

import UserItemsList from "../UserItemsList/UserItemsList";

export default function RoomUsersContainer() {

    return (
        <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
                <FilterBox setFilterAction={setFilterRoomUsersPattern}/>
                <UserItemsList />
            </div>
        </div>
)
}