import {firebaseConfig} from "../../../firebase";

export function initUserIdToUserData(users) {
  let userIdToUserData = {};
  users.forEach(user => {
    const {displayName, photoUrl} = user
    userIdToUserData[user.uid] = {displayName, photoUrl};
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

export function extractAuthUserEssentials(user) {
  if (user) {
    const {uid, displayName, photoURL} = user;
    return {uid, displayName, photoURL};
  }
  return null;
}

// firebase.auth().setPersistence saves to session
export function getAuthenticatedUserFromSession() {
  const authUser = sessionStorage.getItem(
      `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );
  return extractAuthUserEssentials(JSON.parse(authUser));
}

export function getAuthenticatedUserIdFromSession() {
  const authUser = getAuthenticatedUserFromSession();
  if (authUser) {
    return authUser.uid;
  }
  return null;
}

export function getActiveRoomFromSession() {
  const activeRoom = JSON.parse(sessionStorage.getItem('activeRoom'));
  return activeRoom ? activeRoom : null;
}

export function getActiveRoomIdFromSession() {
  const activeRoom = JSON.parse(sessionStorage.getItem('activeRoom'));
  return activeRoom ? activeRoom.id : null;
}

export function getActiveRoomNameFromSession() {
  const activeRoom = JSON.parse(sessionStorage.getItem('activeRoom'));
  return activeRoom ? activeRoom.name : null;
}
