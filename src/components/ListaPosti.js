import React, { useState, useEffect, useContext } from "react";

import { Accordion, Card } from 'react-bootstrap';

import { AppContext } from "../context/AppContext";

import Posto from './Posto'


const ListaPosti = () => {

  const { data } = useContext(AppContext)
  const giorni = data.rows
  const [posti, setPosti] = useState([])

  const unisciPosti = (arr) => {
    const placesArray = []
    let a = 0
    let currPosto = arr[0].places[0].name
    let datePosto = []
    arr.map((item, index) => {
      if (index + 1 < giorni.length) {
        const nextPosto = arr[index + 1].places[0].name

        datePosto.push({
          "day": item.dayDate,
          "id": index
        })

        if (currPosto !== nextPosto) {
          const b = index + 1

          placesArray.push({
            "nomePosto": currPosto,
            "datePosto": datePosto,
            "infoPosto": arr.slice(a, b)
          })
          a = index + 1
          datePosto = []
          currPosto = nextPosto
        }
      }
      else {
        datePosto.push({
          "day": item.dayDate,
          "id": index
        })
        placesArray.push({
          "nomePosto": currPosto,
          "datePosto": datePosto,
          "infoPosto": arr.slice(a)
        })
        datePosto = []
      }
    })
    return placesArray
  }

  const ordinaDataArray = (arr, type) => {
    arr.sort(function (a, b) {
      const nameA = new Date(a.dayDate);
      const nameB = new Date(b.dayDate);
      if (nameA < nameB) {
        if (type === "asc")
          return -1;
        else
          return 1
      }
      if (nameA > nameB) {
        if (type === "asc")
          return 1
        else
          return -1
      }
      return 0;
    })
    return arr
  }

  const stampaControllo = (arr) => {
    arr.map(el => {
      console.log("_____________________________________________")
      console.log("NomePosto: ", el.nomePosto, "  DatePosto: ", el.datePosto)
      console.log("InfoPosto:")
      el.infoPosto.map(ol => (
        console.log("      Presso ", ol.places[0].name, " il ", ol.dayDate, " con id ", ol.id)
      ))
    })
  }



  useEffect(() => {
    setPosti(unisciPosti(ordinaDataArray(giorni, "asc")))
    stampaControllo(posti)
  }, [])


  return (
    <div className="ListaPosti" id="ListaPosti">

          {posti.map((posto, index) => (

            <Accordion defaultActiveKey={posto.infoPosto[0].id} key={index} >
              <Posto posto={posto} eventKey={posto.infoPosto[0].id} />
            </Accordion>

          ))}
 
    </div>
  )
}

export default ListaPosti
