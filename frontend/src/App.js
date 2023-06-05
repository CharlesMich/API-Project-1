import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SpotsIndex from "./components/spots/spots";
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import SpotsofUser from "./components/UserSpots";


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
         <Route exact path="/spots/:spotId"><SpotDetails/></Route>
         <Route path="/spots/current"><SpotsofUser/></Route>
      </Switch>
    )}
  </>
  );
}

export default App;
