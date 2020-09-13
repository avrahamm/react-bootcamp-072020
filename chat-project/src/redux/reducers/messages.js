import produce from 'immer';

import * as actions from "../consts/action-types";
import {createReducer} from "./utils";

const initialState = {
    messages: []
};

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
    [actions.ROOM_MODIFIED]: roomModified,
    [actions.RECEIVED_MESSAGES]: receivedMessages,
}

export default produce(createReducer(cases), initialState);
