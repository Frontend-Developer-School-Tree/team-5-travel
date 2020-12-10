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

  const bgLogin = [
    'https://player.vimeo.com/external/363625327.hd.mp4?s=a283f7b8f1d1ed97cbb8fc90b871902f3a1e74d1',
    'https://player.vimeo.com/external/363013770.hd.mp4?s=be9384be9bd9b3f9b0cddb8de748749cd07affbb',
    'https://player.vimeo.com/external/328465444.hd.mp4?s=ccacdf37ba36c680f9e7969d77e5a2e36572f544',
    'https://player.vimeo.com/external/333365608.hd.mp4?s=1c5b78844d76fe0d099409a3c94ecf55c911ebb0',
    'https://player.vimeo.com/external/330412624.hd.mp4?s=9a9c77ce40f703dcb023eca64c85e258195efa28',
    'https://static.pexels.com/lib/videos/free-videos.mp4'
  ]

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
    <div className="LoginContainer">
      <video autoPlay loop muted style={{
        position: "absolute",
        width: '100%',
        left: '50%',
        top: '50%',
        height: '100%',
        objectFit: 'cover',
        transform: "translate(-50%, -50%)",
        zIndex: '-1'
      }}>


        <source src={bgLogin[Math.floor(Math.random()*(bgLogin.length-1 - 0)) + 0]} type="video/mp4">
        </source>

      </video>
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
    </div>
  );
};

export default Login;
