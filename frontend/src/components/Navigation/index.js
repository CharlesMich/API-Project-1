import React from "react";
import { NavLink } from "react-router-dom";
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
    <span className='title'>YourBnB</span>
    </div>
    <div className = 'menu-right'>
    <ul className="top-right"> <li><NavLink exact to="/"><i className="fa-solid fa-house"/></NavLink></li>
      <div class = 'test1'>
      {isLoaded && sessionLinks}
      </div>
    </ul>
    </div>
    </div>
  );
}

export default Navigation;