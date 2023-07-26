import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchDeleteBooking } from "../../store/booking";
import { fetchBookings } from '../../store/booking';
import "./deletebooking.css";

function DeleteBookingModal(bookingId){

    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const id = bookingId.bookingId;

    const booking = useSelector(state=> state.bookings);
    
    const handleSubmit = (e) => {
        dispatch(fetchDeleteBooking(id)).then(dispatch(fetchBookings())).then(dispatch(fetchBookings())).then(closeModal)        
    }

    const handleCancel =(e)=> {
        closeModal()
    }

    return (
        <div class ="container1">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to cancel this Booking </p>
            
            <button className="deleteButton" type="submit" onClick={handleSubmit}>Yes (Delete Spot)</button>
            <button className="cancelButton"  type="submit" onClick={handleCancel}>No (Keep Spot)</button>
        </div>
    )

}

export default DeleteBookingModal;