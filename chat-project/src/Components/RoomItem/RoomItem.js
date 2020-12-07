import React from "react";
import { useDispatch } from "react-redux";

import { setActiveRoom } from "../../redux/actions"

export default function RoomItem(props) {
    const dispatch = useDispatch();
    const {activeRoomId, id, name} = props;


    function handleClick() {
        activeRoomId !== id ? dispatch(setActiveRoom({id, name})) : "";
    }

    return (
        <li className={ (activeRoomId === id) ? "active" : ""}
            onClick={handleClick}
        >
            <div className="d-flex bd-highlight">
                <div role='button' className="user_info">{name}</div>
            </div>
        </li>
    )
}