import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./Profile.css";
import * as ROUTES from "../../constants/routes";

export default function Profile() {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authUser.currentUser);

    function handleSubmit(e) {
        e.preventDefault();
    }

    // @link:https://bbbootstrap.com/snippets/bootstrap-edit-job-profile-form-add-experience-94553916
    return (
        <form onSubmit={handleSubmit}>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-4 border-right">
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
                            <span>{currentUser.country ? currentUser.country : ""}</span>
                            <div className="mt-3 text-center">
                                <button className="btn btn-primary">Upload new picture</button>
                            </div>
                            <div className="mt-3 text-center">
                                <button className="btn btn-danger">Remove</button>
                            </div>
                            <div className="form-group" style={{display:"none"}}>
                                <label htmlFor="exampleFormControlFile1">Example file input</label>
                                <input type="file"
                                       className="form-control-file"
                                       id="exampleFormControlFile1"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="text-right">Edit your profile</h6>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <label className="labels">Name</label>
                                    <input type="text" className="form-control"
                                           placeholder="first name"
                                           value="John"
                                           onChange={ e => {}}
                                    />
                                </div>
                                {/*<div className="col-md-6">*/}
                                {/*    <label className="labels">Surname</label>*/}
                                {/*    <input type="text"*/}
                                {/*           className="form-control"*/}
                                {/*           value="Doe"*/}
                                {/*           onChange={ e => {}}*/}
                                {/*           placeholder="Doe"*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label className="labels">Country</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="country"
                                           value="USA"
                                           onChange={ e => {}}
                                    />
                                </div>
                                {/*<div className="col-md-6">*/}
                                {/*    <label className="labels">State/Region</label>*/}
                                {/*    <input type="text"*/}
                                {/*           className="form-control"*/}
                                {/*           value="Boston"*/}
                                {/*           onChange={ e => {}}*/}
                                {/*           placeholder="state"/>*/}
                                {/*</div>*/}
                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button" type="button">Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
