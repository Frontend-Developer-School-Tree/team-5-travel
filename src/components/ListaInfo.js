import React, { useContext } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { AppContext } from "../context/AppContext";

const ListaInfo = () => {
  const { data } = useContext(AppContext);

  return (
    <div className="containerInfo mt-5">
      <Accordion>
        <Info info={data.documentsRequested} eventKey="0"/>
      </Accordion>
      <Accordion>
        <Info info={data.documentsInsurance} eventKey="1"/>
      </Accordion>
      <Accordion>
        <Info info={data.documentsCancellation} eventKey="2"/>
      </Accordion>
      <Accordion>
        <Info info={data.documentsPayment} eventKey="3"/>
      </Accordion>
      <Accordion>
        <Info info={data.documentsCarRental} eventKey="4"/>
      </Accordion>
    </div>
  );
};

export default ListaInfo;

const Info = ({ info,eventKey }) => {
  return (
    <Card>
      <Card.Header className="infoCardHeader">
        <Accordion.Toggle as={Button} variant="outline-light" eventKey={eventKey}>
          <h2>{info.name}</h2>
          <i className="fas fa-angle-down"></i>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>
          <div> {info.description} </div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

