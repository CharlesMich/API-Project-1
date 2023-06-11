
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteForm.css";
import { deleteFetchSpot } from "../../store/SpotsReducer";



function DeleteFormModal({spot}){
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const spotId = spot;
    
    // console.log("inside component", spot)
    const handleSubmit = (e) => {
       return dispatch(deleteFetchSpot(spotId))
       .then(closeModal)        
    }


    const handleCancel =(e)=> {
        closeModal()
    }

return (
    <div class ="container1">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot from the listings</p>
        
        <button className="deleteButton" type="submit" onClick={handleSubmit}>Yes (Delete Spot)</button>
        <button className="cancelButton"  type="submit" onClick={handleCancel}>No (Keep Spot)</button>
    </div>
)

}

export default DeleteFormModal;