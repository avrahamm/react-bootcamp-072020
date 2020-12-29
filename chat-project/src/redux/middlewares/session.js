import * as actionTypes from "../consts/action-types";

/**
 * To stay in same state on window refresh.
 * @param store
 * @returns {function(*): function(*=): (*|undefined)}
 */
const sessionActions = [
    actionTypes.SET_ACTIVE_ROOM,
    actionTypes.USER_SIGN_UP,
    actionTypes.USER_SIGN_IN,
    actionTypes.USER_SIGN_OUT,
    actionTypes.UPDATE_PROFILE_FIELDS,
];
const session = store => next => action => {

    if ( !sessionActions.includes(action.type)) {
        return next(action);
    }

    switch(action.type) {
        case actionTypes.SET_ACTIVE_ROOM: {
            sessionStorage.setItem('activeRoom', JSON.stringify(action.payload.room));
            return next(action);
        }

        case actionTypes.USER_SIGN_UP:
        case actionTypes.USER_SIGN_IN: {
            sessionStorage.setItem('userDoc', JSON.stringify(action.meta.userDoc));
            return next(action);
        }

        case actionTypes.USER_SIGN_OUT: {
            sessionStorage.removeItem('activeRoom');
            sessionStorage.removeItem('userDoc');
            return next(action);
        }

        case actionTypes.UPDATE_PROFILE_FIELDS: {
            sessionStorage.setItem('userDoc', JSON.stringify(action.meta.userDoc));
            return next(action);
        }

        default:
            return;
    }
}

export default session;