import React from "react";

export default function RoomItem(props) {
    const {active} = props;

    return (
        <li className={active ? "active" : ""}>
            <div className="d-flex bd-highlight">
                <div className="user_info">Room 1</div>
            </div>
        </li>
    )
}