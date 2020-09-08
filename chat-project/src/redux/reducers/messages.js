import produce from 'immer';

import * as actions from "../consts/action-types";

const initialState = {
    messages: []
};

export default produce((state, action) => {
    switch (action.type) {
        case actions.RECEIVED_MESSAGES:
            state.messages = action.payload;
            break;
    }
}, initialState);
