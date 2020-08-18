import React from 'react';
import { useDispatch } from 'react-redux';
import { undo } from './redux/actions';


function Undo( ) {
    const dispatch = useDispatch();

    function dispatchUndo( )
    {
        dispatch(undo());
    }

    return (
        <div className='banner undo'>
            <button onClick={dispatchUndo} >Undo</button>
        </div>
    )
}

export default Undo;