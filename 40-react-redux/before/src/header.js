import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername } from './redux/actions';

export default function Header( ) {
    const username = useSelector(state => state.username );
    const dispatch = useDispatch();

    function handleChangeEvent(e) {
        dispatch(setUsername(e.target.value));
    }

    return (
        <div className='header'>
            <label htmlFor="">
                Username:
                <input type="text" value={username} onChange={handleChangeEvent}/>
            </label>
        </div>
    )
}
