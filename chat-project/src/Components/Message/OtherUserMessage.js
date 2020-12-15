import React from "react";

export default function OtherUserMessage(props) {
    const { text, time, photoUrl, imageUrl, displayName } = props;
    let image = null;
    if (imageUrl) { // If the message has an image.
        image = <img src={imageUrl+ '&' + new Date().getTime()}
                     width="100" height="50" alt={"attachment"} />;
    }

    return (
        <div className="d-flex justify-content-start mb-4">
            <div className="img_cont_msg">
                <img src={photoUrl}
                     className="rounded-circle user_img_msg" alt={"photo"}/>
                     <div>{displayName}</div>
            </div>
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
        </div>
    )
}