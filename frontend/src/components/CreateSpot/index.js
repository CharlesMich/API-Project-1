import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./createspot.css"

function CreateSpot() {
    const history = useHistory();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [preview, setPreview] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);


    useEffect(() => {
        const errors = {};
        if (country.length === 0) errors.country = 'Country is required';
        if (address.length === 0) errors.address = 'Address is required';
        if (city.length === 0) errors.city = 'City is required';
        if (state.length === 0) errors.state = 'State is required';
        if (lat.length === 0) errors.lat = 'Latitude is required';
        if (lng.length === 0) errors.lng = 'Longitude is required';
        if (isNaN(lat)) errors.lat = 'Latitude must be a  number between -90 and 90';
        if (isNaN(lng)) errors.lng = 'Longitude must be a  number between -180 and 180';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (name.length === 0) errors.name = 'Name is required';
        if (price.length === 0) errors.price = 'Price is required';
        if (isNaN(price) || price <= 0) errors.price = 'Price has be above 0 dollars'
        if (preview.length === 0) errors.preview = 'Preview image is required';
        if (!preview.match(/\.(jpg|jpeg|png)$/)) errors.preview = 'Image URL must end in .png, .jpg, or .jpeg';
        if (img1 && !img1.match(/\.(jpg|jpeg|png)$/)) errors.img1 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (img2 && !img2.match(/\.(jpg|jpeg|png)$/)) errors.img2= 'Image URL must end in .png, .jpg, or .jpeg';
        if (img3 && !img3.match(/\.(jpg|jpeg|png)$/)) errors.img3 = 'Image URL must end in .png, .jpg, or .jpeg';
        if (img4 && !img4.match(/\.(jpg|jpeg|png)$/)) errors.img4 = 'Image URL must end in .png, .jpg, or .jpeg';
        setValidationErrors(errors);
    }, [country, address, city, state, lat, lng, description, name, price, preview, img1, img2, img3, img4])

    const onSubmit = (e) => {
        e.preventDefault();

        const createSpotFrom = {
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

        if (CreateSpot) {
            history.push(`/spots/${CreateSpot.id}`);
          }
    }
    return (
        <div className="spotform-container">
                <div>
                <h2>Create a new Spot</h2>
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

                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>    
                    <span><label htmlFor='preview'></label></span><span className='error'> {hasSubmitted && validationErrors.preview && `${validationErrors.preview}`}</span>
                    <input id='preview' type="text" placeholder="Preview Image URL" value={preview}
                        onChange={(e) => setPreview(e.target.value)} />
                        <span><label htmlFor='img1'></label></span><span className='error'> {hasSubmitted && validationErrors.img1 && `${validationErrors.img1}`}</span>
                    <input id='img1' type="text" placeholder="Image URL" value={img1}
                        onChange={(e) => setImg1(e.target.value)} />
                        <span><label htmlFor='img2'></label></span><span className='error'> {hasSubmitted && validationErrors.img2 && `${validationErrors.img2}`}</span>
                    <input id='img2' type="text" placeholder="Image URL" value={img2}
                        onChange={(e) => setImg2(e.target.value)} />
                        <span><label htmlFor='img3'></label></span><span className='error'> {hasSubmitted && validationErrors.img3 && `${validationErrors.img3}`}</span>
                    <input id='img3' type="text" placeholder="Image URL" value={img3}
                        onChange={(e) => setImg3(e.target.value)} />
                        <span><label htmlFor='img4'></label></span><span className='error'> {hasSubmitted && validationErrors.img4 && `${validationErrors.img4}`}</span>
                    <input id='img4' type="text" placeholder="Image URL" value={img4}
                        onChange={(e) => setImg4(e.target.value)} />
    
                    <button
                        type="submit"
                        className="spotbutton">Create Spot</button>
                </form >
           
        </div>
    )
}

export default CreateSpot