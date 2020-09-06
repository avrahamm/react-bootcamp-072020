import produce from 'immer';
import { nextId } from './utils';

//Todo! to fetch from firebase
const initialState = {
    //
    rooms: [],
    activeRoomId: null,
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


