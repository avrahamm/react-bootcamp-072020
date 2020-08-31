import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { createRoom } from "../../redux/actions";

export default function AddNewRoom() {
    const dispatch = useDispatch();
    const [ newRoomName, setNewRoomName ] = useState("");

    function handleChange(e) {
        setNewRoomName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createRoom(newRoomName));
        console.log('AddNewRoom newRoomName', newRoomName);
        setNewRoomName("");
    }

    return (
        <div className="card-header">
            <h4>Create Room</h4>
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <input type="text" placeholder="New Room..."
                           name="newRoom" className="form-control search"
                           value={newRoomName}
                           onChange={handleChange}
                    />
                    <div className="input-group-prepend">
                        <span className="input-group-text search_btn"
                              onClick={handleSubmit}
                        >
                           <i className="fas fa-plus"></i>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}