import React from 'react';
import {connect} from 'react-redux';
import { setUsername } from './redux/actions';

function mapStateToProps(state) {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)( function Header(props) {
    const { username, dispatch } = props;

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
});
