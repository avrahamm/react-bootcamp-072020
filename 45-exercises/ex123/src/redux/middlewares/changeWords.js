const changeWords = store => next => action => {
    if (action.type === 'RECEIVED_MESSAGE') {
        console.log('changeWords');
        action.payload.text = action.payload.text.replace(/angular/g, 'react');
    }
    return next(action);
}

export default changeWords;