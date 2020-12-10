import React, { useContext, useEffect, useState } from 'react'

import '../assets/Posti.css';

//importazione componenti
import Header from './Header'
import Spinner from './Spinner'
import MapComp from './MapComp'
import ListaPosti from './ListaPosti'
import Operator from './Operator';
import Footer from './Footer';


import Navbar from './Navbar'

import { AppContext } from "../context/AppContext";
import { authContext } from "../context/ProvideAuth";

import Tariffe from './Tariffe';
import '../assets/cardInfo.css';
import ListaInfo from './ListaInfo';
import Chatbot from './Chatbot';


function Page() {
  const { data } = useContext(AppContext)
  let auth = useContext(authContext);

  useEffect(() => {
    //console.log("PAGE: ", auth)
  }, [])


  return (

    <div className="Page">

      {data
        ?
        <>

          <Navbar />
          <Chatbot />
          <Header />

          <div className="Container">
            <Operator />
            <MapComp />
            <ListaPosti />
            <Tariffe />
            <ListaInfo />
          </div>

          <Footer />

        </>

        :
        <Spinner />

      }

    </div>

  )

}

export default Page