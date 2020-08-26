import React from "react";
import UserItem from "../UserItem/UserItem";


export default function UserItemsList(props) {

    //Todo! to pull from Redux
    const userItems = [
        {
            id: 1,
            username: "user1",
            active: true,
        },
        {
            id: 2,
            username: "user2",
            active: false,
        },
        {
            id: 3,
            username: "user3",
            active: false,
        },
        {
            id: 4,
            username: "user4",
            active: true,
        },
        {
            id: 5,
            username: "user5",
            active: false,
        },
        {
            id: 6,
            username: "user6",
            active: false,
        },
    ];

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