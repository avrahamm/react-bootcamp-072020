import React from "react";

import RoomItemsList from "../RoomItemsList/RoomItemsList";

import { setFilterRoomPattern, createRoom } from "../../redux/actions";
import InputBox from "../InputBox/InputBox";

export default function RoomsContainer() {

    return (
        <div className="col-md-2 col-xl-3 chat">
            <div className="card mb-sm-2 mb-md-0 contacts_card">
                <InputBox {
                              ...{
                                  dispatchAction: setFilterRoomPattern,
                                  title: "Filter Room",
                                  filedName: "filterPattern",
                                  iconClass: "fas fa-search"
                              }
                          }
                />

                <RoomItemsList />

                <InputBox {
                              ...{
                                  dispatchAction: createRoom,
                                  title: "Create Room",
                                  filedName: "newRoom",
                                  iconClass: "fas fa-plus"
                              }
                          }
                />
            </div>
        </div>
    )
}