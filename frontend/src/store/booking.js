import { csrfFetch } from "./csrf";
const LOAD_BOOKING = 'booking/LOAD_BOOKING';
const ADD_BOOKING = 'booking/ADD_BOOKING';
const UPDATE_BOOKING = 'booking/UPDATE_BOOKING';
const DELETE_BOOKING = 'booking/DELETE_BOOKING';

// all bookings
const load_bookings = (payload) => ({
    type: LOAD_BOOKING,
    payload
})

// add a booking
const add_booking = (payload) => ({
    type: ADD_BOOKING,
    payload
})

// update a booking
const update_booking = (payload) => ({
    type: UPDATE_BOOKING,
    payload
})

// delete a booking
const delete_booking = (payload) => ({
    type: DELETE_BOOKING,
    payload
})

// Thunks
// Load Bookings
export const fetchBookings = () => async (dispatch)=> {
    const response = await fetch('/api/bookings/current');
    if (response.ok){
        const payload = await response.json();
        dispatch(load_bookings(payload))
    }
}

// add Bookings
export const fetchAddBookings = (addBookingForm, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addBookingForm)
    })
        const payload = await response.json();
        dispatch(add_booking(payload));
        console.log('inside fetch', payload)
        return payload;
}

// update booking
export const fetchUpdateBooking = (updateBookingForm, bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/booking/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateBookingForm)
    })
        const payload = await response.json();
        dispatch(update_booking(payload));
        return payload;
}

// delete booking
export const fetchDeleteBooking = (bookingId) => async (dispatch)=> {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method:"DELETE"
    });
    if(res.ok){
        dispatch(delete_booking(bookingId))
    }
}


// Reducers
const initialState = {};
const bookingReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_BOOKING:
            let allBookings ={}
            action.payload.Bookings.forEach(booking => {
           allBookings[booking.id] = booking;
            });
            return {...state, ...allBookings};

        case ADD_BOOKING:
            return {...state, [action.payload.id]: action.payload};  

        case UPDATE_BOOKING:
            return {...state, [action.payload.id]: action.payload};    
            
        case DELETE_BOOKING:
            const deleteState = {...state};
            delete deleteState[action.payload];
            return deleteState;
                
        default: return state
    }
}

export default bookingReducer;


