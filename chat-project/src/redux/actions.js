import * as actionTypes from "./consts/action-types";
import dateFormat from "dateformat";

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

export function setActiveRoom(room) {
    return {type: actionTypes.SET_ACTIVE_ROOM,
        payload: {
            collection: "users",
            room,
        }
    };
}

export function setFilterRoomPattern(searchPattern) {
    return {type: actionTypes.SET_SEARCH_ROOM_PATTERN, payload: searchPattern};
}

export function setFilterRoomUsersPattern(searchPattern) {
    return {type: actionTypes.SET_SEARCH_ROOM_USERS_PATTERN, payload: searchPattern};
}

export function receivedMessage(userId, displayName, photoUrl, roomId,
                                text = null, uploadedFile= null, time) {
    return {type: actionTypes.RECEIVED_MESSAGE,
        payload: {
        collection: "messages",
            userId, displayName, photoUrl, roomId, text, uploadedFile, time,
        }
    };
}

export function updateProfileFields(displayName, country) {
    const now = new Date();
    const updatedTime = dateFormat(now, "mm/dd/yyyy, HH:MM:ss");

    return {type: actionTypes.UPDATE_PROFILE_FIELDS,
        payload: {
            collection: "users",
            displayName, country, updatedTime
        }
    };
}

export function updateProfilePicture(newPicture) {

    return {type: actionTypes.UPDATE_PROFILE_PICTURE,
        payload: {
            collection: "users",
            // TODO!
        }
    };
}

export function removeProfilePicture() {

    return {type: actionTypes.REMOVE_PROFILE_PICTURE,
        payload: {
            collection: "users",
            // TODO!
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

export function userSignOutError(errorMessage) {

    return {
        type: actionTypes.USER_SIGN_OUT_ERROR,
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

export function resetUserPassword(email) {

    return {
        type: actionTypes.RESET_USER_PASSWORD,
        payload: {
            email
        }
    };
}

export function resetUserPasswordError(errorMessage) {

    return {
        type: actionTypes.RESET_USER_PASSWORD_ERROR,
        payload: {
            errorMessage
        }
    };
}

export function userSignOut(curUserId) {
    return {
        type: actionTypes.USER_SIGN_OUT,
        payload: {
            curUserId
        }
    };
}

export function updateProfileFieldsError(errorMessage) {

    return {
        type: actionTypes.UPDATE_PROFILE_FIELDS_ERROR,
        payload: {
            errorMessage
        }
    };
}

export function resetProfileErrors() {
    return {
        type: actionTypes.RESET_PROFILE_ERRORS
    };
}

