import React from 'react';
import { connect } from 'react-redux';
import { setActiveRoom } from './redux/actions';

function mapStateToProps(state) {
    return {
        activeRoomId: state.activeRoomId
    }
}

export default connect(mapStateToProps)( function ActiveRoom(props) {
    const { activeRoomId, dispatch } = props;

    function handleChangeEvent(e) {
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
});