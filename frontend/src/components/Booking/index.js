import {useState} from 'react';
import DatePicker from 'react-datepicker';
import './booking.css'

function Booking(){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();
    
    const onSubmit = (e) => {

    }

    return(
        <div className="booking-container">
            <div className="booking-sub-container">
                <h>Make a Reservation</h>
                <form onSubmit = {onSubmit}>
                    <label>Start Date</label>
                    <input type='text' value = {startDate}></input>
                    <label>End Date</label>
                    <input type='text' value = {endDate}></input>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    

                    <button>Reserve</button>
                </form>

            </div>
        </div>

    )
}

export default Booking;