import { csrfFetch } from "./csrf";
const ADD_IMAGE = 'images/ADD_IMAGES';

// ADD IMAGES
const addImages = (payload)=> ({
    type: ADD_IMAGE,
    payload
})

// ADD PICS
export const addPics = (picsArray, spotId) => async (dispatch) => {
      const {url, preview} = picsArray;
      const formData = new FormData();
      formData.append("preview", preview);
      if(url) formData.append("url", url);
      console.log(picsArray, formData)
      const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData
      });
      if (res.ok) {
        const payload = await res.json();
        dispatch(addImages(payload));
      }
    }

const spotImagesReducer = (state = {}, action) => {

    switch (action.type) {
        
    case ADD_IMAGE:
        const upDatedpics = { ...action.images }
            return { ...state }
    default: return state;
    }
}

export default spotImagesReducer;