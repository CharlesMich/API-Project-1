import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    
    <div class = "container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label>
        
          <input
            type="text" placeholder="Email"
            style={{marginRight:"15px"}}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
         
          <input
            type="text" placeholder="Username"
            style={{marginRight:"15px"}}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
       
        {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
        <label>
         
          <input
            type="text" placeholder="First Name"
            style={{marginRight:"15px"}}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
        
          <input
            type="text" placeholder="Last Name"
            style={{marginRight:"15px"}}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <div>
        <label>
        
          <input
            type="password" placeholder="Password"
            style={{marginRight:"15px"}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
         
          <input
            type="password" placeholder="Confirm Password"
            style={{marginRight:"15px"}}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
       
        
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
         </div>
        <div id="wrapper">
        <button 
        // disabled={
        //   errors.length === 0 && confirmPassword === password ? false : true
        // }
        className="loginButton" type="submit">Sign Up</button>
        </div>
      </form>
      </div>
    
  );
}

export default SignupFormModal;