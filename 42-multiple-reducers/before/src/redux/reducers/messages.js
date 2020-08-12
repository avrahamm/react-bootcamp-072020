import produce from 'immer';

const initialState = {
    messages: [
        { id: 0, from: 'ynon', text: 'Hello Everyone' },
    ],
};

const messagesReducer = produce((state, action) => {
    switch(action.type) {
        case 'RECEIVED_MESSAGE':
            state.messages.push(action.payload);
            break;

        case 'DELETE_MESSAGE':
            const messageId = action.payload;
            state.messages = state.messages.filter( message => message.id !== messageId )
            break;

    }
}, initialState);

export default messagesReducer;
