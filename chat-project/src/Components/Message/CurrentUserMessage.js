import React from "react";

export default function CurrentUserMessage(props) {
    const { text, time, photoUrl, imageUrl, displayName } = props;
    let image = null;
    if (imageUrl) { // If the message is an image.
        image = <img src={imageUrl+ '&' + new Date().getTime()}
                     width="100" height="50" alt={"attachment"}/>;
    }
    return (
        <div className="d-flex justify-content-end mb-4">
            {text ?
                <div className="msg_cotainer_send">
                    {text}
                    <span className="msg_time_send">{time}</span>
                </div>
                : null
            }
            {image ?
                <div className="msg_cotainer_send">
                    {image}
                    <span className="msg_time_send">{time}</span>
                </div>
                 : null
            }
            <div className="img_cont_msg">
                <img
                    src={photoUrl}
                    className="rounded-circle user_img_msg" alt={"photo"}/>
                <div>{displayName}</div>
            </div>
        </div>
    )
}