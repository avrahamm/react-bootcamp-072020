import React, {useRef} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./Profile.css";
import * as ROUTES from "../../constants/routes";
import {receivedMessage} from "../../redux/actions";

export default function PictureForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authUser.currentUser);
    const fileRef = useRef(null);

    const curCountry = currentUser.country ? currentUser.country : "";

    function handleSubmitFiles(e) {
        e.preventDefault();
        // if ( Boolean(selectedFile)) {
        //     dispatch(receivedMessage(curUserId, displayName, photoURL,
        //         activeRoomId, message, selectedFile, sentTime))
        // }
    }

    // @link:https://bbbootstrap.com/snippets/bootstrap-edit-job-profile-form-add-experience-94553916
    return (
        <form id={"pictureForm"} onSubmit={handleSubmitFiles}>
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <Link to={ROUTES.HOME}>
                    Go Home
                </Link>
                <img className="rounded-circle mt-5"
                    // src="https://i.imgur.com/O1RmJXT.jpg"
                     src={currentUser.photoURL}
                     width="90"
                     alt={"user photo"}
                />
                <span
                    className="font-weight-bold">{currentUser.displayName}
                </span>
                <span
                    className="text-black-50">{currentUser.email}
                            </span>
                <span>{curCountry}</span>
                <div className="mt-3 text-center">
                    <button
                        onClick={ (e) => {fileRef.current.click()}}
                        className="btn btn-primary"
                    >Upload new picture</button>
                </div>
                <div className="mt-3 text-center">
                    <button className="btn btn-danger">Remove</button>
                </div>
                <div className="form-group" style={{display:"none"}}>
                    <label htmlFor="photoFile">Photo picture</label>
                    <input type="file"
                           ref={fileRef}
                           className="form-control-file"
                           id="photoFile"
                    />
                </div>
                <div className="mt-3 text-center">
                    <button className="btn btn-primary profile-button"
                            type="submit">Save Picture
                    </button>
                </div>
            </div>
        </form>
    )
}
