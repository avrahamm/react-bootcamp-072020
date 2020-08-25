import React from "react";
import {useState} from "react";

export default function RoomHeader(props) {
    const {roomName, messagesCount} = props;
    const [actionsDisplay, setActionsDisplay ] = useState(false);

    return (
        <div className="card-header msg_head">
            <div className="d-flex bd-highlight">
                <div className="user_info">
                    <span>{roomName}</span>
                    <p>{messagesCount} Messages</p>
                </div>
            </div>
            <span id="action_menu_btn"
                onClick={ () => setActionsDisplay(x => !x)}
            >
                <i className="fas fa-ellipsis-v"></i>
            </span>
            <div className="action_menu" style={{display: actionsDisplay ? "block" : "none"}}>
                <ul>
                    <li><i className="fas fa-user-circle"></i> View profile</li>
                    <li><i className="fas fa-users"></i> Add to close friends</li>
                    <li><i className="fas fa-plus"></i> Add to group</li>
                    <li><i className="fas fa-ban"></i> Block</li>
                </ul>
            </div>
        </div>
    )
}