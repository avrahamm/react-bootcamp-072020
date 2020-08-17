const saver = store => next => action => {
    // debugger;
    const state = store.getState();
    state['prevState'] = state;
    console.log('prevState:', state);
    return next(action);
}

export default saver;