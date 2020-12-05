import React from "react";

import RoomItemsList from "../RoomItemsList/RoomItemsList";

import InputBox from "../InputBox/InputBox";

export default function RoomsContainer() {

    const [filterRoomPattern, setFilterRoomPattern] = React.useState("");

    return (
        <div className="col-md-2 col-xl-3 chat">
            <div className="card mb-sm-2 mb-md-0 contacts_card">
                <InputBox {
                              ...{
                                  updateData: setFilterRoomPattern,
                                  title: "Filter Room",
                                  filedName: "filterPattern",
                                  iconClass: "fas fa-search"
                              }
                          }
                />

                <RoomItemsList filterRoomPattern={filterRoomPattern} />

                {/*<InputBox {*/}
                {/*              ...{*/}
                {/*                  updateData: createRoom,*/}
                {/*                  title: "Create Room",*/}
                {/*                  filedName: "newRoom",*/}
                {/*                  iconClass: "fas fa-plus"*/}
                {/*              }*/}
                {/*          }*/}
                {/*/>*/}
            </div>
        </div>
    )
}