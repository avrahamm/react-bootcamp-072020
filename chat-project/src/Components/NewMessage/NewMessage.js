import React from "react";
import { useState } from "react";

export default function NewMessage(props) {

    const [ message, setMessage ] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log(message);
        setMessage('');
    }

    function handleChange(e) {
        setMessage(e.target.value);
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