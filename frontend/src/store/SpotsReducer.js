import { csrfFetch } from "./csrf";

const ALL_SPOTS = 'spots/ALL_SPOTS';
const SINGLE_SPOT = 'spots/SINGLE_SPOT';
// const USER_SPOTS = 'spots/USER_SPOTS';
const ADD_SPOT = 'spots/ADD_SPOTS';
// const ADD_IMAGE = 'spots/ADD_IMAGE'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const UPDATE_SPOT = "spots/UPDATE_SPOT" 


// all spots
const allSpots = (payload) => ({
        type: ALL_SPOTS,
        payload
    
})

// spot details
const singleSpot = (payload) => ({
        type: SINGLE_SPOT,
      payload

})

// ADD SPOT
const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})


// DELETE SPOT
const deleteSpot = (spotId) => ({  
        type: DELETE_SPOT,
        spotId 
})

// UPDATE SPOT
const editedSpot = (spot)=> ({
        type: UPDATE_SPOT,
        spot
   
})

// Thunks

// get all spots
export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const payload = await response.json();
        dispatch(allSpots(payload));
    } 
}

// ADD SPOTS
export const createSpot = (createSpotForm) => async (dispatch) => {
  
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createSpotForm)
    });
    if (res.ok) {
        const newSpot = await res.json();
        dispatch(addSpot(newSpot));
        return newSpot;
    }
}


// DELETE SPOT
export const deleteFetchSpot=(spotId)=> async (dispatch)=> {
// console.log("inside fetch", spotId)
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method:"DELETE"
    });
   if(res.ok){
    dispatch(deleteSpot(spotId));
   }

}
// GET SINGLESPOT
export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const payload = await res.json();
        dispatch(singleSpot(payload))
    }
}

// UPDATE SPOT
export const updateSpot =(updateSpotForm, spotId)=> async (dispatch) => {
   
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateSpotForm)
    });

    if(res.ok){
            const update = await res.json();
            dispatch(editedSpot(update))
    }

}


// Manage Spots
// export const fetchManageSpots = () => async (dispatch) => {
//     const res = await csrfFetch('/api/spots/current')
   
//     if (res.ok) {
//         const spots = await res.json();
     
//         // dispatch(loadSpots(spots))

//     }
// }

const initialState = {allSpots:{}, userSpots:{}, singleSpot:{}}
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SPOTS:
            let allSpots ={}
            action.payload.Spots.forEach(spot => {
            allSpots[spot.id] = spot;
            });
            return {...state, allSpots};
         
        case ADD_SPOT:
        return {...state, [action.spot.id]: action.spot}   
        
        case SINGLE_SPOT:
            let singleSpot = action.payload;
            return {...state, singleSpot}
         
        case DELETE_SPOT:
            const spotState = {...state.allSpots};
            delete spotState[action.spotId];
            return {...state};

        case UPDATE_SPOT:
            const  editState = { ...state }
            return editState
        default: return state;

    }
}

export default spotsReducer;