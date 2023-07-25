import { csrfFetch } from "./csrf";
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const SPOT_REVIEWS = 'reviews/SPOT_REVIEWS';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


// load reviews
const loadReviews = (payload) => ({
    type: LOAD_REVIEWS,
    payload
})


const spotReviews = (payload)=> ({
    type: SPOT_REVIEWS,
    payload
})

const updateReviews = (payload)=> ({
    type: UPDATE_REVIEW,
    payload
})

const addReview = (payload)=> ({
    type:ADD_REVIEW,
    payload
})

const deleteReview = (payload) => ({
    type:DELETE_REVIEW,
    payload
})



// thunks
// get all reviews for a spotId
export const fetchSpotReviews =(spotId)=> async (dispatch)=> {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
       if(res.ok){
        const payload = await res.json();
        dispatch(spotReviews(payload))
       }
}

// get all reviews of a user (manage reviews)
export const fetchAllReviews =()=> async (dispatch) => {
    const res = await csrfFetch('/api/reviews/current');
    if(res.ok){
        const payload = await res.json();
        dispatch(loadReviews(payload));
    }
}

// update reviews
export const updateFetchReview =(updateReviewForm, id)=> async (dispatch)=> {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(updateReviewForm)
    });
    if(res.ok){
        const payload = await res.json();
        dispatch(updateReviews(payload))
    }
}

// create review
export const createFetchReview = (reviewFormData ,spotId)=> async (dispatch)=> {
  
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewFormData)
    });
    if (res.ok) {
        const newReview = await res.json();
        dispatch(addReview(newReview));
        return newReview;
    }
}

// delete review
export const deleteFetchReview = (reviewId) => async (dispatch)=> {
    // console.log("inside delete fetch", reviewId)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method:"DELETE"
    });
    if(res.ok){
        dispatch(deleteReview(reviewId))
    }
}



const initialState = {spotReviews:{}, allReviews:{}};
const reviewReducer = (state=initialState, action)=> {
    switch (action.type){
        case LOAD_REVIEWS:
            let allReviews = {}
            action.payload.Reviews.forEach(review=> {
                allReviews[review.id]=review;
            });
            return {...state, allReviews};

        case SPOT_REVIEWS:
            let spotReviews = {}
            action.payload.Reviews.forEach(review => {
                spotReviews[review.id] = review;
            });
            return {...state, spotReviews}

        case ADD_REVIEW:
           return { ...state, spotReviews: { ...state.spotReviews, [action.payload.id]: action.payload }}
          

        case UPDATE_REVIEW:
            return { ...state, allReviews: { ...state.allReviews, [action.payload.id]: action.payload }}

        case DELETE_REVIEW:
            const reviewState = {...state.spotReviews};
            delete reviewState[action.payload];
            return {...state};

        default: return state;
    }
}
export default reviewReducer;