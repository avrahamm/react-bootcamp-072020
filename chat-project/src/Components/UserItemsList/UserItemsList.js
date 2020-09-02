import React from "react";
import { useSelector } from "react-redux";

import UserItem from "../UserItem/UserItem";
import { userItemsSelector } from "../../redux/reducers/selectors"
export default function UserItemsList() {

    const userItems = useSelector( userItemsSelector );

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