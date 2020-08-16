import produce from 'immer';
import { nextId } from './utils';

const initialState = {
    messages: [
      { id: 0, from: 'ynon', text: 'Hello Everyone' },
    ],    
};

export default produce((state, action) => {
  switch(action.type) {
    case 'RECEIVED_MESSAGE':      
      // state.messages.push(action.payload);
      state.messages.push({
          id: nextId(state.messages),
          from: action.payload.from,
          text: action.payload.text,
      });
      break;

    case 'SET_USERNAME':
      state.messages.push({
          id: nextId(state.messages),
          from: 'SYSTEM',
          text: `A user has changed its name to: ${action.payload}` });
  }
}, initialState);


