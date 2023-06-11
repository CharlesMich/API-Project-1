import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';


// load reviews
const loadReviews = (payload)=> ({
    type: LOAD_REVIEWS,
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

const deleteReview = (reviewId) => ({
    type:DELETE_REVIEW,
    reviewId
})



// thunks
// get all reviews for a spotId
export const fetchReviews =(spotId)=> async (dispatch)=> {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
       if(res.ok){
        const review = await res.json();
        console.log("wrong fetch", review)
        dispatch(loadReviews(review))
       }
}

// get all reviews of a user (manage reviews)
// export const fetchManageReviews =()=> async (dispatch) => {
//     const res = await csrfFetch('/api/reviews/current');
//     if(res.ok){
//         const reviews = await res.json();
//         console.log("inside review fetch", reviews);
//         dispatch(loadReviews(reviews));
//     }
// }

// update reviews
// export const updateFetchReview =(updateReviewForm, reviewId)=> async (dispatch)=> {
//     const res = await csrfFetch(`api/reviews/${reviewId}`, {
//         method:"PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body:JSON.stringify(updateReviewForm)
//     });
//     if(res.ok){
//         const update = await res.json();
//         dispatch(updateReviews(update))
//     }
// }

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
    console.log("inside delete fetch", reviewId)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method:"DELETE"
    });
    if(res.ok){
        dispatch(deleteReview(reviewId))
    }
}



const initialState = {};
const reviewReducer = (state=initialState, action)=> {
    switch (action.type){
        case LOAD_REVIEWS:
            let newState = {}
            console.log('reviewaction',action)
            action.payload.Reviews.forEach(review=> {
                newState[review.id]=review;
                console.log('newState',newState)
                
            });
            return newState;

        case ADD_REVIEW:

            return {...state, [action.payload.id]: action.payload} 
            // const newReview = { ...action.payload };
            // let spot = state.spot
            // spot[newReview.id] = newReview     

        // case UPDATE_REVIEW:
        //     const editState = {...state, [action.review.id]: action.review}  
        //     return editState;

        case DELETE_REVIEW:
            const reviewState = {...state};
            delete reviewState[action.reviewId];
            return reviewState;

        default: return state;
    }
}
export default reviewReducer;