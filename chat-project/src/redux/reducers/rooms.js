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

    case actions.RECEIVED_ROOMS:
      state.rooms = action.payload;
      break;

    case actions.SET_SEARCH_ROOM_PATTERN:
      state.searchPattern = action.payload;
      break;
  }
}, initialState);


