export function nextId(items) {
  return Math.max(...items.map(i => i.id)) + 1;
}

export function initUserIdToUserData(users) {
  let userIdToUserData = {};
  users.forEach(user => {
    const {name, imgUrl} = user
    userIdToUserData[user.id] = {name, imgUrl};
  })
  return userIdToUserData;
}

