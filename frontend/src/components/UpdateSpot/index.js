import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import './updatespot.css'
import {fetchSpotDetails} from '../../store/SpotsReducer';
import { updateSpot } from '../../store/SpotsReducer';




function UpdateSpot() {
  const { spotId } = useParams();
const history = useHistory()
  
  const spot = useSelector((state)=> 
      state.spots ? state.spots[spotId]: null)
  

 
  

 
  if(!spotId) history.push('/');
const dispatch = useDispatch();

 


    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [lat, setLat] = useState(spot.lat);
    const [lng, setLng] = useState(spot.lng);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [name, setName] = useState(spot.name);
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
   
    
    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId])
     
    
    useEffect(() => {
        const errors = {};
        if (country.length === 0) errors.country = 'Country is required';
         if (country.length > 25) errors.country = 'Country must be 25 characters or less';
        if (address.length === 0) errors.address = 'Address is required';
        if (address.length > 50) errors.address = 'Address must be 50 characters or less';
        if (city.length === 0) errors.city = 'City is required';
        if (city.length > 25) errors.city = 'City must be 25 characters or less';
        if (state.length === 0) errors.state = 'State is required';
        if (state.length > 25) errors.state = 'State must be 25 characters or less';
        if (lat.length === 0) errors.lat = 'Latitude is required';
        if (lng.length === 0) errors.lng = 'Longitude is required';
        if (isNaN(lat) || lat <-90 || lat > 90) errors.lat = 'Latitude must be a  number between -90 and 90';
        if (isNaN(lng) || lng <-180 || lng > 180) errors.lng = 'Longitude must be a  number between -180 and 180';
        if (lat.length > 7) errors.lat = 'Latitude cannot be more than 6 digits long including the decimals (eg: 12.1234)'
        if (lng.length > 10) errors.lng = 'Longitude cannot be more than 9 digits long including the decimals (eg: 123.123456)'
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (description.length > 2000) errors.description = 'Description accepts a maximum of 2000 characters';
        if (name.length === 0) errors.name = 'Name is required';
        if (name.length > 200) errors.name = 'Name cannot be more than 200 characters';
        if (price.length === 0) errors.price = 'Price is required';
        if (isNaN(price) || price <= 0) errors.price = 'Price has be above 0 dollars'
        if (isNaN(price) || price <= 0) errors.price = 'Price has be above 0 dollars';
        if(price.length >6) errors.price = 'Price has be a numeric dollar amount with maximum 6 digits including decimals';
        setValidationErrors(errors);
    }, [country, address, city, state, lat, lng, description, name, price])


   
    if(!spot || !spotId) return 
    

   
    const onSubmit = async (e) => {
        e.preventDefault();

        const updateSpotForm = {
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price,
        };
       

        setHasSubmitted(true);
        if (Object.keys(validationErrors).length > 0) return;
        

        setCountry('');
        setAddress('');
        setCity('');
        setState('');
        setLat('');
        setLng('');
        setDescription('');
        setName('');
        setPrice('');
       

        await dispatch(updateSpot(updateSpotForm, spotId));






        
      
       
        history.push(`/spots/${spotId}`)
          

      

    }
    return (
        <div className="spotform-container">
                <div>
                <h2>Update your Spot</h2>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation</p>
                </div>
                <form onSubmit={onSubmit}>
                    <span><label htmlFor='country'>Country: </label></span><span className='error'> {hasSubmitted && validationErrors.country && `${validationErrors.country}`}</span>
                    <input id='country' type="text" value={country}
                        onChange={(e) => setCountry(e.target.value)} />

                    <span><label htmlFor='address'>Street Address: </label></span><span className='error'> {hasSubmitted && validationErrors.address && `${validationErrors.address}`}</span>
                    <input id='address' type="text" value={address}
                        onChange={(e) => setAddress(e.target.value)} />


                    <span className="cityState">
                        <span><label htmlFor='city'>City: </label></span><span className='error'> {hasSubmitted && validationErrors.city && `${validationErrors.city}`}</span>
                        <input id='city' type="text" value={city}
                            onChange={(e) => setCity(e.target.value)} />

                        <span><label htmlFor='state'>State: </label></span><span className='error'> {hasSubmitted && validationErrors.state && `${validationErrors.state}`}</span>
                        <input id='state' type="text" value={state}
                            onChange={(e) => setState(e.target.value)} />
                    </span>

                    <span><label htmlFor='lat'>Latitude: </label></span><span className='error'> { hasSubmitted && validationErrors.lat && `${validationErrors.lat}`}</span>
                    <input id='lat' type="text" value={lat}
                        onChange={(e) => setLat(e.target.value)} />

                    <span><label htmlFor='lng'>Longitude: </label></span><span className='error'> { hasSubmitted && validationErrors.lng && `${validationErrors.lng}`}</span>
                    <input id='lng' type="text" value={lng}
                        onChange={(e) => setLng(e.target.value)} />

                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like
                        fast wifi or parking, and what you love about the neighborhood.</p>

                    <span><label htmlFor='description'>Description: </label></span><span className='error'> { hasSubmitted && validationErrors.description && `${validationErrors.description}`}</span>
                    <textarea id='description' type="text" value={description}
                        onChange={(e) => setDescription(e.target.value)} />

                    <h3>Create a title for your spot</h3>
                    <p>Catch guests' attention with a spot title that highlights what makes
                        your place special.</p>


                    <span><label htmlFor='name'>Name: </label></span><span className='error'> {hasSubmitted && validationErrors.name && `${validationErrors.name}`}</span>
                    <input id='name' type="text" value={name}
                        onChange={(e) => setName(e.target.value)} />

                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher
                    in search results.</p>    

                    <span><label htmlFor='price'>Price: </label></span><span className='error'> {hasSubmitted && validationErrors.price && `${validationErrors.price}`}</span>
                    <input id='price' type="text" value={price}
                        onChange={(e) => setPrice(e.target.value)} />

    
                    <button
                        type="submit"
                        className="spotbutton">Update Spot</button>
                </form >
           
        </div>
    )
}

export default UpdateSpot