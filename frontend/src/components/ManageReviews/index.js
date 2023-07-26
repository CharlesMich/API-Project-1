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

    function utcToMonYear(date) {
        const month = date.split('T')[0].split('-')[1];
        const year = date.split('T')[0].split('-')[0];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthText = months[parseInt(month)];
        return (monthText + " " + year)
    }

    function numToStars(num){
        if(num === 1) return (<><i class="fa-solid fa-star"></i></>)
        if(num === 2) return (<><i class="fa-solid fa-star"></i> + <i class="fa-solid fa-star"></i></>)
        if(num === 3) return (<><i class="fa-solid fa-star"></i> + <i class="fa-solid fa-star"></i> + <i class="fa-solid fa-star"></i></>)
        if(num === 4) return (<><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></>)
        if(num === 5) return (<><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></>)
    }

    return(
        <div className="review-container">
        <h1 className="manage-review-h1">Manage Reviews</h1>

        <div>{reviewArr.map(ele=> (
            <div className="manage-review-each-review">
                <div>{ele.Spot && <img className="managereview-image" src={ele.Spot.previewImage} alt=""></img>}</div>
                <div className="managereview-topline"><span>Review for "{ele.Spot && ele.Spot.name}", { ele.Spot && ele.Spot.city}, {ele.Spot && ele.Spot.state}</span><span>Reviewed {utcToMonYear(ele.createdAt)}</span></div>
                <div>{numToStars(ele.stars)}</div>
                 <div>{ele.review}</div>
                <OpenModalButton buttonText="Update" modalComponent={<UpdateReviewModal reviewId ={ele.id}/>}/>
                <OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal reviewId ={ele.id}/>}/>
            </div>    
               
            ))}</div>
            <div>
            </div>
    
            </div>
           
    )
}

export default ManageReviews;


