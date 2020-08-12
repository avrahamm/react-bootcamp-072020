import produce from 'immer';

const initialState = {
    username: "guest",
};

const accountReducer = produce((state, action) => {
    switch(action.type) {
        case 'SET_USERNAME':
            state.username = action.payload;
            break;
    }
}, initialState);

export default accountReducer;
