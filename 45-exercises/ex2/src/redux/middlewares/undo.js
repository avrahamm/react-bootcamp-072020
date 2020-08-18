let pastStates = [];
const undo = store => next => action => {
    if (  action.type === 'UNDO') {
        if ( pastStates.length === 0 ) {
            return;
        }
        const prevState = pastStates.pop();
        action.payload = prevState;
    }
    else {
        const state = store.getState();
        pastStates.push(state);
    }
    console.log('pastStates', pastStates);
    return next(action);
}

export default undo;