import React from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";

import { receivedMessage } from "../../redux/actions";

export default function NewMessage(props) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authUser.currentUser);
    const displayName = currentUser.displayName;
    const photoURL = currentUser.photoURL;
    const { curUserId, activeRoomId } = props;
    const [ message, setMessage ] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const fileRef = useRef(null);

    useEffect( () => {
        setMessage("");
        setSelectedFile(null);

        return function abort() {
            setMessage("");
            setSelectedFile(null);
        }
    }, [activeRoomId])

    function handleSubmit(e) {
        e.preventDefault();
        if ( !Boolean(message) && !Boolean(selectedFile) ) {
            return false;
        }
        const now = new Date();
        const sentTime = dateFormat(now, "mm/dd/yyyy, HH:MM:ss");

        if ( Boolean(selectedFile)) {
            dispatch(receivedMessage(curUserId, displayName, photoURL,
                activeRoomId, message, selectedFile, sentTime))
        }
        else if ( Boolean(message)) {
            dispatch(receivedMessage(curUserId, displayName, photoURL,
                activeRoomId, message, selectedFile, sentTime))
        }
        setMessage('');
        setSelectedFile(null);
    }

    return (
        <div className="card-footer">
            {console.log("NewMessage render")}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-group-append"
                         onClick={ () =>
                             fileRef.current && fileRef.current.click()
                         }
                    >
                        <span className="input-group-text attach_btn">
                            <i className="fas fa-paperclip"></i>
                        </span>
                    </div>
                    <input id={"fileInput"}
                           type="file"
                           ref = {fileRef}
                           style={{display:'none'}}
                           onChange={(e) => {
                               setSelectedFile(e.target.files[0]);
                           }}
                    />
                    <textarea
                        name="message"
                        className="form-control type_msg"
                        placeholder="Type your message..."
                        value={message}
                        onChange={ e => setMessage(e.target.value) }
                    />
                    <div className="input-group-append">
                        <span className="input-group-text send_btn" onClick={handleSubmit}>
                            <i className="fas fa-location-arrow"></i>
                        </span>
                    </div>
                </div>
                {
                    selectedFile ?
                        <div className="input-group">
                            <div className="img_cont_msg">
                                <img
                                    style={{width:"100%", height:"100%"}}
                                    src={URL.createObjectURL(selectedFile)}
                                    alt={"attached file"}
                                />
                            </div>
                        </div>
                        : ""
                }
            </form>
        </div>
    )
}