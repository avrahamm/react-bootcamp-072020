export function nextId(items) {
  return Math.max(...items.map(i => i.id)) + 1;
}

export function initUserIdToNameMap(users) {
  let userIdToNameMap = new Map();
  users.forEach(user => {
    userIdToNameMap.set( user.id, user.name);
  })
  return userIdToNameMap;
}

