// TODO! should come from Firebase
export function receivedRooms(newListOfRooms) {
    return {type: 'RECEIVED_ROOMS', payload: newListOfRooms};
}

//TODO! Should be sent to Firebase
export function createRoom(roomName) {
    return {type: 'CREATE_ROOM', payload: roomName};
}

export function setActiveRoom(roomId) {
    return {type: 'SET_ACTIVE_ROOM', payload: roomId};
}

export function setFilterRoomPattern(searchPattern) {
    return {type: 'SET_SEARCH_ROOM_PATTERN', payload: searchPattern};
}

export function setFilterRoomUsersPattern(searchPattern) {
    return {type: 'SET_SEARCH_ROOM_USERS_PATTERN', payload: searchPattern};
}

export function receivedMessage(from, message) {
    return {type: 'RECEIVED_MESSAGE', payload: {from: from, text: message}};
}

export function setUsername(newUsername) {
    return {type: 'SET_USERNAME', payload: newUsername};
}

export function undo() {
    return {type: 'UNDO'};
}


