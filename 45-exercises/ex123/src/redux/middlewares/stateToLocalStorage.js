const stateToLocalStorage = store => next => action => {
    // First let action complete to modify state.
    const result = next(action);
    // Then, save state to recover after refresh.
    const localStorage = window.localStorage;
    const state = store.getState();
    // console.log(JSON.stringify(state))
    localStorage.setItem('state', JSON.stringify(state));
    return result;
}

export default stateToLocalStorage;