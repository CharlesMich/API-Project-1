import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    
    <div class = "container">
      <h1>Welcome to Yourbnb</h1>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label>
      
          <input
            type="text" placeholder="Username"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        </div>
        <div>
        <label>
        
          <input
            type="password" placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        {errors.credential && <p>{errors.credential}</p>}
        <button className= "loginButton" type="submit">Continue</button>
      </form>
      </div>
    
  );
}

export default LoginFormModal;