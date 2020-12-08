import React from "react";

// Todo! UserItemList and RoomItemList, UserItem and RoomItem
export default function UserItem(props) {
    const {active, displayName, photoUrl } = props;
    const online_icon = <span className="online_icon"></span>;
    return (
        <li className={active ? "active" : ""}>
            <div className="d-flex bd-highlight">
                <div className="img_cont">
                    <img src={photoUrl}
                         className="rounded-circle user_img" alt={"user"}/>
                    { active && online_icon}
                </div>
                <div className="user_info">
                    <span>{displayName}</span>
                    {active && <p>{displayName} is online</p>}
                </div>
            </div>
        </li>
    )
}