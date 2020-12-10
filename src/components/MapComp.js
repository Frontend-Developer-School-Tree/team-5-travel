import React, { useContext, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "../assets/MapComp.css";
import { AppContext } from "../context/AppContext";
import { MapContainer,Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Card, Button, Breadcrumb } from "react-bootstrap";
import { GoChevronRight } from "react-icons/go";
import MapIcon from '../assets/img/pin.svg'
import L from 'leaflet';

const MapComp = () => {

  let leafletIcon = L.icon({
    iconUrl:MapIcon,

    iconSize:[30,30],
    

})
  const { data } = useContext(AppContext);

  let adulti = 0;
  let adolescenti = 0;
  data.partecipants.forEach((x) => {
    if (x.type == "adulto") {
      adulti += 1;
    } else if (x.type == "adolescente") {
      adolescenti += 1;
    }
  });

  const arrCitta = [];
  const coordsCitta = [];
  const filtFunc = data.rows.map((x) => {
    return (
      arrCitta.push(x.places[0].name),
      coordsCitta.push(x.places[0].position.coords)
    );
  });
  const filt = arrCitta.filter((x, index) => {
    return arrCitta.indexOf(x) === index;
  });

  const dataFrom = data.dateFrom.substring(
    data.dateFrom.length - 2,
    data.dateFrom.length
  );
  const dataTo = data.dateTo.substring(
    data.dateFrom.length - 2,
    data.dateFrom.length
  );
  const giorni = dataTo - dataFrom + 1;
  const notti = dataTo - dataFrom;

  // console.log(giorni);
  // console.log(notti);

  return (
    <>
      <div className="mapComp" id="Mappa">
        <Card className="mapComp_cardContainer">
          <Card.Body>
            <div className="mapComp_cardContainer_mapWrapper">
              <MapContainer
                style={{ width: "100%", height: 300 }}
                center={coordsCitta[0]}
                zoom={7}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordsCitta.map((coord, i) => (
                  <Marker key={i} position={coord} icon={leafletIcon}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <Card.Title className="cardTitle text-uppercase">{data.title}</Card.Title>
            <Breadcrumb className="breadCrumb">
              {filt.map((el, i) => (
                <Breadcrumb.Item key={i} active>
                  {el}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
            <h5>
              <GoChevronRight />
              Dal {data.dateFrom} al {data.dateTo}{" "}
            </h5>
            <h5>
              <GoChevronRight />
              {`Adulti: ${adulti}`}
            </h5>
            <h5>
              <GoChevronRight />
              {`Adolescenti : ${adolescenti}`}
            </h5>
            <h5>
              <GoChevronRight />
              {`Giorni: ${giorni} - Notti: ${notti}`}
            </h5>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MapComp;
