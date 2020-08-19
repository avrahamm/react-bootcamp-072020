let pastStates = [];
const undo = store => next => action => {
    if (  action.type === 'UNDO') {
        // debugger
        if ( pastStates.length === 0 ) {
            return;
        }
        const prevState = pastStates.pop();
        action.payload = prevState;
        console.log('pastStates', pastStates);
        return next(action);
    }
    else {
        // debugger
        // save state BEFORE action changed state,
        // so when 'UNDO' action comes returns to that state.
        const state = store.getState();
        pastStates.push(state);
        console.log('pastStates', pastStates);
        return next(action);
    }
}

export default undo;