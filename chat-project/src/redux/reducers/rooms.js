import produce from 'immer';

import * as actions from "../consts/action-types";

const initialState = {
    rooms: [],
    activeRoomId: null,
    searchPattern: "",
};

export default produce((state, action) => {
  switch(action.type) {

    case actions.SET_ACTIVE_ROOM:
      state.activeRoomId = action.payload.roomId;
      break;

      case actions.ROOM_MODIFIED:
          action.payload.forEach(modifiedItem => {
              const index = state.rooms.findIndex( item => item.id === modifiedItem.id);
              state.rooms[index] = modifiedItem;
          });
          break;

    case actions.RECEIVED_ROOMS:
        state.rooms.push(...action.payload);
        break;

    case actions.SET_SEARCH_ROOM_PATTERN:
      state.searchPattern = action.payload;
      break;
  }
}, initialState);


