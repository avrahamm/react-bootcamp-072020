export function receivedRooms(newListOfRooms) {
  return { type: 'RECEIVED_ROOMS', payload: newListOfRooms };
}

export function setActiveRoom(roomId) {
  return { type: 'SET_ACTIVE_ROOM', payload: roomId };
}

export function createRoom(roomName) {
  return { type: 'CREATE_ROOM', payload: roomName };
}

export function receivedMessage(message) {
  return { type: 'RECEIVED_MESSAGE', payload: message };
}

export function deleteMessage(messageId) {
  return { type: 'DELETE_MESSAGE', payload: messageId };
}

export function setUsername(newUsername) {
  return { type: 'SET_USERNAME', payload: newUsername };
}


