import React from "react";
import './MainScreen.css'
import RoomsContainer from "../RoomsContainer/RoomsContainer";
import RoomsContent from "../RoomsContent/RoomsContent";
import RoomUsersContainer from "../RoomUsersContainer/RoomUsersContainer";

export default function MainScreen() {

    return (
        <div>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <RoomsContainer />
                    <RoomsContent />
                    <RoomUsersContainer />
                </div>
            </div>
        </div>
    )
}