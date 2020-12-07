import React, { Component } from 'react'
import  {useContext} from "react";
import '../assets/Footer.css'
import { AppContext } from "../context/AppContext";
import { FaDownload } from "react-icons/fa";
function Footer(){
    const { data } = useContext(AppContext);


    {
        return (
            <div className="footer">
               <div className="footer__container">
                   <div className="footer__container__sx">
                   <img src={data.agency.image} style={{ width: 90, height: 40,marginBottom:'2vh' }} />
                       <p>Insolita Travels | Sicily DMC - Travel Agency (Licence nr. 2226/S2-Tur)</p>
                       <p>Viale della Gioventù, 26 A -95014 Giarre (Catania)</p>
                   </div>
                   <div className="footer__container__dx">
                       <button><FaDownload/>Download</button>
                   </div>
               </div>
            </div>
        )
    }
}

export default Footer
