import produce from 'immer';

const initialState = {
    messages: [],    
};

export default produce((state, action) => {
  switch(action.type) {
    case 'RECEIVED_MESSAGE':
      state.messages.push(action.payload);
      break;

    case 'RESET_MESSAGES':      
      state.messages = action.payload;
      break;

  }
}, initialState);


