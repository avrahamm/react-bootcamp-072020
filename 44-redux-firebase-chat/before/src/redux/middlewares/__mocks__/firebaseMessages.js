const firebaseMessages = ({dispatch, getState }) => next => action => {

    if (action.type === 'FIREBASE_INIT') {
        // Read From Firebase
        const batch = [];
        dispatch({type: 'RESET_MESSAGES', payload: batch});
        return;
    }

    return next(action);
}

export default firebaseMessages;