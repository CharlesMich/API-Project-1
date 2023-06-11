// import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from 'react-router';
// import { useModal } from "../../context/Modal";
// import {updateFetchReview} from "../../store/reviewsReducer";


// function UpdateReviewModal(){
//     const {reviewId} = useParams();
//     const history = useHistory();

//     const reviews = useSelector((state)=> 
//     state.reviews? state.reviews[reviewId]:null)

// const dispatch = useDispatch();

// const [review, setReview] = useState(reviews.review);
// const [stars, setStars] = useState(review.stars);
// const [validationErrors, setValidationErrors] = useState({});
// const [hasSubmitted, setHasSubmitted] = useState(false);

// useEffect(()=> {
//     const errors = {};
//     if(review.length === 0) errors.review = "Review is required";
//     if(stars.length === 0) errors.stars = "Rating is required";
//     if(stars> 5 || stars < 1) errors.stars = "Rating must be an integer between 1 and 5";
//     if(isNaN(stars)) errors.stars = "Rating must be an integer between 1 and 5";
//     setValidationErrors(errors);

// }, [review, stars])

// if(!review){
//     return null
// }

// const onSubmit = async (e) => {
//     e.preventDefault();


// const updateReviewForm ={
//     reviews,
//     stars
// }

// setHasSubmitted(true);
// if (Object.keys(validationErrors).length > 0) return;

// let editedSpot = await dispatch(updateFetchReview(updateReviewForm, reviewId));

// if(editedSpot){
//     history.push(`/reviews/current`)
// }

// }
// }

// export default UpdateReviewModal;