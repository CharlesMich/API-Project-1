
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { useHistory } from 'react-router-dom';
import "./deleteReviewModal.css"
import { deleteFetchReview } from "../../store/reviewsReducer";
import reactRouterDom from "react-router-dom";



function DeleteReviewModal({reviewId}){
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    // console.log(reviewId)
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
       return dispatch(deleteFetchReview(reviewId))
       .then(closeModal)        
    }


    const handleCancel =(e)=> {
        closeModal()
    }

return (
    <div class ="container1">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        
        <button className="deleteButton" type="submit" onClick={handleSubmit}>Yes (Delete Review)</button>
        <button className="cancelButton" type="submit" onClick={handleCancel}>No (Keep Review)</button>
    </div>
)

}

export default DeleteReviewModal;