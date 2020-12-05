import React, { useContext, Fragment } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { AppContext } from "../context/AppContext";

const Tariffe = () => {
  const { data } = useContext(AppContext);
  const { included, notIncluded } = data;

  const getTotalPrice = (res) => {
    let totPrice = 0;
    res.partecipants.forEach((elem) => {
      totPrice += elem.price;
    });
    //  console.log('totprezzo',totPrice);
    return totPrice;
  };

  const goOver = (json) => {
    // console.log("'Tipo data.included:'", typeof included);
    var newIncluded = json.split("\n");
    // console.log('New included(array):',included)
    // var text = ""
    // for (var i = 0; i < arr.length; i++) {
    //   text += newIncluded[i] + <br/>
    // }
    return (
      // included.replace(/\n/g, <br/>)
      newIncluded.map((elem, index) => (
        <Fragment key={index}>
          {elem} <br />
        </Fragment>
      ))
    );
  };

  // console.log(goOver(included))

  return (
    <div className="container ml-5 mt-5 mr-5 pl-5 pr-5">
      <div className="row">
        <div className="col">
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Button} variant="" eventKey="0">
                <Card.Header>
                  <h2>TARIFFE</h2>
                  <i className="fas fa-angle-down"></i>
                </Card.Header>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <hr />
                  {data.partecipants.map((elem) => (
                    // {console.log("type:",elem.id)}
                    <div className="boxType" key={elem.id}>
                      <p> {elem.type} </p>
                      <p style={{ color: "grey", fontWeight: "600" }}>
                        {elem.price}
                      </p>
                    </div>
                  ))}
                  <hr />
                  <div className="text-right">
                    <p>TOTALE</p>
                    <span> {getTotalPrice(data)} € </span>
                  </div>

                  <div className="text-left mt-5">
                    <h3>COSA COMPRENDE IL PREZZO</h3>
                    <div> {goOver(included)} </div>
                    <h3>COSA NON COMPRENDE IL PREZZO</h3>
                    <div> {goOver(notIncluded)} </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Tariffe;
