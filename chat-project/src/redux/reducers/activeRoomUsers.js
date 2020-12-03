import produce from 'immer';

import {initUserIdToUserData, createReducer} from "./utils";
import * as actionTypes from "../consts/action-types";

const initialState = {
  users: [],
  searchPattern: "",
  // Do not use Map( not serializable) in Redux state, use plain JS object!
  // @link:https://stackoverflow.com/questions/63037513/can-a-redux-toolkit-createslice-use-a-js-map-as-state
  userIdToUserData: {},
};

function setSearchRoomUsersPattern(state, action) {
  state.searchPattern = action.payload;
}

function userModified(state, action) {
  action.payload.forEach(modifiedItem => {
    const index = state.users.findIndex( item => item.id === modifiedItem.id);
    state.users[index] = modifiedItem;
  });
}

function receivedUsers(state, action) {
  state.users.push(...action.payload);
  state.userIdToUserData = initUserIdToUserData(state.users);
}

const cases = {
  [actionTypes.SET_SEARCH_ROOM_USERS_PATTERN]: setSearchRoomUsersPattern,
  [actionTypes.USER_MODIFIED]: userModified,
  [actionTypes.RECEIVED_USERS]: receivedUsers,
}

export default produce(createReducer(cases), initialState);
