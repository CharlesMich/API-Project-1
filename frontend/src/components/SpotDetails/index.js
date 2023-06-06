import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchSpotDetails } from '../../store/SpotsReducer';
import './spotdetail.css'





function SpotDetails() {
    const { spotId } = useParams();
   
    const spot = useSelector((state) =>
        state.spots ? state.spots[spotId] : null);

       
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId])
     
    console.log(spot)
    return (
        
            <div className='outer-container'>
                {/* <div>{spot.name}</div>
                <div>{spot.city},{spot.state}, {spot.country}</div>
                <div>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                <div>{spot.description}</div>  */}
               
               
                <div className="image-container">

                    <div className="img-left">
                        {/* <div><img className="img1" src={spot.SpotImages[0].url} alt="charles" /></div> */}
                    </div>
                    <div className="img-center">
                        {/* <div><img className="img2" src={spot.SpotImages[1].url} alt="charles" /></div> */}
                        {/* <div><img className="img2" src={spot.SpotImages[2].url} alt="charles" /></div> */}
                    </div>
                    <div className="img-right">
                        {/* <div><img className="img2" src={spot.SpotImages[3].url} alt="charles" /></div> */}
                        {/* <div><img className="img2" src={spot.SpotImages[4].url} alt="charles" /></div> */}
                    </div> 
                </div>
                {/* <div>$ {spot.price}</div> */}
              
                {/* <div>{spot.numReviews} Reviews</div>
                <div>{spot.avgStarRating}</div> */}
                <div> Reserve</div>
            </div>
        

    )
}

export default SpotDetails