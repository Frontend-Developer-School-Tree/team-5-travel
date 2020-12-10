
import {
  Link
} from "react-router-dom";

import React, { useContext, useEffect, useState } from 'react'
import { authContext } from "../context/ProvideAuth";

import "../assets/Navbar.css";

const Navbar = () => {
  let auth = useContext(authContext);
  const [showMenu, setShowMenu] = useState(false)
  
  return (

    <div className="Navbar">

      <div className="NavbarContainer">
        <div className="userBox" onClick={() => { setShowMenu(!showMenu) }} >
          <i className="fas fa-user userIcon"></i>
          <h4 className="ml-2">{auth.user}</h4>
        </div>
        <div className="userActions" style={showMenu ? { display: "block" } : { display: "none" }}>

          <a className="modLink" href="#Mappa"><div className="userActionsButton"><h2>Mappa</h2></div></a>
          <a href="#ListaPosti" className="modLink"> <div className="userActionsButton"><h2>Itinerario</h2></div></a>
          <a href="#Tariffe" className="modLink"><div className="userActionsButton"><h2>Informazioni</h2></div></a>
          <Link to="/login" onClick={() => { auth.signout() }} className="modLink">
            <div className="userActionsButton"><h2>Logout</h2></div>
          </Link>
        </div>

      </div >
    </div >
  )
};

export default Navbar;
