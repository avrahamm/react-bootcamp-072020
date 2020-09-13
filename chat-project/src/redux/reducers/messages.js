import produce from 'immer';

import * as actions from "../consts/action-types";

const initialState = {
    messages: []
};

export default produce((state, action) => {
    switch (action.type) {
        case actions.ROOM_MODIFIED:
            action.payload.forEach(modifiedItem => {
                const index = state.messages.findIndex( item => item.id === modifiedItem.id);
                state.messages[index] = modifiedItem;
            });
            break;

        case actions.RECEIVED_MESSAGES:
            state.messages.push(...action.payload);
            break;
    }
}, initialState);
