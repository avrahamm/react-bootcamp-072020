export function initUserIdToUserData(users) {
  let userIdToUserData = {};
  users.forEach(user => {
    const {name, imgUrl} = user
    userIdToUserData[user.id] = {name, imgUrl};
  })
  return userIdToUserData;
}

export function sortMessages(m1, m2) {
  let res = 0;
  let date1 = Date.parse(m1.time);
  let date2 = Date.parse(m2.time);
  if ( date1 > date2 ) {
    res = 1;
  } else if ( date1 < date2 ) {
    res = -1;
  }
  return res;
}

export function createReducer(cases) {
  return ((state, action) => {
    if (cases[action.type]) {
      return cases[action.type](state, action);
    }
  });
}