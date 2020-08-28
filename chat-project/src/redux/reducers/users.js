import produce from 'immer';
import { nextId } from "./utils"

//Todo! to fetch from firebase server.
const initialState = {
  users: [
    {id: 0, name: 'ynon', roomId: 0, active: true,},
    {id: 1, name: 'u1', roomId: 0, active: false,},
    {id: 2, name: 'u2', roomId: 0, active: false,},
    {id: 3, name: 'u3', roomId: 0, active: true,},
    {id: 4, name: 'u4', roomId: 1, active: true,},
    {id: 5, name: 'u5', roomId: 1, active: false,},
  ],
  searchPattern: "",
};

export default produce((state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      const username = action.payload;
      const userId = nextId(state.users);
      state.users.push({ id: userId, name: username, roomId: 0, active: true});
      break;

    case 'SET_SEARCH_ROOM_USERS_PATTERN':
      state.searchPattern = action.payload;
      break;

  }


}, initialState);
