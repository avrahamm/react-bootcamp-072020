import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./Profile.css";
import {updateProfileFields} from "../../redux/actions";

export default function FieldsForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authUser.currentUser);

    const curCountry = currentUser.country ? currentUser.country : "";
    const [country, setCountry] = useState(curCountry);
    const [name, setName] = useState(currentUser.displayName);

    function handleFieldsSubmit(e) {
        e.preventDefault();
        dispatch(updateProfileFields(name, country));
    }

    // @link:https://bbbootstrap.com/snippets/bootstrap-edit-job-profile-form-add-experience-94553916
    return (
        <form id={"fieldsForm"} onSubmit={handleFieldsSubmit}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-right">Edit your profile</h6>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <label className="labels">Name</label>
                        <input type="text" className="form-control"
                               placeholder="username"
                               value={name}
                               onChange={ ({target}) => {setName(target.value)}}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label className="labels">Country</label>
                        <input type="text"
                               className="form-control"
                               placeholder="country"
                               value={country}
                               onChange={ ({target}) => {setCountry(target.value)}}
                        />
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                </div>
            </div>
        </form>
    )
}
