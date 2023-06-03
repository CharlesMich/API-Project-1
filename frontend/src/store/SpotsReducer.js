const LOAD_SPOTS = 'spots/LOAD_SPOTS';

export const loadSpots = (allspots)=> {
    return {
        type: LOAD_SPOTS,
        allspots
    }
}

export const fetchSpots= ()=> async (dispatch) => {
    const response = await fetch('/api/spots');
   
    if(response.ok){
        const allspots = await response.json();
        console.log(allspots)
        dispatch(loadSpots(allspots));
       
    }  
} 


const spotsReducer = (state = {}, action)=>{
    // console.log('spots',action)
    // console.log('state', state)
    switch(action.type){
        case LOAD_SPOTS:
            // const allSpots = { ...action.allspots.Spots };
            // const newState = {...state, allSpots}
            const newState = {};
            action.allspots.Spots.forEach(spot => {
                newState[spot.id] = spot;
            });
            console.log(state)
            return newState
            default: return state;
           
    }
}

export default spotsReducer;