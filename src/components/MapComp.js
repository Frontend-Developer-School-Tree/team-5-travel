import React, { useContext, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "../assets/MapComp.css";
import { AppContext } from "../context/AppContext";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Card, Button, Breadcrumb } from "react-bootstrap";
import { GoChevronRight } from "react-icons/go";


const MapComp = () => {
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

  console.log(giorni);
  console.log(notti);

  return (
    <>

                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {coordsCitta.map((coord, i) => (
                  <Marker key={i} position={coord}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
            <Card.Title className="cardTitle">{data.title}</Card.Title>
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
