import React from "react";

export default function OtherUserMessage(props) {
    const { text, time, photoUrl, displayName } = props;

    return (
        <div className="d-flex justify-content-start mb-4">
            <div className="img_cont_msg">
                <img src={photoUrl}
                     className="rounded-circle user_img_msg" />
                     <div>{displayName}</div>
            </div>
            <div className="msg_cotainer">
                {text}
                <span className="msg_time">{time}</span>
            </div>
        </div>
    )
}