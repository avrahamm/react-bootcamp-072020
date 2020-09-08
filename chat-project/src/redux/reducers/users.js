import produce from 'immer';

import * as actions from "../consts/action-types";
import { initUserIdToNameMap } from "./utils"

const initialState = {
  users: [],
  searchPattern: "",
  curUserId: null,
  // Do not use Map( not serializable) in Redux state, use plain JS object!
  // @link:https://stackoverflow.com/questions/63037513/can-a-redux-toolkit-createslice-use-a-js-map-as-state
  userIdToNameMap: {}
};

export default produce((state, action) => {
  switch (action.type) {
    case actions.SET_USERNAME:
      const userId = action.meta.userId;
      state.curUserId = userId;
      break;

    case actions.SET_SEARCH_ROOM_USERS_PATTERN:
      state.searchPattern = action.payload;
      break;

    case actions.RECEIVED_USERS:
      state.users = action.payload;
      state.userIdToNameMap = initUserIdToNameMap(state.users);
      break;
  }

}, initialState);
