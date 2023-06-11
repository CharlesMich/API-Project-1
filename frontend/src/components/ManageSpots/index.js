import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchManageSpots } from '../../store/SpotsReducer';
import { Link } from 'react-router-dom';
import DeleteFormModal from '../DeleteFormModal';
import OpenModalButton from "../OpenModalButton";
// import UpdateSpot from '../UpdateSpot';
import './managespots.css'

function ManageSpots() {

   
    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots);
       
    console.log("manage spots", spots)

    useEffect(() => {
        dispatch(fetchManageSpots())
    }, [dispatch])

    if(!spots) return null

    const spotArr = Object.values(spots)
    if (!spotArr.length) {
        return (
            <>
                <h1>Manage Your Spots</h1>
                <div>There are no current Spots</div>
                <Link to="/spots/new" className="createNew" style={{ textDecoration: 'none', color: 'white' }}>Create a new Spot</Link>
            </>
        )
    }
    return (
        <div className="outer">
         <div >   
            <h1>Manage Your Spots</h1>
            <Link to="/spots/new" className="createNew" style={{ textDecoration: 'none', color: 'rgb(6 45 70)' }}>Create a new Spot</Link>
            </div> 

            {spotArr.map(ele => (
                <div className="outerDiv">
                    <div className="map">
                        <div className = "imgclass"> <Link to={`/spots/${ele.id}`} key ="ele.id"><img className="manageImg" src={ele.previewImage} alt="ele.name"/></Link></div>
                        <div className="cityState">
                            <div>{ele.city}, {ele.state}</div>
                            <div><i class="fa-solid fa-star"></i>  {ele.avgRating}</div>

                        </div>
                        <div>${ele.price} per night</div>
                        <div className="update">
                            
                            <Link to={`/spots/${ele.id}/edit`} key= {ele.id} style={{ textDecoration: 'none', color: 'white', backgroundColor:"rgb(6 45 70)", fontSize:"9px", height:"13px", paddingTop:"7px" }}>Update</Link>
                            {/* <Link to="" style={{ textDecoration: 'none', color: 'white' }}>Delete</Link> */}
                            <OpenModalButton buttonText="Delete" modalComponent={<DeleteFormModal spot ={ele.id}/>}/>
    
        
      


                        </div>

                    </div>
                </div>

            )

            )}
       </div>
       
    )
}

export default ManageSpots;