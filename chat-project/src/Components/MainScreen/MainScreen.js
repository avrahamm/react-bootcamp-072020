import React from "react";
import './MainScreen.css'
import RoomsContainer from "../RoomsContainer/RoomsContainer";
import RoomsContent from "../RoomsContent/RoomsContent";
import RoomUsersContainer from "../RoomUsersContainer/RoomUsersContainer";
import SignOutForm from "../Auth/SignOutForm";

export default function MainScreen() {

    return (
        <div className="container-fluid h-100">
            <SignOutForm />
            <div className="row justify-content-center h-100">
                <RoomsContainer />
                {/*<RoomsContent />*/}
                <RoomUsersContainer />
            </div>
        </div>
    )
}