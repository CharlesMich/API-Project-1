import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import StarRatingInput from './starAnimate';
import './createreviewmodal.css';
import { createFetchReview } from "../../store/reviewsReducer";


function CreateReviewModal(spot) {


    const spotId = spot.spot

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);



    useEffect(()=> {
        let errors = {};

        if(review.length < 10){
            errors.review = "Review must be 10 Character or more"
        }
        if(stars < 1 || !stars || stars === 0){
            errors.stars = "Star rating input has no stars"
        }
        setErrors(errors);
    }, [review, stars]);




    const onSubmit = async (e) => {
        e.preventDefault();





        const reviewFormData = {
            review,
            stars
        }

        setHasSubmitted(true)

        setReview('')
        setStars()
        closeModal()
        setErrors({});


    let newReview = await  dispatch(createFetchReview(reviewFormData, spotId))
    // console.log(newReview)
         if(newReview) closeModal()
    };

    history.push(`/spots/${spotId}`);


const onChange = (number) => {
    setStars(parseInt(number));
};
// console.log(stars)
// console.log(errors)
return (
    <div className="addReviewContainer" style={{ width: "300px", height: " 250px" }}>

        <form onSubmit={onSubmit}>
            <div ><h1 style={{ color: "rgb(168 42 100)" }}>How was your stay?</h1></div>

            <textarea id="description" 
            type="text" 
            value={review} 
            placeholder='Leave your review here'
                onChange={(e) => setReview(e.target.value)} />
            <span>{hasSubmitted && errors.review && `${errors.review}`}</span>
            <div ><StarRatingInput disabled={false} onChange={onChange} stars={stars} /></div>
            <span>{hasSubmitted && errors.stars && `${errors.stars}`}</span>
            <div><button 
            className="revSubButton"
            style={{ width: "250px", height: "25px", marginTop: "10px", color: "white", border: "none", backgroundColor: "rgb(168 42 100)", borderRadius: "3px" }}
            disabled= {errors.review || errors.stars? true : false}
          
            >Submit Your Review</button></div>
            <div><button  style={{ width: "250px", height: "25px", marginTop: "10px", backgroundColor: "rgb(6 45 70)", color: "white", border: "none", borderRadius: "3px" }} onClick={closeModal}>Cancel</button></div>
        </form>

    </div>
)

}
export default CreateReviewModal;
