import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchManageSpots } from '../../store/SpotsReducer';
import { Link } from 'react-router-dom';
import './managespots.css'

function ManageSpots() {

    const sessionUser = useSelector((state) => state.session.user)

    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots);



    useEffect(() => {
        dispatch(fetchManageSpots())
    }, [dispatch])

    const spotArr = Object.values(spots)
    console.log(spotArr)
    return (
        <>
            <h1>Manage Your Spots</h1>
            <Link to="/spots/new" className="createNew" style={{ textDecoration: 'none', color: 'white' }}>Create a new Spot</Link>
            <div className="container">
                {spotArr.map(ele => (
                    <div className="map">
                        <div><img src={ele.previewImage} alt="ele.name" /></div>
                        <div className="cityState">
                            <div>{ele.city}, {ele.state}</div>
                            <div><i class="fa-solid fa-star"></i>  {ele.avgRating}</div>
                            
                        </div>
                        <div>${ele.price} per night</div>
                        <div className= "update">
                                <Link to= "" style={{ textDecoration: 'none', color: 'white' }}>Update</Link>
                                <Link to= "" style={{ textDecoration: 'none', color: 'white' }}>Delete</Link>


                            </div>

                    </div>
              
            )
             
        )}
        </div >
        </>
    )
}

export default ManageSpots;