export function nextId(items) {
  return Math.max(...items.map(i => i.id)) + 1;
}

export function initUserIdToNameMap(users) {
  let userIdToNameMap = {};
  users.forEach(user => {
    userIdToNameMap[user.id] = user.name;
  })
  return userIdToNameMap;
}

