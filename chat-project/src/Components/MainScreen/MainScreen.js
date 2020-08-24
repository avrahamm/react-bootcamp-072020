import React from "react";
import './MainScreen.css'
import '../RoomsList/RoomsList'
import '../RoomsContent/RoomsContent'
import RoomsList from "../RoomsList/RoomsList";
import RoomsContent from "../RoomsContent/RoomsContent";

export default function MainScreen(props) {

    return (
        <div>
            Main Screen
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <RoomsList />
                    <RoomsContent />
                </div>
            </div>
        </div>
)
}