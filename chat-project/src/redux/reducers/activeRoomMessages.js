import produce from 'immer';

import * as actions from "../consts/action-types";
import {createReducer} from "./utils";
import * as actionTypes from "../consts/action-types";

const initialState = {
    messages: []
};

function resetMessages(state) {
    state.messages = [];
}

function roomModified(state, action) {
    action.payload.forEach(modifiedItem => {
        const index = state.messages.findIndex( item => item.id === modifiedItem.id);
        state.messages[index] = modifiedItem;
    });
}

function receivedMessages(state, action) {
    state.messages.push(...action.payload);
}

const cases = {
    [actionTypes.USER_SIGN_UP]: resetMessages,
    [actionTypes.USER_SIGN_IN]: resetMessages,
    [actionTypes.USER_SIGN_OUT]: resetMessages,
    [actionTypes.USER_SIGN_OUT_ERROR]: resetMessages,
    [actions.ROOM_MODIFIED]: roomModified,
    [actions.RECEIVED_MESSAGES]: receivedMessages,
}

export default produce(createReducer(cases), initialState);
