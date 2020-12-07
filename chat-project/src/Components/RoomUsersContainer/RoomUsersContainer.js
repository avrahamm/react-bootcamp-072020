import React from "react";

import UserItemsList from "../UserItemsList/UserItemsList";
import InputBox from "../InputBox/InputBox";

export default function RoomUsersContainer() {

    const [filterUserPattern, setFilterUserPattern] = React.useState("");

    return (
        <div className="col-md-4 col-xl-3 chat">
            <div className="card mb-sm-3 mb-md-0 contacts_card">
                <InputBox {
                              ...{
                                  updateData: setFilterUserPattern,
                                  title: "Room Users",
                                  filedName: "filterPattern",
                                  iconClass: "fas fa-search"
                              }
                          }
                />
                <UserItemsList filterUserPattern={filterUserPattern}/>
            </div>
        </div>
)
}