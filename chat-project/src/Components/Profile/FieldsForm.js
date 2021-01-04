import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./Profile.css";
import * as actions from "../../redux/actions";

export default function FieldsForm() {
    const dispatch = useDispatch();
    const currentUserCountry = useSelector(state =>
        state.authUser.currentUser.country ?
            state.authUser.currentUser.country :
            ""
    );
    const currentUserName = useSelector(state =>
        state.authUser.currentUser.displayName ?
            state.authUser.currentUser.displayName :
            ""
    );
    let updateProfileFieldsErrorMessage = useSelector(state =>
        state.authUser.updateProfileFieldsErrorMessage);

    const getCountry = () => {
        return currentUserCountry;
    }

    const getName = () => {
        return currentUserName;
    }

    const [country, setCountry] = useState(getCountry);
    const [name, setName] = useState(getName);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(false);
        return function abort() {
            dispatch(actions.resetProfileErrors());
        }
    }, [currentUserName, currentUserCountry])

    function handleFieldsSubmit(e) {
        e.preventDefault();
        setLoading(true);
        dispatch(actions.updateProfileFields(name, country));
    }

    // @link:https://bbbootstrap.com/snippets/bootstrap-edit-job-profile-form-add-experience-94553916
    return (
        <form id={"fieldsForm"} onSubmit={handleFieldsSubmit}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="text-right">Edit your profile</h6>
                </div>
                { (!Boolean(updateProfileFieldsErrorMessage) && loading)
                    ? <h3 style={{color: "blue"}}>Loading..</h3>
                    : ""
                }
                {Boolean(updateProfileFieldsErrorMessage)
                    ? <h3 style={{color: "red"}}>{updateProfileFieldsErrorMessage}</h3>
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
