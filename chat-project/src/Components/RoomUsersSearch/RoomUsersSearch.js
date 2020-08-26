import React from "react";
import { useState } from "react";

export default function RoomUsersSearch(props) {
    function handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target.value);
        console.log(e.target.querySelector('[name="pattern"]').value);
    }

    return (
        <div className="card-header">
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <input type="text" placeholder="Search..."
                           name="pattern" className="form-control search"
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text search_btn"
                              onClick={handleSubmit}
                        >
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}