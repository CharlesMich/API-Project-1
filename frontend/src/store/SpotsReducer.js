const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_DETAILS = 'spots/LODA_DETAILS'

export const loadSpots = (allspots)=> {
    return {
        type: LOAD_SPOTS,
        allspots
    }
}

export const loadDetails = (spotdetails)=>{
    return {
        type: LOAD_DETAILS,
        spotdetails
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
            default: return state;
           
    }
}

export default spotsReducer;