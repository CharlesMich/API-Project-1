import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import DeleteBookingModal from '../DeleteBookingModal';
import UpdateBookingModal from '../UpdateBookingModal';
import OpenModalButton from "../OpenModalButton";
import './managebooking.css';
import { fetchBookings } from '../../store/booking';

function ManageBooking(){

    const dispatch = useDispatch()
    const sessionUser = useSelector(state=> state.user);
    const bookings  = useSelector(state => Object.values(state.bookings))

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);
   
    return(
        <div className="booking-container">
            <div className="booking-sub-container">
                <h1 className = "manage-booking-h1">Manage your Bookings</h1>
                <div className="managebooking-map">{bookings.map(ele => (
                    <div  className="managebooking-each-booking" >
                    <div>{ele.Spot && <img className = "managebooking-image"src={ele.Spot.previewImage}></img>}</div>
                    <div className="managebooking-dates">
                    <div className="managebooking-spotdetails">{ele.Spot && ele.Spot.name}</div>
                    <div>{ele.Spot && ele.Spot.city}, {ele.Spot && ele.Spot.state}</div>
                    <div>{ele.Spot && ele.Spot.state}</div>
                    <div className ="managebooking-start-end-date">Start Date: {ele.startDate}</div>
                    <div  className ="managebooking-start-end-date">End Date: {ele.endDate}</div>
                    </div>
                    
                   
                    <OpenModalButton buttonText="Update" modalComponent={<UpdateBookingModal bookingId ={ele.id}/>}/>
                    <OpenModalButton buttonText="Delete" modalComponent={<DeleteBookingModal bookingId ={ele.id}/>}/>
                    </div>
                )
                )}</div>


            </div>
        </div>

    )
}

export default ManageBooking;