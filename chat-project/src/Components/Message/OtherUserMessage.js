import React from "react";

export default function OtherUserMessage(props) {
    const { text, time, imgUrl } = props;

    return (
        <div className="d-flex justify-content-start mb-4">
            <div className="img_cont_msg">
                <img src={imgUrl}
                     className="rounded-circle user_img_msg" />
            </div>
            <div className="msg_cotainer">
                {text}
                <span className="msg_time">{time}</span>
            </div>
        </div>
    )
}