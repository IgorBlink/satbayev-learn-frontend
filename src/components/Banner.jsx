import React, { useContext } from 'react';
import { UserContext } from '../App';
import SplitNumbers from '../helpers/SplitNumbers';

const Banner = () => {
    const {user} = useContext(UserContext)
    return (
        <div className='banner b-img'>
            <div className="content">
                <h1 className='title'>{SplitNumbers(user?.points ? Number(user?.points) : 0)}</h1>
                <span className="description">Satbayev points</span>
            </div>
        </div>
    );
};

export default Banner;