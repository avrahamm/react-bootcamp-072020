import React from "react";
import { useState } from "react";

export default function RoomUsersSearch(props) {
    const [pattern, setPattern ] = useState('')

    function handleChange(e) {
        setPattern(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(pattern);
    }

    return (
        <div className="card-header">
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <input type="text" placeholder="Search..."
                           name="pattern" className="form-control search"
                            onChange={handleChange}
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