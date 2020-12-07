import produce from 'immer';

import { createReducer,getAuthenticatedUserFromSession,
  getAuthenticatedUserIdFromSession, extractAuthUserEssentials } from "./utils"
import * as actionTypes from "../consts/action-types";

const initialState = {
  // TODO! probably switch to user instead id
  currentUser: getAuthenticatedUserFromSession(),
  curUserId: getAuthenticatedUserIdFromSession(),
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
}

export default produce(createReducer(cases), initialState);