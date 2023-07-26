import { csrfFetch } from "./csrf";
const LOAD_BOOKING = 'booking/LOAD_BOOKING'
const ADD_BOOKING = 'booking/ADD_BOOKING'

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

// Thunks
// Load Bookings
export const fetchBookings = () => async (dispatch)=> {
    const response = await fetch('/api/bookings/current')
    if (response.ok){
        const payload = response.json();
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
    if(response.ok){
        const payload = response.json();
        dispatch(add_booking(payload));
        return payload;
    }
}

// Reducers
const initialState = {};
const bookingReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_BOOKING:
            let allBookings ={}
            action.payload.forEach(booking => {
           allBookings[booking.id] = booking;
            });
            return {...state, allBookings};

        case ADD_BOOKING:
            return {...state, [action.payload.id]: action.payload};  

        default: return state
    }
}

export default bookingReducer;


