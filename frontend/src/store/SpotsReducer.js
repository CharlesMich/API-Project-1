import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_DETAILS = 'spots/LODA_DETAILS';
const USER_SPOTS = 'spots/USER_SPOTS';

// all spots
export const loadSpots = (allspots)=> {
    return {
        type: LOAD_SPOTS,
        allspots
    }
}

// spot details
export const loadDetails = (spotdetails)=>{
    return {
        type: LOAD_DETAILS,
        spotdetails
    }
}

// User spots
const userSpots = spots => {
    return {
        type: USER_SPOTS,
        spots
    }
   
}

export const fetchSpotDetails = (spotId) => async (dispatch)=> {
    const res = await fetch(`/api/spots/${spotId}`);
   
    if(res.ok){
        const spotdetails = await res.json();
       
        dispatch(loadDetails(spotdetails))
    } else {
        console.log('inside fetch')
        const errors = await res.json();
        return errors;
      }
}


export const fetchSpots= ()=> async (dispatch) => {
    const response = await fetch('/api/spots');
   
    if(response.ok){
        const allspots = await response.json();
       
        dispatch(loadSpots(allspots));   
    }  else {
        const errors = await response.json();
        return errors;
    }
} 

export const fetchUserSpots =()=> async (dispatch)=> {
    const res = await csrfFetch('/api/spots/current')
   
    if (res.ok){
        const spots = await res.json();
        dispatch(userSpots(spots))
        console.log('res', spots)
    }
}




const spotsReducer = (state = {}, action)=>{
    
    switch(action.type){
            case LOAD_SPOTS:
            // const allSpots = { ...action.allspots.Spots };
            // const newState = {...state, allSpots}
            const newState = {};
            action.allspots.Spots.forEach(spot => {
                newState[spot.id] = spot;
            });
            return newState;

            case LOAD_DETAILS:
            return { ...state, [action.spotdetails.id]: action.spotdetails};

            case USER_SPOTS:
            const userSpots = {...action.spots.Spots}
            return userSpots

            default: return state;
           
    }
}

export default spotsReducer;