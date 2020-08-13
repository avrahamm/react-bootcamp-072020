import React from 'react';
import { useSelector } from 'react-redux';

export default function Header( ) {
    const username = useSelector(state => state.username );

    return (
        <div className='banner'>
            <p>Hello {username}</p>
        </div>
    )
};
