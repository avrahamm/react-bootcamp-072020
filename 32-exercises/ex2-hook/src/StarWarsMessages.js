function getNoDataMessage(data,isLoading, error)
{
    let noDataMessage = '';
    if( !data ) {
        if(isLoading)
        {
            noDataMessage = 'Loading, please wait..';
        }
        if( error) {
            noDataMessage = error;
        }
    }
    return noDataMessage;
}

export {
    getNoDataMessage,
}