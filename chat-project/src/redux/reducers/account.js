import produce from 'immer';

const initialState = {
  username: null
};

export default produce((state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      state.username = action.payload;
      break;
  }


}, initialState);
