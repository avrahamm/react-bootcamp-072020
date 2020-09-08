import * as actions from "./consts/action-types";

// TODO! should come from Firebase
export function receivedRooms(newListOfRooms) {
    return {type: actions.RECEIVED_ROOMS, payload: newListOfRooms};
}

//TODO! Should be sent to Firebase
export function createRoom(roomName) {
    return {type: actions.CREATE_ROOM,
        payload: {
            collection: "rooms",
            name: roomName
        }};
}

export function setActiveRoom(roomId) {
    return {type: actions.SET_ACTIVE_ROOM,
        payload: {
            collection: "users",
            roomId,
        }
    };
}

export function setFilterRoomPattern(searchPattern) {
    return {type: actions.SET_SEARCH_ROOM_PATTERN, payload: searchPattern};
}

export function setFilterRoomUsersPattern(searchPattern) {
    return {type: actions.SET_SEARCH_ROOM_USERS_PATTERN, payload: searchPattern};
}

export function receivedMessage(userId, roomId, text, time) {
    return {type: actions.RECEIVED_MESSAGE, payload: {
            userId, roomId, text, time
        }
    };
}

export function setUsername(newUsername) {
    return {
        type: actions.SET_USERNAME,
        payload: {
            collection: "users",
            name: newUsername,
            active: true,
            roomId: null
        }
    };
}

export function undo() {
    return {type: actions.UNDO};
}


