import React from "react";

export default function RoomUsersSearch(props) {

    return (
        <div className="card-header">
            <div className="input-group">
                <input type="text" placeholder="Search..." name="" className="form-control search" />
                <div className="input-group-prepend">
                    <span className="input-group-text search_btn">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
        </div>
    )
}