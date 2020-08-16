const suspender = store => next => action => {
    if( action.hasOwnProperty('meta') && action.meta.hasOwnProperty('delay')) {
        console.log('meta', action.meta);
        setTimeout(() => {
            console.log("suspender completed");
            return next(action);
        }, action.meta.delay )
    }
    else {
        return next(action);
    }
}

export default suspender;