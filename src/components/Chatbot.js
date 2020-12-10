
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

  const submitForm = (e) => {
    e.preventDefault();
    console.log("text", text)
    setMessaggi(prevState => {
      const newState = [...prevState]
      newState.push({
        body: text,
        sent: true
      })
      return newState
    })

    setText("")
    setText("aaaaaaaaaaaaaaaa")
    console.log("textrisp", text)
    setMessaggi(prevState => {
      const newState = [...prevState]
      newState.push({
        body: "Mi spiace, non capisco",
        sent: false
      })
      return newState
    })
    setText("")
  }

  useEffect(() => {
    console.log("messaggi", messaggi)
  }, [messaggi])


  return (

    <div className="Chatbot">

      <div className="ChatbotContainer">
        <Accordion defaultActiveKey="999999">
          <Card>

            <Accordion.Collapse eventKey="999999">
              <Card.Body>
                <div className="listaMessaggi">
                  {messaggi.map((messaggio, index) => (
                    <div className="msgItem" key={index}>
                      <div style={messaggio.sent ? { textAlign: "left", color: "black" } : { textAlign: "right", color: "#004a4a" }}>
                        {messaggio.body}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="formInput">
                  <form onSubmit={(e) => submitForm(e)} noValidate>
                    <div className="d-flex">
                      <input type="text" placeholder="Inserisci un messaggio" className="inputMessagge"
                        name="messaggio" value={text} onChange={(e) => { setText(e.target.value) }}></input>
                      <button className="inputButton" type="submit" name="confirm">OK</button>
                    </div>
                  </form>
                </div>
              </Card.Body>

            </Accordion.Collapse >
            <Accordion.Toggle variant="outline-light" eventKey="999999" onClick={() => { setArrow(!arrow) }}>
              <div className="parlaCon">
                <div className="nomeOperatore">Parla con <strong>{data.operator.name}</strong></div>
                <div className="arrowIcon">
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
