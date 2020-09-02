import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";

import { receivedMessage } from "../../redux/actions";

export default function NewMessage(props) {
    const dispatch = useDispatch();
    const { curUserId, activeRoomId } = props;
    const [ message, setMessage ] = useState("");

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const now = new Date();
        const sentTime = dateFormat(now, "mm/dd/yyyy, HH:MM:ss");
        message ?
            dispatch(receivedMessage(curUserId, activeRoomId, message, sentTime))
        : null ;
        setMessage('');
    }

    return (
        <div className="card-footer">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-group-append">
                        <span className="input-group-text attach_btn">
                            <i className="fas fa-paperclip"></i>
                        </span>
                    </div>
                    <textarea
                        name="message"
                        className="form-control type_msg"
                        placeholder="Type your message..."
                        value={message}
                        onChange={ handleChange }
                    />
                    <div className="input-group-append">
                        <span className="input-group-text send_btn" onClick={handleSubmit}>
                            <i className="fas fa-location-arrow"></i>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}