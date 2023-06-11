import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_DETAIL = 'spots/LOAD_DETAIL';
// const USER_SPOTS = 'spots/USER_SPOTS';
const ADD_SPOT = 'spots/ADD_SPOTS';
// const ADD_IMAGE = 'spots/ADD_IMAGE'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const UPDATE_SPOT = "spots/UPDATE_SPOT" 


// all spots
const loadSpots = (spots) => ({
   
        type: LOAD_SPOTS,
        spots
    
})

// spot details
const loadDetails = (payload) => ({
    
        type: LOAD_DETAIL,
      payload

})

// MANAGE SPOTS
// const userSpots = (spots) => ({
   
//         type: USER_SPOTS,
//         spots
    
// })

// ADD SPOT
const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})

// ADD PICS

// const addImages = (image) => ({
    
//         type: ADD_IMAGE,
//         image
   
// })
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
        const allspots = await response.json();
        // console.log("allspots inside fetch", allspots)
        dispatch(loadSpots(allspots));
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
// GET SPOT DETAILS
export const fetchSpotDetails = (spotId) => async (dispatch) => {
    
    const res = await fetch(`/api/spots/${spotId}`);
    
    if (res.ok) {
        const spot = await res.json();
        
        dispatch(loadDetails(spot))
        
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
export const fetchManageSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
   
    if (res.ok) {
        const spots = await res.json();
     
        dispatch(loadSpots(spots))

    }
}

const initialState = {}
const spotsReducer = (state = initialState, action) => {
   
    
    switch (action.type) {
       
        case LOAD_SPOTS:
            let newState ={}
            action.spots.Spots.forEach(spot => {
            newState[spot.id] = spot;
            });
            return newState;
        
            
        case ADD_SPOT:
        return {...state, [action.spot.id]: action.spot}   
        
        
        case LOAD_DETAIL:
           
            return {...state, [action.payload.id]:action.payload}
         
           
        // case USER_SPOTS:
        //     const userSpots = { ...action.spots.Spots}
        //     console.log(userSpots)
        //     let userSpotsArr = Object.values(userSpots)
        //     console.log('array',userSpotsArr)
        //     let userSpotObj = {}
        //     userSpotsArr.forEach((spot)=> userSpotObj[spot.id]= spot)

        //     return {...state, userSpots: userSpotObj}

        case DELETE_SPOT:
            const spotState = {...state};
            delete spotState[action.spotId];
            return spotState;

    

        case UPDATE_SPOT:
            const  editState = {...state, [action.spot.id]: action.spot}
           
            return editState
           
        default: return state;

    }
}

export default spotsReducer;