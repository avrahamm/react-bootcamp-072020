import produce from 'immer';

import * as actions from "../consts/action-types";
import {createReducer} from "./utils"
import * as actionTypes from "../consts/action-types";

const initialState = {
    rooms: [],
    activeRoomId: null,
    searchPattern: "",
};

function setSearchRoomPattern(state, action) {
    state.searchPattern = action.payload;
}
function receivedRooms(state, action) {
    state.rooms.push(...action.payload);
}
function roomModified(state, action) {
    action.payload.forEach(modifiedItem => {
        const index = state.rooms.findIndex( item => item.id === modifiedItem.id);
        state.rooms[index] = modifiedItem;
    });
}
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
    [actions.ROOM_MODIFIED]: roomModified,
    [actions.RECEIVED_ROOMS]: receivedRooms,
    [actions.SET_SEARCH_ROOM_PATTERN]: setSearchRoomPattern,
};

export default produce(createReducer(cases), initialState);


