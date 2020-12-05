import React from "react";

import {setFilterRoomUsersPattern} from "../../redux/actions";

import UserItemsList from "../UserItemsList/UserItemsList";
import InputBox from "../InputBox/InputBox";

export default function RoomUsersContainer() {

    return (
        <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
                {/*Temporary commented*/}
                {/*<InputBox {*/}
                {/*              ...{*/}
                {/*                  dispatchAction: setFilterRoomUsersPattern,*/}
                {/*                  title: "Room Users",*/}
                {/*                  filedName: "filterPattern",*/}
                {/*                  iconClass: "fas fa-search"*/}
                {/*              }*/}
                {/*          }*/}
                {/*/>*/}
                {/*<UserItemsList />*/}
            </div>
        </div>
)
}