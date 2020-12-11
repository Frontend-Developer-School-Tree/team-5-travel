
import {
  Link
} from "react-router-dom";
import { Accordion, Card, Button } from 'react-bootstrap';
import { AppContext } from "../context/AppContext";

import React, { useContext, useEffect, useState } from 'react'
import { authContext } from "../context/ProvideAuth";

import "../assets/Chatbot.css";

const Chatbot = () => {
  const { data } = useContext(AppContext);

  let auth = useContext(authContext);
  const [showMenu, setShowMenu] = useState(false)
  const [arrow, setArrow] = useState(true)
  const [messaggi, setMessaggi] = useState([])
  const [text, setText] = useState("")
  const [sent, setSent] = useState(false)
  const [msgExit, setMsgExit] = useState(false)
  const messagesEndRef = React.createRef()

  const rispRand = ["Non era meglio se rimanevi a Siracusa?",
    "Non lo so, prova a fare un console.log()",
    "Il computer si riavvierà tra qualche secondo...",
    "Dovresti implementare le emoticon ;)","Dovresti implementare le emoticon ;)"]
  const popupSent = {
    justifyContent: "flex-start",
    display: "flex", textAlign: "left"
  }
  const bgSent = { backgroundColor: "#c1ffc1" }
  const bgReceived = { backgroundColor: "#ffe9c1" }
  const popupReceived = {
    justifyContent: "flex-end",
    display: "flex", textAlign: "right"
  }

  const submitForm = (e) => {
    e.preventDefault();
    if (text === "sconto") {
      setMsgExit(true)
    }
    setMessaggi(prevState => {
      const newState = [...prevState]
      newState.push({
        body: text,
        sent: true
      })
      return newState
    })
    setSent(true)
    setText("")
  }

  const rispondeBot = () => {
    setSent(false)
    setMessaggi(prevState => {
      const newState = [...prevState]
      newState.push({
        body: rispRand[Math.floor(Math.random() * (rispRand.length - 1 - 0)) + 0],
        sent: false
      })
      return newState
    })
  }

  useEffect(() => {
    let timer = setTimeout(() => rispondeBot(), 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [sent]
  )

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messaggi]
  )


  return (

    <div className="Chatbot" style={msgExit ? { display: "none" } : { display: "flex" }}>

      <div className="ChatbotContainer">
        <Accordion>
          <Card>

            <Accordion.Collapse eventKey="999999">
              <Card.Body>
                <div className="listaMessaggi">
                  {messaggi.map((messaggio, index) => (
                    <div className="msgItem" style={messaggio.sent ? popupSent : popupReceived} key={index}>
                      <div className="popupMsg" style={messaggio.sent ? bgSent : bgReceived}>
                        {messaggio.body}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="formInput">
                  <form onSubmit={(e) => submitForm(e)} noValidate>
                    <div className="d-flex">
                      <input type="text" placeholder="Inserisci un messaggio..." className="inputMessagge"
                        name="messaggio" value={text} onChange={(e) => { setText(e.target.value) }}></input>
                      <button className="inputButton" type="submit" name="confirm">Invia</button>
                    </div>
                  </form>
                </div>
              </Card.Body>

            </Accordion.Collapse >
            <Accordion.Toggle variant="outline-light" eventKey="999999" onClick={() => { setArrow(!arrow) }}>
              <div className="parlaCon">
                <div className="nomeOperatore">
                  <span className="talkWith">Parla con <strong>{data.operator.name}</strong></span></div>
                <div className="arrowIcon"><i className="fa fa-headset headsetChatBot"></i>

                  {arrow ?
                    <i className="fa fa-angle-down"></i> :
                    <i className="fa fa-angle-up"></i>
                  }
                </div>
              </div>
            </Accordion.Toggle>
          </Card>
        </Accordion>

      </div >
    </div >
  )
};

export default Chatbot;
