import { csrfFetch } from "./csrf";

// const LOAD_IMAGES = 'images/LOAD_IMAGES';
const ADD_IMAGE = 'images/ADD_IMAGES';
// const DELETE_IMAGE = 'images/DELETE_DELETE'
// const UPDATE_IMAGE = "images/UPDATE_IMAGE";


// ADD IMAGES
const addImages = (payload)=> ({
    type: ADD_IMAGE,
    payload
})


// ADD PICS
export const addPics = (picsArray, spotId) => async (dispatch) => {
    // console.log("reached addPhotosToSpot Thunk");
    for (let pic of picsArray) {
      const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pic),
      });
  
  
      if (res.ok) {
        console.log("response from fetch", res)
        const pics = await res.json();
        dispatch(addImages(pics));
        console.log(pics)
      }
    }
  };

const spotImagesReducer = (state = {}, action) => {

    switch (action.type) {
        
    case ADD_IMAGE:
        const upDatedpics = { ...action.images }
            return { ...state }


    default: return state;

    }
}

export default spotImagesReducer;