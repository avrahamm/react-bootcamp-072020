import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./Profile.css";
import * as ROUTES from "../../constants/routes";
import * as actions from "../../redux/actions";
import {NO_PIC_IMAGE} from "../../constants/defaults";

export default function PictureForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authUser.currentUser);
    const curCountry = currentUser.country ? currentUser.country : "";

    const fileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [removePicture, setRemovePicture] = useState(false);

    const handleCancelClick = (e) => {
        setRemovePicture(false);
        setSelectedFile(null);
    }

    const handleRemoveClick = (e) => {
        setRemovePicture(true);
        setSelectedFile(null);
    }

    const handleUploadClick = (e) => {
        fileRef.current.click();
    }

    function handleSelectFile(e) {
        console.log(e.target.files);
        setSelectedFile(e.target.files[0]);
        setRemovePicture(false);
        // to allow select same file again.
        //@link: https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component
        e.target.value=null
    }

    function handleSubmit(e) {
        e.preventDefault();
        if ( !Boolean(selectedFile) && !Boolean(removePicture) ) {
            return false;
        }

        if ( Boolean(removePicture) ) {
            return dispatch(actions.removeProfilePicture());
        }

        if ( Boolean(selectedFile) ) {
            return dispatch(actions.updateProfilePicture(selectedFile));
        }
    }

    let formPicture = removePicture ? NO_PIC_IMAGE
        : ( selectedFile ? URL.createObjectURL(selectedFile)
            : currentUser.photoURL );

    // @link:https://bbbootstrap.com/snippets/bootstrap-edit-job-profile-form-add-experience-94553916
    return (
        <form id={"pictureForm"} onSubmit={handleSubmit}>
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <Link to={ROUTES.HOME}>
                    Go Home
                </Link>
                <div className="mt-3 text-center">
                    <button type="button"
                        id={"resetButton"}
                        onClick={handleCancelClick}
                        className="btn btn-danger">Reset</button>
                </div>
                <img className="rounded-circle mt-5"
                     src={formPicture}
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
                    <button type="button"
                        id={"uploadButton"}
                        onClick={handleUploadClick}
                        className="btn btn-primary"
                    >Upload new picture</button>
                </div>
                <div className="mt-3 text-center">
                    <button type="button"
                        id={"removeButton"}
                        onClick={handleRemoveClick}
                        className="btn btn-danger">Remove picture</button>
                </div>
                <div className="form-group" style={{display:"none"}}>
                    <label htmlFor="photoFile">Photo picture</label>
                    <input type="file"
                           ref={fileRef}
                           className="form-control-file"
                           id="photoFile"
                           onChange={handleSelectFile}
                    />
                </div>
                <div className="mt-3 text-center">
                    <button type="submit"
                        id={"submitButton"}
                        className="btn btn-primary profile-button"
                        >Save Picture</button>
                </div>
            </div>
        </form>
    )
}
