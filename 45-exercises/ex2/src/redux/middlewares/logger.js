const logger = store => next => action => {
    console.log('Action:', action)
    return next(action);
}

export default logger;