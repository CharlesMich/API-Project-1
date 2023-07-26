import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SpotsIndex from "./components/spots/spots";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot";
import ManageReviews from "./components/ManageReviews";
import CreateReviewModal from "./components/CreateReviewModal";
import Booking from "./components/Booking";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
         <Route exact path="/"><SpotsIndex/></Route>
       
         <Route exact path="/spots/new"><CreateSpot/></Route>
         <Route path="/spots/current"><ManageSpots/></Route>
         <Route exact path="/spots/:spotId"><SpotDetails/></Route>
         <Route exact path="/spots/:spotId/edit"><UpdateSpot/></Route>
         <Route path="/reviews/current"><ManageReviews/></Route>
         <Route path="/booking/new"><Booking/></Route>
        
      </Switch>
    )}
  </>
  );
}

export default App;
