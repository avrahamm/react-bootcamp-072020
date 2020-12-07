import React from "react";
import { useSelector } from "react-redux";

import UserItem from "../UserItem/UserItem";
import {useCollectionData} from "../../../firebase/utils";

export default function UserItemsList({filterUserPattern}) {
    const activeRoomId = useSelector( state => state.rooms.activeRoomId);

    const userItems = useCollectionData({
        activeRoomId,
        collection: "users",
        orderColumn: "displayName",
        limit: 10,
        conditions: [
            ["roomId", "==", activeRoomId]
        ]
    });

    const userItemsList = userItems
        .filter( userItem => {
            return userItem.displayName.includes(filterUserPattern);
        })
        .map((userItem) => (
        <UserItem
            key={userItem.id}
            {...userItem}
        />
    ));

    return (
        <div className="card-body contacts_body">
            <ul key={activeRoomId} className="contacts">
                { userItemsList }
            </ul>
        </div>
    )
}