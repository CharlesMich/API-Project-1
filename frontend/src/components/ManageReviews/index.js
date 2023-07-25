import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './managereviews.css'
import { fetchAllReviews } from '../../store/reviewsReducer';
import { fetchManageSpots } from "../../store/SpotsReducer";
import OpenModalButton from "../OpenModalButton";
import UpdateReviewModal from "../UpdateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";



function ManageReviews(){
    const reviews = useSelector(state =>  state.reviews.allReviews)
    const user = useSelector(state=> state.session.user)

    let userId;
    if(user) userId = user.id;
   
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchAllReviews());
    }, [dispatch, userId])

    if(!reviews) return null;

    const reviewArr= Object.values(reviews).filter(ele=> ele.userId === Number(userId))


    return(
        <div className="review-container">
        <div>Manage Reviews</div>

        <div>{reviewArr.map(ele=> (
            <>
                 <div>{ele.review}</div>
                <div>{ele.createdAt}</div>
                <div>{ele.stars}</div>
                <OpenModalButton buttonText="Update" modalComponent={<UpdateReviewModal reviewId ={ele.id}/>}/>
                <OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal reviewId ={ele.id}/>}/>
            </>    
               
            ))}</div>
            <div>
            </div>
    
            </div>
           
    )
}

export default ManageReviews;


