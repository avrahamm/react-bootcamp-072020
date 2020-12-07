import produce from 'immer';

import * as actions from "../consts/action-types";
import {createReducer, getActiveRoomFromSession,
    getActiveRoomIdFromSession,getActiveRoomNameFromSession} from "./utils"
import * as actionTypes from "../consts/action-types";

const initialState = {
    activeRoom: getActiveRoomFromSession(),
    activeRoomId: getActiveRoomIdFromSession(),
    activeRoomName: getActiveRoomNameFromSession(),
};

function setActiveRoom(state, action) {
    if ( Boolean(action) && Boolean(action.payload) && Boolean(action.payload.room)) {
        state.activeRoom = action.payload.room;
        state.activeRoomId = action.payload.room.id;
        state.activeRoomName = action.payload.room.name;
    }
    else {
        state.activeRoom = null;
        state.activeRoomId = null;
        state.activeRoomName = null;

    }
}

function resetActiveRoom(state) {
    state.activeRoom = null;
    state.activeRoomId = null;
    state.activeRoomName = null;
}

const cases = {
    [actionTypes.USER_SIGN_UP]: resetActiveRoom,
    [actionTypes.USER_SIGN_IN]: resetActiveRoom,
    [actionTypes.USER_SIGN_OUT]: resetActiveRoom,
    [actionTypes.USER_SIGN_OUT_ERROR]: resetActiveRoom,
    [actions.SET_ACTIVE_ROOM]: setActiveRoom,
};

export default produce(createReducer(cases), initialState);