import * as actionTypes from "./consts/action-types";

// TODO! should come from Firebase
export function receivedRooms(newListOfRooms) {
    return {type: actionTypes.RECEIVED_ROOMS, payload: newListOfRooms};
}

//TODO! Should be sent to Firebase
export function createRoom(roomName) {
    return {type: actionTypes.CREATE_ROOM,
        payload: {
            collection: "rooms",
            name: roomName
        }};
}

export function setActiveRoom(roomId) {
    return {type: actionTypes.SET_ACTIVE_ROOM,
        payload: {
            collection: "users",
            roomId,
        }
    };
}

export function setFilterRoomPattern(searchPattern) {
    return {type: actionTypes.SET_SEARCH_ROOM_PATTERN, payload: searchPattern};
}

export function setFilterRoomUsersPattern(searchPattern) {
    return {type: actionTypes.SET_SEARCH_ROOM_USERS_PATTERN, payload: searchPattern};
}

export function receivedMessage(userId, roomId, text, time) {
    return {type: actionTypes.RECEIVED_MESSAGE,
        payload: {
        collection: "messages",
            userId, roomId, text, time,
        }
    };
}

export function undo() {
    return {type: actionTypes.UNDO};
}

export function userSignUp(username, email, password) {

    return {
        type: actionTypes.USER_SIGN_UP,
        payload: {
            username,email, password,
        }
    };
}

export function userSignUpError(errorMessage) {

    return {
        type: actionTypes.USER_SIGN_UP_ERROR,
        payload: {
            errorMessage
        }
    };
}

export function userSignIn(email, password) {

    return {
        type: actionTypes.USER_SIGN_IN,
        payload: {
            email, password,
        }
    };
}

export function userSignInError(errorMessage) {

    return {
        type: actionTypes.USER_SIGN_IN_ERROR,
        payload: {
            errorMessage
        }
    };
}

export function resetAuthErrors() {
    return {
        type: actionTypes.RESET_AUTH_ERRORS
    };
}


export function setCurrentUserId(authUid) {

    return {
        type: actionTypes.SET_CURRENT_USER_ID,
        payload: {
            authUid
        }
    };
}

export function userSignOut() {
    return {
        type: actionTypes.USER_SIGN_OUT,
    };
}
