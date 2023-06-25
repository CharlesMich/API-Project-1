import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUser from "./DemoUser";
// import ManageSpots from "../ManageSpots";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push(`/`);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button className= "profilebutton" onClick={openMenu}>
      <i className ="fa-solid fa-bars fa-2x"></i>
        <i className="fas fa-user-circle fa-2x" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li style={{fontSize:"12px"}}>Hello, {user.username}</li>
            <li style={{fontSize:"12px", borderBottom: "1px solid black", paddingBottom:"10px"}}>{user.email}</li>
            <li><Link to ="/spots/current" style={{ textDecoration: 'none', color: 'inherit'}}>Manage Spots</Link></li>
            <li><Link to ="/reviews/current" style={{ textDecoration: 'none', color: 'inherit'}}>Manage Reviews</Link></li>
            <li className="abc">
              
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li className = 'abc'>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li className = 'abc'>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li >
            <li className = 'abc'>
              
            <DemoUser onClick={closeMenu}/> </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;