import produce from 'immer';

import * as actions from "../consts/action-types";
import {createReducer, getActiveRoomIdFromSession} from "./utils"
import * as actionTypes from "../consts/action-types";

const initialState = {
    activeRoomId: getActiveRoomIdFromSession(),
};

function setActiveRoom(state, action) {
    if ( Boolean(action) && Boolean(action.payload) && Boolean(action.payload.roomId)) {
        state.activeRoomId = action.payload.roomId;
    }
    else {
        state.activeRoomId = null;
    }
}

function resetActiveRoom(state) {
    state.activeRoomId = null;
}

const cases = {
    [actionTypes.USER_SIGN_UP]: resetActiveRoom,
    [actionTypes.USER_SIGN_IN]: resetActiveRoom,
    [actionTypes.USER_SIGN_OUT]: resetActiveRoom,
    [actionTypes.USER_SIGN_OUT_ERROR]: resetActiveRoom,
    [actions.SET_ACTIVE_ROOM]: setActiveRoom,
};

export default produce(createReducer(cases), initialState);