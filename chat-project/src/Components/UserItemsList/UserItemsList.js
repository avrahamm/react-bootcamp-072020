import React from "react";
import { useSelector } from "react-redux";

import UserItem from "../UserItem/UserItem";
import {fetchCollectionData} from "../../../firebase/utils";

export default function UserItemsList({filterUserPattern}) {
    const activeRoomId = useSelector( state => state.rooms.activeRoomId);
    const [userItems, setUserItems] = React.useState([]);

    React.useEffect( () => {
        let unsubscribe = null;
        if ( activeRoomId ) {
            unsubscribe = fetchCollectionData(
                {
                    collection: "users",
                    orderColumn: "displayName",
                    limit: 10,
                    updateData: setUserItems,
                    conditions: [
                        ["roomId", "==", activeRoomId]
                    ]
                }
            );
        }

        return function abort() {
            console.log(`UserItemsList useEffect abort`);
            if ( Boolean(unsubscribe) ) {
                unsubscribe();
                setUserItems([]);
            }
        }
    }, [activeRoomId]);

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