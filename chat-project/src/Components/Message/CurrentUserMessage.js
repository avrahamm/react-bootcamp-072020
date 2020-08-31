import React from "react";

export default function CurrentUserMessage(props) {
    const { text, time, imgUrl, username } = props;
    return (
    <div className="d-flex justify-content-end mb-4">
        <div className="msg_cotainer_send">
            {text}
            <span className="msg_time_send">{time}</span>
        </div>
        <div className="img_cont_msg">
            <img
                src={imgUrl}
                className="rounded-circle user_img_msg"/>
            <div>{username}</div>
        </div>
    </div>
    )
}