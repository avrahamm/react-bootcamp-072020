import React from "react";
import { useSelector } from "react-redux";

import ActiveRoomContent from "./ActiveRoomContent";
import NotSelectedRoom from "./NotSelectedRoom";

export default function RoomsContent() {
    const activeRoomId = useSelector( state => state.rooms.activeRoomId );

    return (
        <div className="col-md-8 col-xl-6 chat">
            {console.log("RoomsContent render")}
            { activeRoomId !== null
                ? <ActiveRoomContent activeRoomId={activeRoomId} />
                : <NotSelectedRoom />
            }
        </div>
    );
}