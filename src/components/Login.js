import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../context/ProvideAuth";
import { useHistory } from "react-router-dom";
import "../assets/Login.css";

const Login = () => {

  const [username, setUsername] = useState("team5");
  const [password, setPassword] = useState("123");

  
  let auth = useContext(authContext);
  let history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();
    console.log("username: ", username);
    console.log("password: ", password);

    if (username === "team5" && password === "123") {
      auth.signin(username);
      history.push("/main");
    }

  }
  


  useEffect(() => {
    console.log("LOGIN: ", auth);
  }, []);

  return (

    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={(e) => submitForm(e)} noValidate>
        <div className="user-box">
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <label>Password</label>
        </div>
        <button type="submit" name="confirm">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
