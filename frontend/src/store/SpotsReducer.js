import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_DETAIL = 'spots/LODA_DETAILS';
export const USER_SPOTS = 'spots/USER_SPOTS';
export const Add_SPOT = 'spots/ADD_SPOTS';
export const ADD_IMAGE = 'spots/ADD_IMAGE'

// all spots
export const loadSpots = (allspots) => {
    return {
        type: LOAD_SPOTS,
        allspots
    }
}

// spot details
export const loadDetails = (spotdetails) => {
    return {
        type: LOAD_DETAIL,
        spotdetails
    }
}

// MANAGE SPOTS
const userSpots = spots => {
    return {
        type: USER_SPOTS,
        spots
    }
}

// ADD SPOT
const addSpot = (spot) => ({
    type: Add_SPOT,
    spot
})

// ADD PICS

const addImages = images => {
   return{
    type: ADD_IMAGE,
    images
   } 
}




// Thunks

// ADD SPOTS
export const createSpot = (spot) => async(dispatch)=> {
    const res = await fetch("/spots/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    });
    if (res.ok) {
        const newSpot = await res.json();
        dispatch(addSpot(newSpot));
        return newSpot;
    }
}

// Add Spot Pics
export const addPics = (picsArray, spotId) => async (dispatch) => {
    for(let pic of picsArray) {
        const res = await csrfFetch(`/spots/${spotId}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pic)
        })
        if(res.ok){
            const pics = await res.json();
            dispatch(addImages(pics));
        }
    }
}

export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);
    console.log(spotId)
    if (res.ok) {
        const spotdetails = await res.json();
        dispatch(loadDetails(spotdetails))
    } else {
        const errors = await res.json();
        return errors;
    }
}


export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');

    if (response.ok) {
        const allspots = await response.json();

        dispatch(loadSpots(allspots));
    } else {
        const errors = await response.json();
        return errors;
    }
}

export const fetchManageSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')

    if (res.ok) {
        const spots = await res.json();
        dispatch(userSpots(spots))

    }
}




const spotsReducer = (state = {}, action) => {

    switch (action.type) {
        case LOAD_SPOTS:
            // const allSpots = { ...action.allspots.Spots };
            // const newState = {...state, allSpots}
            const newState = {};
            action.allspots.Spots.forEach(spot => {
                newState[spot.id] = spot;
            });
            return newState;

        case LOAD_DETAIL:
            return { ...state, [action.spotdetails.id]: action.spotdetails };

        case USER_SPOTS:
            const userSpots = { ...action.spots.Spots }

            return userSpots

        case ADD_IMAGE:
                const upDatedpics = {...action.images}
            return {...state}    

        default: return state;

    }
}

export default spotsReducer;