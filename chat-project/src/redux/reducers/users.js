import produce from 'immer';

import * as actions from "../consts/action-types";
import { initUserIdToUserData, createReducer } from "./utils"

const initialState = {
  users: [],
  searchPattern: "",
  curUserId: null,
  signUpErrorMessage: null,
  signInErrorMessage: null,
  // Do not use Map( not serializable) in Redux state, use plain JS object!
  // @link:https://stackoverflow.com/questions/63037513/can-a-redux-toolkit-createslice-use-a-js-map-as-state
  userIdToUserData: {}
};

function setCurrentUserId(state, action) {
  state.curUserId = action.payload.authUid;
}

function userSignUpError(state, action) {
  state.signUpErrorMessage = action.payload.errorMessage;
}

function userSignInError(state, action) {
  state.signInErrorMessage = action.payload.errorMessage;
}

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
  [actions.SET_CURRENT_USER_ID]: setCurrentUserId,
  [actions.USER_SIGN_UP_ERROR]: userSignUpError,
  [actions.USER_SIGN_IN_ERROR]: userSignInError,
  [actions.SET_SEARCH_ROOM_USERS_PATTERN]: setSearchRoomUsersPattern,
  [actions.USER_MODIFIED]: userModified,
  [actions.RECEIVED_USERS]: receivedUsers,
}

export default produce(createReducer(cases), initialState);
