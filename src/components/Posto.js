
import React, { useState, useEffect, useContext, Fragment } from "react";

import { Accordion, Card, Modal, Button } from 'react-bootstrap';

import { AppContext } from "../context/AppContext";


function Posto(props) {
    const { eventKey, posto } = props
    const { nomePosto, datePosto, infoPosto } = posto
    const [arrow, setArrow] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [infoModal, setInfoModal] = useState({ type: "", data: "" })
    const [carouselPhoto, setCarouselPhoto] = useState()

    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    const groupData = (date) => {

        const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
        ]

        const first = new Date(date[0].day)

        if (date.length > 1) {

            const last = new Date(date[date.length - 1].day)

            if (first.getMonth() === last.getMonth())
                return first.getDate() + " - " + last.getDate() + " " + monthNames[first.getMonth()] + " " + first.getFullYear()

            else
                return first.getDate() + " " + monthNames[first.getMonth()] + " " + first.getFullYear() + " - " +
                    last.getDate() + " " + monthNames[last.getMonth()] + " " + last.getFullYear()

        }
        else {
            return first.getDate() + " " + monthNames[first.getMonth()] + " " + first.getFullYear()
        }
    }

    const showStars = (starsString) => {
        const numStars = parseInt(starsString)
        let arrStars = []
        for (let i = 0; i < numStars; i++) arrStars.push(1)
        return (
            <>
                {arrStars.map((st, index) => (
                    <i key={index} className="fas fa-star text-shadow"></i>
                ))
                }
            </>
        )
    }


    const closeModal = () => {
        setShowModal(false)
    }
    const createModal = (type, data) => {
        setInfoModal({
            type,
            data
        })
        setShowModal(true)
    }
    //renderizza la Modal a seconda dei parametri ricevuti dall'invocazione
    function ModalCustom() {
        const { type, data } = infoModal
        let modalClass = type

        return (
            <Modal show={showModal} onHide={closeModal}
                dialogClassName={modalClass} animation={type === "modal-img" ? false : true}>

                {type === "modal-transport" &&
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title><h3>{data.name}</h3></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="transportsIcon w-100"><i className=" fa fa-car"></i>
                            </div>
                            <div className="transportsInfo d-flex">
                                <div className="transportsInfoContainer p-0 m-0">
                                    <h3>{data.name}</h3>
                                    <div className="d-flex v-middle">
                                        <h5>Luogo di ritiro: </h5><span className="small-text">{data.pickup.name}</span>
                                        <h5>Data di ritiro: </h5><span className="small-text">{convertDate(data.withdrawalDate)}</span>
                                    </div>
                                    <div className="d-flex v-middle">
                                        <h5>Luogo di rilascio: </h5><span className="small-text">{data.return.name}</span>
                                        <h5>Data di rilascio: </h5><span className="small-text">{convertDate(data.releaseDate)}</span>
                                    </div>
                                    <h5>Il noleggio auto comprende</h5>
                                    <div className="small-text p-0 m-0">
                                        <div>
                                            {data.note}
                                        </div>
                                    </div>
                                    <div className="d-flex v-middle">
                                        <h5>Sito web: </h5>
                                        <span className="small-text"><a href="www.rentcar.it">www.rentcar.it</a></span>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </>
                }
                {type === "modal-accomodation" &&
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title><h3>{data.name}</h3></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="accomodation">
                                <div className="small-text mt-1">
                                    <h5>{data.typology}
                                        <span className="starsContainer">{data.stars && showStars(data.stars)}</span>
                                    </h5>
                                </div>


                                <div className="accomodationFotoGallery" >
                                    {data.images.map(((accImg, index) => (
                                        <Fragment key={accImg.id}>
                                            {accImg.image &&
                                                <div className="accomodationFoto mb-3"
                                                    style={{ backgroundImage: `url(${accImg.image})` }}></div>
                                            }
                                        </Fragment>
                                    )))}
                                </div>
                                <h5>Descrizione</h5>
                                <div className="small-text">{data.description}</div>
                                <h5>Ristorante</h5>
                                <div className="small-text">{data.descriptionRestaurant}</div>
                                <h5>Camere</h5>
                                <div className="small-text">{data.descriptionRooms}</div>
                                <h5>Servizi</h5>
                                <div className="small-text">{data.descriptionServices}</div>
                                {data.contact &&
                                    <>
                                        <h5>Contatti</h5>
                                        <div className="small-text">
                                            <div><a href={data.contact.website}>{data.contact.website}</a> - {data.contact.email}</div>
                                            <div>{data.contact.phone} - {data.contact.address}</div>
                                        </div>
                                    </>
                                }

                            </div>
                        </Modal.Body>
                    </>
                }
                {type === "modal-img" &&
                    <>
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <div className="modalImg" style={{ backgroundImage: `url(${carouselPhoto})` }}></div>
                        </Modal.Body>
                        {data.length > 1 &&
                            <Modal.Footer >

                                <div className="carouselGallery d-flex">
                                    {data.map(((photo, index) => (
                                        <>
                                            {photo.image &&
                                                <div key={photo.id} className="accomodationFoto container-image" style={{ backgroundImage: `url(${photo.image})` }}
                                                    onClick={() => { setCarouselPhoto(photo.image) }}>
                                                </div>
                                            }
                                        </>
                                    )))}
                                </div>

                            </Modal.Footer>
                        }
                    </>
                }

            </Modal>

        )
    }

    return (
        <>
            <ModalCustom />
            <Card>

                <Accordion.Toggle as={Button} variant="outline-light" eventKey={eventKey} onClick={() => { setArrow(!arrow) }}>
                <div className="accordionCardHeader">
                        <div className="d-flex">
                            <div className="ml-3 nomePosto"><h1>{posto.nomePosto}</h1>
                            <h2 className="ml-2">
                                {groupData(datePosto)}
                            </h2>
                            </div>
                        </div>
                        <div className="arrowIcon">
                            {arrow ?
                                <i className="fa fa-angle-up text-gray"></i> :
                                <i className="fa fa-angle-down text-gray"></i>
                            }
                        </div>
                  </div>
                </Accordion.Toggle>


                <Accordion.Collapse eventKey={eventKey}>

                    <Card.Body>

                        {infoPosto.map((info, index) => (
                            <div key={index} className="row d-flex">

                                <div className="timelistContainer col-1">

                                    <div className="circle-small m-1" style={{ backgroundColor: "#44DDFF" }}>
                                        <i className="fa fa-map-marker-alt"></i>
                                    </div>

                                    {info.transports[0] &&
                                        <div className="circle-small m-1" style={{ backgroundColor: "#FFB300" }}>
                                            <i className="fa fa-car"></i>
                                        </div>
                                    }

                                    <div className="dottedLine m-1"></div>

                                </div>

                                <div className="infoDay col-11">
                                    <div className="titoloGiorno">

                                        <div className="circle-day mr-2">
                                            <div className="text-center">Day</div>
                                            <div className="ggCircleDay">{datePosto[index].id + 1}</div>
                                        </div>

                                        <div>
                                            <h3 className="text-uppercase">{nomePosto}</h3>
                                            <h1 className="display-inline">{info.days[0].name}</h1>
                                            <h2 className="ml-3 text-gray display-inline">
                                                {convertDate(info.dayDate)}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="headerFotoContainer">
                                        {info.days[0].images.map(((bgImg, index) => (
                                            <Fragment key={bgImg.id}>
                                                <div className="headerFoto container-image" style={{ backgroundImage: `url(${bgImg.image})` }}
                                                    onClick={() => {
                                                        createModal("modal-img", info.days[0].images)
                                                        setCarouselPhoto(bgImg.image)
                                                    }}></div>
                                            </Fragment>
                                        )))}
                                    </div>

                                    {/* da intendere come array da mappare? è un solo valore nel json */}
                                    <div className="description small-text">
                                        {info.days[0].description}
                                    </div>

                                    {/* da intendere come array da mappare? è un solo valore nel json */}
                                    <div className="transportsContainer hover-section row" onClick={() => { createModal("modal-transport", info.transports[0]) }}>
                                        {info.transports[0] &&
                                            <>
                                                <div className="transportsInfo d-flex">
                                                    <div className="transportsIcon"><i className=" fa fa-car"></i></div>
                                                    <div className="transportsInfoContainer">
                                                        <h3>{info.transports[0].name}</h3>
                                                        <div className="d-flex v-middle">
                                                            <h4 className="text-uppercase d-flex">Luogo di ritiro: </h4>
                                                            <span className="tag">{info.transports[0].pickup.name}</span>
                                                        </div>
                                                        <div className="d-flex v-middle">
                                                            <h4 className="text-uppercase d-flex">Luogo di partenza: </h4>
                                                            <span className="tag">{info.transports[0].return.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>

                                    <div className="accomodationList">
                                        {info.accomodations.map(((acc, index) => (
                                            <Fragment key={acc.id}>
                                                {info.accomodations.length > 1 && <div className="titoloAlternativa">Alternativa {index + 1}</div>}
                                                <div className=" row accomodation" >

                                                    <div className="accomodationFotoGallery col-12 col-xl-6 " >

                                                        {acc.images.map(((accImg, index) => (
                                                            <Fragment key={accImg.id}>
                                                                {accImg.image &&
                                                                    <div className="accomodationFoto container-image ml-4"
                                                                        style={{ backgroundImage: `url(${accImg.image})` }}
                                                                        onClick={() => {
                                                                            createModal("modal-img", acc.images)
                                                                            setCarouselPhoto(accImg.image)
                                                                        }}></div>
                                                                }
                                                            </Fragment>

                                                        )))}
                                                    </div>

                                                    <div className="accomodationInfo col-12 col-xl-6 hover-section" onClick={() => { createModal("modal-accomodation", acc) }}>
                                                        <h3 className="display-inline">{acc.name}</h3>
                                                        <div className="small-text description">
                                                            {acc.description}
                                                        </div>
                                                        <div className="tagContainer">
                                                            {acc.tags.map(((accTag, index) => (
                                                                <Fragment key={accTag.id}>
                                                                    {accTag &&
                                                                        <div className="tag">{accTag.name}</div>
                                                                    }
                                                                </Fragment>

                                                            )))}
                                                        </div>
                                                    </div>

                                                </div>

                                            </Fragment>
                                        )))}


                                    </div>

                                    <div className="includeOrNot row">
                                        <div className="col-12 includeContainer">
                                            <div className="includeElement">
                                                {info.included &&
                                                    <>
                                                        <div className="circle" style={{ backgroundColor: "rgb(176, 238, 211)" }}>
                                                            <i className="fa fa-check"></i>
                                                        </div>
                                                        <div className="infoText">{info.included}</div>
                                                    </>
                                                }
                                            </div>
                                            <div className="includeElement">
                                                {info.notIncluded &&
                                                    <>
                                                        <div className="circle" style={{ backgroundColor: "rgb(253, 209, 218)" }}>
                                                            <i className="fa fa-times"></i>
                                                        </div>
                                                        <div className="infoText">{info.notIncluded}</div>
                                                    </>
                                                }
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>


                        ))}
                    </Card.Body>

                </Accordion.Collapse >
            </Card>
        </>
    )
}

export default Posto
