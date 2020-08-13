import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveRoom } from './redux/actions';

export default function ActiveRoom( ) {
    const dispatch = useDispatch();
    const activeRoomId = useSelector( state => state.activeRoomId);

    const handleChangeEvent = (e) => {
        dispatch(setActiveRoom(e.target.value));
    }

    return (
        <div className='banner'>
            <p>Active room id: {activeRoomId}</p>
            <label htmlFor="">
                Change Active Room
                <input type="text" value={activeRoomId} onChange={handleChangeEvent}/>
            </label>
        </div>
    )
}