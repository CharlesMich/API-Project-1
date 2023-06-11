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
            style={{width:"200px"}}
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
            style={{width:"200px", }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        {errors.credential && <p>{errors.credential}</p>}
        <button className= "loginButton" style={{width:"200px"}} type="submit">Continue</button>
      </form>
      </div>
    
  );
}

export default LoginFormModal;