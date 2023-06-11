import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
// import {Link} from 'react-router-dom'
import { fetchSpotDetails } from '../../store/SpotsReducer';
import './spotdetail.css'
import { fetchReviews } from '../../store/reviewsReducer';
import OpenModalButton from '../OpenModalButton';
import CreateReviewModal from '../CreateReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';



function SpotDetails() {
    const { spotId } = useParams();
   
    const spot = useSelector((state) => state.spots[spotId]
    );


    const sessionUser = useSelector((state) => state.session.user);
   
    
  
  

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
    }, [dispatch, spotId])


    const reviews = useSelector(state => state.reviews)
    console.log('reviews inside selector', Object.values(reviews))

    useEffect(() => {
        dispatch(fetchReviews(spotId));
    }, [dispatch, spotId])


    if (!spot || !spot.User || !spot.SpotImages) {
        return null;
    }

    if (!reviews) return null;

    if(!sessionUser) return null;

    const reviewArr = Object.values(reviews);

    reviewArr.sort((a,b)=> {
        return new Date(b.createdAt) - new Date(a.createdAt);
    })
    // check if user is the owner of the property;
    let oWner;
    spot.ownerId === sessionUser.id? oWner= true: oWner=false;

    //  check if user is signed in;


    // check if there are no reviews



    // check if user has no reviews
    let userNoReview = true;

  if (reviewArr.length > 0) {
    reviewArr.forEach(review => {
      if (review.userId === sessionUser.id) userNoReview = false;
    });
  }





    

    // console.log(reviewArr)

    // reviewArr.forEach((ele) => {
    // //     let date = ele.createdAt
    // //    let dateParsed = Date.parse(date);
    // //   let dateobj = new Date(dateParsed)
    // //   let newdate = dateobj.toString()
    // //   let dateArr = newdate.split(' ')
    //   let value = ele.createdAt.split('T')
    //   ele.createdAt=value
    // })
    function utcToMonYear(date){
        const month = date.split('T')[0].split('-')[1];
        const year = date.split('T')[0].split('-')[0];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthText = months[parseInt(month)];
        return (monthText +" " + year)
      }

      

    return (

        <div className='outer-container'>
            <div className="pagetitle">{spot.name}</div>
            <div className="pagesubtitle">{spot.city},{spot.state}, {spot.country}</div>
            {/* <div>Hosted by {spot.User.firstName} {spot.User.lastName}</div>
            <div>{spot.description}</div> */}


            <div className="image-container">
                <div className="previewImg"><img className={spot.SpotImages} src={spot.SpotImages[0] && spot.SpotImages[0].url} alt="" /></div>
                <div class="imgGridOuter">
                    <div className="imgGrid"><img className={spot.SpotImages} src={spot.SpotImages[1] && spot.SpotImages[1].url} alt="" /></div>
                    <div className="imgGrid"><img className={spot.SpotImages} src={spot.SpotImages[2] && spot.SpotImages[2].url} alt="" /></div>
                    <div className="imgGrid"><img className={spot.SpotImages} src={spot.SpotImages[3] && spot.SpotImages[3].url} alt="" /></div>
                    <div className="imgGrid"><img className={spot.SpotImages} src={spot.SpotImages[4] && spot.SpotImages[4].url} alt="" /></div>
                </div>

            </div>

            <div className="middle">
                <div className="middleLeft">
                    {/* <div className="description"> */}
                    <div className="secondTitle">Hosted by {spot.User.firstName} {spot.User.lastName}</div>
                    <div className="descriptText"><p style={{ color: "rgb(6 45 70)", fontSize:"12px" }}>{spot.description}!</p></div>
                    {/* </div> */}
                </div>

                <div className="middleRight">
                    <div className="middleRight-line1">
                        <div className="abc">${spot.price} night</div>
                        <div className="abc">
                            <span><i class="fa-solid fa-star"></i></span>
                            <span>{spot.avgStarRating && spot.avgStarRating.toFixed(1)}</span>
                            <span > ·</span>
                        </div>
                       {spot.numReviews === 1?<div className="abc">{spot.numReviews} Review</div>:<div className="abc">{spot.numReviews} Reviews</div>} 
                    </div>
                    <div><button className='reserve' onClick={() => alert('Feature coming soon')} style={{textAlign:"center"}}>Reserve</button></div>
                </div>
            </div>

            

                <div className="lower">

                    <span className="lower-top"><i class="fa-solid fa-star"></i></span>
                    <span className="lower-top">{spot.avgStarRating && spot.avgStarRating.toFixed(1)}</span>
                    <span className="lower-top">{spot.numReviews ? `${spot.numReviews} reviews` : "New"}</span>
                </div>

        
                <span>{sessionUser && oWner ===false && reviewArr.length ===0 ? <div><OpenModalButton buttonText="Be the first to post a Review" className="postReview" modalComponent={<CreateReviewModal spot={spotId} />} /></div>:null}</span>
                <span>{sessionUser && oWner ===false && reviewArr.length > 0 && userNoReview? <div  ><OpenModalButton buttonText="Post your Review" className="postReview" modalComponent={<CreateReviewModal spot={spotId} />} /></div> : null}</span>

                <div className="reviewMap">{reviewArr && reviewArr.map(review => (
                    <>

                        <div className="reviewName">{review.User? review.User.firstName: null}</div>
                        <div className="reviewDate">{utcToMonYear(review.createdAt)}</div>
                     
                        <div className="reviewReview">{review.review}</div>
                        <div style={{height:"20px"}}></div>
                        <div className = "deleteReview">{sessionUser && sessionUser.id === review.userId ? <div><OpenModalButton buttonText="Delete"  modalComponent={<DeleteReviewModal reviewId={review.id} />} /></div> : null}</div>


                    </>

                )

                )}</div>
            </div >


            )
}

            export default SpotDetails