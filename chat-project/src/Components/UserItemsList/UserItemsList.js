import React from "react";
import { shallowEqual, useSelector } from "react-redux";

import UserItem from "../UserItem/UserItem";


export default function UserItemsList() {
    const userItems = useSelector( state => {
        const searchPattern = state.users.searchPattern.toLowerCase();
        const activeRoomId = state.rooms.activeRoomId;
        return state.users.users.filter(
            (userItem) =>
                userItem.roomId === activeRoomId &&
                userItem.name.toLowerCase().includes(searchPattern) );
    }, shallowEqual);

    const userItemsList = userItems.map((userItem) => (
        <UserItem
            key={userItem.id}
            {...userItem}
        />
    ));

    return (
        <div className="card-body contacts_body">
            <ul className="contacts">
                { userItemsList }
            </ul>
        </div>
    )
}