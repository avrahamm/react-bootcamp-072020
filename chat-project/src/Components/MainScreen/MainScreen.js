import React from "react";
import './MainScreen.css'
import RoomsList from "../RoomsList/RoomsList";
import RoomsContent from "../RoomsContent/RoomsContent";
import RoomUsersList from "../RoomUsersList/RoomUsersList";

export default function MainScreen(props) {
    //Todo! to pull from Redux
    const roomItems = [
        {
            id: 1,
            name: "Room1",
            active: true,
        },
        {
            id: 2,
            name: "Room2",
            active: false,
        },
    ];

    return (
        <div>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <RoomsList />
                    <RoomsContent />
                    <RoomUsersList />
                </div>
            </div>
        </div>
)
}