export function initUserIdToUserData(users) {
  let userIdToUserData = {};
  users.forEach(user => {
    const {name, imgUrl} = user
    userIdToUserData[user.id] = {name, imgUrl};
  })
  return userIdToUserData;
}

export function createReducer(cases) {
  return ((state, action) => {
    if (cases[action.type]) {
      return cases[action.type](state, action);
    }
  });
}