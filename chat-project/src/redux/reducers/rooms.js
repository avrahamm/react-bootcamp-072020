import produce from 'immer';
import { nextId } from './utils';

//Todo! to fetch from firebase
const initialState = {
    rooms: [
      { id: 0, name: 'Loby',},
      { id: 1, name: 'JavaScript Chats', },
      { id: 2, name: 'Java Chats', },
      { id: 3, name: 'Python Chats', },
      { id: 4, name: 'Coffee room', },
      { id: 5, name: 'Chess fans', },
    ],
    activeRoomId: 1,
    searchPattern: "",
};


export default produce((state, action) => {
  switch(action.type) {

    case 'CREATE_ROOM':
      state.rooms.push({ id: nextId(state.rooms), name: action.payload });
      break;

    case 'SET_ACTIVE_ROOM':
      state.activeRoomId = action.payload;
      break;

    case 'RECEIVED_ROOMS':
      state.rooms = action.payload;
      break;

    case 'SET_SEARCH_ROOM_PATTERN':
      state.searchPattern = action.payload;
      break;
  }
}, initialState);


