import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchBookings } from "../../store/booking";
import './updatebooking.css'
import { fetchUpdateBooking } from '../../store/booking';


function UpdateBookingModal(bookingId){

    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const id = bookingId.bookingId;
    
    const booking = useSelector((state) => state.bookings[id])
    
    const [checkin, setCheckin] = useState(booking.startDate);
    const [checkout, setCheckout] = useState(booking.endDate);
    const [errors, setErrors] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false)
    
    useEffect(()=> {
        const errors = {};
        if(!checkin) errors.checkin = "Please enter a checkin date";
        if(!checkout) errors.checkout = "Please enter a checkout date";
        setErrors(errors);
    }, [checkin, checkout])
    
    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch])
    
    if (!booking) return null

    const updateBooking = async (e) => {
        e.preventDefault();
        const startDate = new Date(checkin)
        const endDate = new Date(checkout);
        const updateBookingForm ={ startDate, endDate }
        dispatch(fetchUpdateBooking(updateBookingForm, bookingId)) 
        .catch(async (res) => {
            const data = await res.json();
            console.log(data)
            if(data && data.error) {
                setErrors(data.error);
            }
        })
        setHasSubmitted(true);
        if (Object.keys(errors).length > 0) return;
        closeModal()
        history.push(`/bookings/current`)
    }

    return(
        <div className="update-review-container">
        <div>Update Review</div>
        <form onSubmit={updateBooking}>
                    <div>CHECK-IN</div>
                    <input className="spotdetails-date-input" type="date" value={checkin} min={Date()} onChange={(e)=> setCheckin(e.target.value)}></input>
                    <div>CHECK-OUT</div>
                    <input className="spotdetails-date-input" type="date" value={checkout} min={Date()} onChange={(e)=> setCheckout(e.target.value)}></input>
                    <div><button className='reserve' style={{ textAlign: "center" }}>Update Booking</button></div>
        </form>
        </div>
    )
}
export default UpdateBookingModal;