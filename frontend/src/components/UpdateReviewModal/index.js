import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useModal } from "../../context/Modal";
import { updateFetchReview } from "../../store/reviewsReducer";
import { fetchAllReviews } from '../../store/reviewsReducer';
import StarRatingInput from "../CreateReviewModal/starAnimate";
import './updatereview.css'



function UpdateReviewModal(reviewId) {

    const history = useHistory();
    const { closeModal } = useModal();

    const id = reviewId.reviewId
   
    const reviews = useSelector((state) => state.reviews.allReviews[id])

    
    const dispatch = useDispatch();

    const [review, setReview] = useState(reviews.review);
    const [stars, setStars] = useState(reviews.stars);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = {};
        if (review.length === 0) errors.review = "Review is required";
        if(stars.length === 0) errors.stars = "Rating is required";
        if (stars > 5 || stars < 1) errors.stars = "Rating must be an integer between 1 and 5";
        if(isNaN(stars)) errors.stars = "Rating must be an integer between 1 and 5";
        setValidationErrors(errors);

    }, [review, stars])

    if (!review) {
        return null
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const updateReviewForm = {
            review,
            stars
        }

        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;

        await dispatch(updateFetchReview(updateReviewForm, id));

        closeModal()
        history.push(`/reviews/current/`)
        await dispatch(fetchAllReviews())
            

    }

    const onChange = (number) => {
        setStars(parseInt(number));
    };

    return(
        <div className="update-review-container">
        <div>Update Review</div>
        <form onSubmit={onSubmit}>
            <label htmlfor="update-review-text">Review</label>
        <textarea id = 'update-review-text' type='text' value={review} placeholder='Leave your review here'
        onChange ={(e)=> setReview(e.target.value)}/>
        <span>{hasSubmitted && validationErrors.review && `${validationErrors.review}`}</span>
        <div><StarRatingInput disabled={false} onChange={onChange} stars = {stars}/></div>
        <span>{hasSubmitted && validationErrors.stars && `${validationErrors.stars}`}</span>
        <button className="update-review-button">Update your Review</button>
        </form>
        </div>
    )
}

export default UpdateReviewModal;