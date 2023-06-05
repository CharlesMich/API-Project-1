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
    <i className ="fa-solid fa-seedling"/>
    <span className='title'><NavLink exact to="/"  style={{ textDecoration: 'none', color: 'inherit' }}>YourBnB</NavLink></span>
    </div>
    <div className = 'menu-right'>

    {sessionUser ? <Link to="/spots/new" style={{ textDecoration: 'none', color: 'inherit'}}>Create New Spot</Link> : <></>}  
    
      {isLoaded && <ProfileButton user={sessionUser}/>}
     
    </div>
    </div>
  );
}

export default Navigation;