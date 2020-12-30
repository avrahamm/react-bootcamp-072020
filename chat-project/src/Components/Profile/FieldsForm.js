import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./Profile.css";
import * as actions from "../../redux/actions";

export default function FieldsForm() {
    const dispatch = useDispatch();
    // TODO! consider using reselect library
    // to ignore currentUser updated because of uploading new picture
    const currentUser = useSelector(state => state.authUser.currentUser);
    let updateProfileFieldsErrorMessage = useSelector(state =>
        state.authUser.updateProfileFieldsErrorMessage);

    const getCountry = () => {
        return currentUser.country ? currentUser.country : "";
    }

    const getName = () => {
        return currentUser.displayName;
    }

    const [country, setCountry] = useState(getCountry);
    const [name, setName] = useState(getName);

    useEffect( () => {

        return function abort() {
            dispatch(actions.updateProfileFieldsError());
        }
    }, [])

    function handleFieldsSubmit(e) {
        e.preventDefault();
        dispatch(actions.updateProfileFields(name, country));
    }

    // @link:https://bbbootstrap.com/snippets/bootstrap-edit-job-profile-form-add-experience-94553916
    return (
        <form id={"fieldsForm"} onSubmit={handleFieldsSubmit}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-right">Edit your profile</h6>
                </div>
                {Boolean(updateProfileFieldsErrorMessage)
                    ? <p style={{color: "red"}}>{updateProfileFieldsErrorMessage}</p>
                    : ""
                }
                <div className="row mt-2">
                    <div className="col-md-6">
                        <label className="labels">Name</label>
                        <input type="text" className="form-control"
                               placeholder="username"
                               value={name}
                               onChange={ ({target}) => {
                                   if (updateProfileFieldsErrorMessage) {
                                       dispatch(actions.updateProfileFieldsError());
                                   }
                                   setName(target.value)
                               }}
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
                               onChange={ ({target}) => {
                                   if (updateProfileFieldsErrorMessage) {
                                       dispatch(actions.updateProfileFieldsError());
                                   }
                                   setCountry(target.value)
                               }}
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
