import React from "react";

import "./Profile.css";
import PictureForm from "./PictureForm";
import FieldsForm from "./FieldsForm";

export default function Profile() {

    // @link:https://bbbootstrap.com/snippets/bootstrap-edit-job-profile-form-add-experience-94553916
    return (
        <>
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-4 border-right">
                        <PictureForm />
                    </div>
                    <div className="col-md-6 border-right">
                        <FieldsForm />
                    </div>
                </div>
            </div>
        </>
    )
}
