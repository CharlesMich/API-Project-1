import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <div className = "topbar">
      <div className = "logotitle">
    <Link to ="/"><img className = "logo" src = "https://myaaprojects.s3.us-east-2.amazonaws.com/yourbnbfav.png" alt=""/></Link>
    <span className='title'><NavLink exact to="/"  style={{ textDecoration: 'none', color: 'rgb(168 42 100)' }}>YourBnB</NavLink></span>
    </div>
    <div className = 'menu-right'>

    {sessionUser ? <Link to="/spots/new" className="" style={{ textDecoration: 'none', color: 'rgb(6 45 70)'}}>Create New Spot</Link> : <></>}  
    
      {isLoaded && <ProfileButton user={sessionUser}/>}
     
    </div>
    </div>
  );
}

export default Navigation;