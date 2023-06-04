
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../store/SpotsReducer';

import './spots.css'




function SpotsIndex() {

    const spots = Object.values(
        useSelector((state) => (state.spots ? state.spots : []))
    );
    const dispatch = useDispatch();
    // console.log('spots in component', spots)

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);
    return (
        <div className='spotimage'>
            {spots.map((spot) => (<div className='spotscontainer'>
                <div className='divimage'><Link to={`/spots/${spot.id}`} key ="spot.id"><img className="image" src={spot.previewImage} alt={spot.name}/></Link></div>
                <div className = 'line1and2'>
                <div className='line1'><div>{spot.city}, {spot.state}</div>
                <div><i class="fa-solid fa-star"></i>{spot.avgRating}</div></div>
                <div className='line2'>${spot.price} per night
                </div></div></div>))}
        </div>

    )
}

export default SpotsIndex;