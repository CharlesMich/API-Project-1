import React, { useState, useEffect } from "react";
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



  useEffect(()=>{
   const errors = {}
      if(credential.length < 4) errors.credential = "Username must be atleast 4 characters";
      if (password.length < 6) errors.password = "Password must be 6 characters long"
      setErrors(errors)
      console.log(errors)
  }, [credential, password])

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
        <button 
        
       disabled= {errors.credential || errors.password? true : false}
        className= "loginButton" 
        style={{width:"200px"}} type="submit">Continue</button>
      </form>
      </div>
    
  );
}

export default LoginFormModal;