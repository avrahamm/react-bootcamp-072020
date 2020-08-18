export function receivedRooms(newListOfRooms) {
  return { type: 'RECEIVED_ROOMS', payload: newListOfRooms };
}

export function setActiveRoom(roomId) {
  return { type: 'SET_ACTIVE_ROOM', payload: roomId };
}

export function createRoom(roomName) {
  return { type: 'CREATE_ROOM', payload: roomName };
}

export function receivedMessage(from, message) {
  return { type: 'RECEIVED_MESSAGE', payload: { from: from, text: message } };
}

export function setUsername(newUsername) {
  return { type: 'SET_USERNAME', payload: newUsername };
}

export function undo() {
  return { type: 'UNDO'};
}


