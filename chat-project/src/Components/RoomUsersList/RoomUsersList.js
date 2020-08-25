import React from "react";
import RoomUsersSearch from "../RoomUsersSearch/RoomUsersSearch";
import UserItemsList from "../UserItemsList/UserItemsList";

export default function RoomUsersList(props) {

    return (
        <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
                <RoomUsersSearch />
                <UserItemsList />
            </div>
        </div>
)
}