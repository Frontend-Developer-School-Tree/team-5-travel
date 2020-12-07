import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../assets/Operator.css";
import { FaHome, FaMailBulk, FaPhoneAlt } from "react-icons/fa";
import { Card } from "react-bootstrap";

function Operator() {
  const { data } = useContext(AppContext);

  return (
    <div className="operator">
      <Card
        className="mt-5"
      >
        <Card.Body className="operator__cardBody">
          <div className="operatorFoto container-image" style={{ backgroundImage: `url(${data.operator.image})` }}></div>
          <div className="operator__cardBody__sx">
    
            <h3 className="mt-2">{data.operator.name}</h3>
            <p>Il tuo agente di viaggio</p>
            <div className="d-flex">
              <FaPhoneAlt />
              <a href="#" style={{ marginLeft: "1rem" }}>
                {data.operator.contact.phone}
              </a>
            </div>
            <div className="d-flex">
              <FaMailBulk />
              <a href="#" style={{ marginLeft: "1rem" }}>
                {data.operator.contact.email}
              </a>
            </div>
            <div className="d-flex">
              <FaHome />
              <a href="#" style={{ marginLeft: "1rem" }}>
                {data.operator.contact.website}
              </a>
            </div>
          </div>
          <div className="operator__cardBody__dx">
            <img src={data.agency.image} style={{ width: 90, height: 40 }} />
            <p>
              - Insolita Travels di InSicilia snc: Tour Operator Sicilia, DMC e
              Agenzia di Viaggi; - Licenza Agenzia Viaggio nr. 2226/S2-TUR della
              Regione Siciliana; - Polizza R.C. nr. 45130310-RC14 Europaische
              Reiserversicherung AG; - InSicilia snc è iscritta all'Ufficio
              Registro Imprese di Catania N. REA 260386; - Fondo Garanzia
              Viaggi: Certificato n. A/286.1059/1/R;
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Operator;
