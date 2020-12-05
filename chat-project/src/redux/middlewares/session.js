import * as actionTypes from "../consts/action-types";

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
            sessionStorage.setItem('activeRoomId', action.payload.roomId);
            return next(action);
        }

        case actionTypes.USER_SIGN_OUT: {
            sessionStorage.removeItem('activeRoomId');
            return next(action);
        }

        default:
            return;
    }
}

export default session;