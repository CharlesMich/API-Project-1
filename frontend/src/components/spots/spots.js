
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../store/SpotsReducer';
import './spots.css'

function SpotsIndex() {

    const spots = useSelector((state) => (state.spots.allSpots));
    const dispatch = useDispatch();

    const allSpots = Object.values(spots)

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    if(!spots) return null

    return (
        <div className='spotimage'>
           
            {allSpots.map((spot) => (<div className='spotscontainer'>
                <div className='divimage'>{spot.id?<Link to={`/spots/${spot.id}`} key ="spot.id"><img className="image1" src={spot.previewImage} alt={spot.name}/></Link>: null}</div>
                <div className = 'line1and2'>
                <div className='line1'><div>{spot.city}, {spot.state}</div>
                <div><i class="fa-solid fa-star"></i>{!spot.avgRating?"New":spot.avgRating.toFixed(1)}</div></div>
                <div className='line2'>${spot.price} night
                </div></div></div>))}
        </div>

    )
}

export default SpotsIndex;