import * as actionTypes from "../consts/action-types";

const session = store => next => action => {
    const sessionActions = [
        actionTypes.RECEIVED_ROOMS,
    ];

    if ( !sessionActions.includes(action.type)) {
        return next(action);
    }

    switch(action.type) {
        case actionTypes.RECEIVED_ROOMS: {
            sessionStorage.setItem('rooms',
                JSON.stringify(action.payload));
            return next(action);
        }

        case actionTypes.USER_SIGN_OUT: {
            sessionStorage.removetem('rooms');
            return next(action);
        }

        default:
            return;
    }
}

export default session;