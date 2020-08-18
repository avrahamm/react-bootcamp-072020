const stateToLocalStorage = store => next => action => {
    const result = next(action);
    const localStorage = window.localStorage;
    const state = store.getState();
    // console.log(JSON.stringify(state))
    localStorage.setItem('state', JSON.stringify(state));
    return result;
}

export default stateToLocalStorage;