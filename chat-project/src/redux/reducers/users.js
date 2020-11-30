import produce from 'immer';

import { initUserIdToUserData, createReducer } from "./utils"
import * as actionTypes from "../consts/action-types";

const initialState = {
  users: [],
  searchPattern: "",
  // TODO! probably switch to user instead id
  currentUser: JSON.parse(sessionStorage.getItem("currentUser")),
  curUserId: JSON.parse(sessionStorage.getItem("currentUser")) ?
      JSON.parse(sessionStorage.getItem("currentUser")).uid : null,
  signUpErrorMessage: null,
  signInErrorMessage: null,
  resetUserPasswordMessage: null,
  // Do not use Map( not serializable) in Redux state, use plain JS object!
  // @link:https://stackoverflow.com/questions/63037513/can-a-redux-toolkit-createslice-use-a-js-map-as-state
  userIdToUserData: {}
};

function resetAuthErrors(state) {
    state.signUpErrorMessage = null;
    state.signInErrorMessage = null;
    state.resetUserPasswordMessage = null;
}

function setCurrentUser(state, action) {
  if( action.payload.user) {
    state.currentUser = action.payload.user;
    state.curUserId = action.payload.user.uid;
  }
  else {
    state.currentUser = null;
    state.curUserId = null;
  }
}

function userSignUpError(state, action) {
  state.signUpErrorMessage = action.payload.errorMessage;
}

function userSignInError(state, action) {
  state.signInErrorMessage = action.payload.errorMessage;
}

function resetUserPassword(state) {
  state.resetUserPasswordMessage = "Success!";
}

function resetUserPasswordError(state, action) {
  state.resetUserPasswordMessage = action.payload.errorMessage;
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
  [actionTypes.SET_CURRENT_USER]: setCurrentUser,
  [actionTypes.USER_SIGN_UP_ERROR]: userSignUpError,
  [actionTypes.USER_SIGN_IN_ERROR]: userSignInError,
  [actionTypes.RESET_USER_PASSWORD]: resetUserPassword,
  [actionTypes.RESET_USER_PASSWORD_ERROR]: resetUserPasswordError,
  [actionTypes.RESET_AUTH_ERRORS]: resetAuthErrors,
  [actionTypes.SET_SEARCH_ROOM_USERS_PATTERN]: setSearchRoomUsersPattern,
  [actionTypes.USER_MODIFIED]: userModified,
  [actionTypes.RECEIVED_USERS]: receivedUsers,
}

export default produce(createReducer(cases), initialState);
