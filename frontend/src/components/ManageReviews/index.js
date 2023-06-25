
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './managereviews.css'
import { fetchManageReviews } from '../../store/reviewsReducer';
import { fetchManageSpots } from "../../store/SpotsReducer";

function ManageReviews(){
    const reviews = useSelector(state => 
        state.reviews)
    const spot = useSelector(state=> state.spots)
    const user = useSelector(state=> state.session)

//    console.log(reviews)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchManageReviews());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchManageSpots())
    }, [dispatch])

    if(!spot) return null

    if(!reviews) return null;



const reviewArr= Object.values(reviews);
const spotArr = Object.values(spot);

// console.log('reviewArr', reviewArr.createdAt)
// console.log('spotArr', spotArr)
    return(
        <>
        <div>Manage Reviews</div>

        <div>{spotArr.map(spot=> (
            <>
            <div>{spot.name}</div>
            <div>{reviewArr.map(review => (
                <>
                 <div>{review.spotId===spot.id? review.review: null}</div>
                <div>{review.spotId===spot.id? review.createdAt: null}</div>
                </>
            ))}</div>
            <div>
            <span><Link>Update</Link></span>
            <span><Link>Delete</Link></span>
            </div>
            </>
       ))}
            </div>
            </>
    )
}

export default ManageReviews;


