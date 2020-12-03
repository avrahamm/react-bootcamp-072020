import produce from 'immer';

import { initUserIdToUserData, createReducer,
  getAuthenticatedUser, getAuthenticatedUserId, extractAuthUserEssentials } from "./utils"
import * as actionTypes from "../consts/action-types";

const initialState = {
  // TODO! Only active room users should be fetched
  users: [],
  searchPattern: "",
  // Do not use Map( not serializable) in Redux state, use plain JS object!
  // @link:https://stackoverflow.com/questions/63037513/can-a-redux-toolkit-createslice-use-a-js-map-as-state
  userIdToUserData: {},

  // TODO! probably switch to user instead id
  currentUser: getAuthenticatedUser(),
  curUserId: getAuthenticatedUserId(),
  signUpErrorMessage: null,
  signInErrorMessage: null,
  signOutErrorMessage: null,
  resetUserPasswordMessage: null,

};

function resetAuthErrors(state) {
    state.signUpErrorMessage = null;
    state.signInErrorMessage = null;
    state.resetUserPasswordMessage = null;
}

function setAuthtUser(state, action) {
  if( Boolean(action.meta) && Boolean(action.meta.currentUser)) {
    const currentUser = action.meta.currentUser
    state.currentUser = extractAuthUserEssentials(currentUser);
    state.curUserId = currentUser.uid;
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

function userSignOutError(state, action) {
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
  [actionTypes.USER_SIGN_UP]: setAuthtUser,
  [actionTypes.USER_SIGN_IN]: setAuthtUser,
  [actionTypes.USER_SIGN_OUT]: setAuthtUser,
  [actionTypes.USER_SIGN_UP_ERROR]: userSignUpError,
  [actionTypes.USER_SIGN_IN_ERROR]: userSignInError,
  [actionTypes.USER_SIGN_OUT_ERROR]: userSignOutError,
  [actionTypes.RESET_USER_PASSWORD]: resetUserPassword,
  [actionTypes.RESET_USER_PASSWORD_ERROR]: resetUserPasswordError,
  [actionTypes.RESET_AUTH_ERRORS]: resetAuthErrors,
  [actionTypes.SET_SEARCH_ROOM_USERS_PATTERN]: setSearchRoomUsersPattern,
  [actionTypes.USER_MODIFIED]: userModified,
  [actionTypes.RECEIVED_USERS]: receivedUsers,
}

export default produce(createReducer(cases), initialState);
