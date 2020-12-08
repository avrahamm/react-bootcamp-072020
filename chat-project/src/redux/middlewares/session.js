import * as actionTypes from "../consts/action-types";

/**
 * To stay in same state on window refresh.
 * @param store
 * @returns {function(*): function(*=): (*|undefined)}
 */
const session = store => next => action => {
    const sessionActions = [
        actionTypes.SET_ACTIVE_ROOM,
        actionTypes.USER_SIGN_OUT
    ];

    if ( !sessionActions.includes(action.type)) {
        return next(action);
    }

    switch(action.type) {
        case actionTypes.SET_ACTIVE_ROOM: {
            sessionStorage.setItem('activeRoom', JSON.stringify(action.payload.room));
            return next(action);
        }

        case actionTypes.USER_SIGN_OUT: {
            sessionStorage.removeItem('activeRoom');
            return next(action);
        }

        default:
            return;
    }
}

export default session;