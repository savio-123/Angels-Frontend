import React, { useEffect, useState } from "react";

import api from "../services/api";

import { Link } from "react-router-dom";

import InnerNavbar from "../components/InnerNavbar";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";

import "../styles/Services.css";


const Services = () => {

    const [artRef, artVisible] =
    useReveal();

    const [cardsRef, cardsVisible] =
        useReveal();

    const [escapeRef, escapeVisible] =
        useReveal();

    const [services, setServices] = useState([]);


    useEffect(() => {

        fetchServices();

    }, []);


    const fetchServices = async () => {

        try {

            const res = await api.get(
                "parlour/services/"
            );

            setServices(res.data);

        } catch (error) {

            console.log(error);
        }
    };


    return (

        <>

            <InnerNavbar />


            {/* HERO */}

            <section className="lux-services-hero">

                <div className="container">

                    <div className="lux-services-grid">

                        {/* LEFT */}

                        <div className="lux-services-left">

                            <p className="lux-mini-title">

                                THE SANCTUARY

                            </p>

                            <h1 className="lux-services-title">

                                Our Services

                            </h1>

                            <p className="lux-services-description">

                                Step into a realm of quiet luxury.
                                Every treatment is an unhurried
                                ceremony dedicated to wellness,
                                confidence, and peace of mind.

                            </p>

                            <div className="lux-hero-buttons">

                                <Link
                                    to="/book-appointment"

                                    className="
                                        lux-primary-btn
                                    "
                                >

                                    BOOK YOUR EXPERIENCE

                                </Link>

                            </div>

                        </div>


                        {/* RIGHT */}

                        <div className="lux-services-right">

                            <div className="lux-hero-image-wrapper">

                                <img
                                    src="/services.jpg"
                                    alt="Salon"
                                />

                            </div>

                            <div className="lux-floating-review">

                                ★★★★★
                                <br />
                                A truly transformative
                                experience.

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ART SECTION */}

            <section

                ref={artRef}

                className={`
                    lux-art-section
                    ${
                        artVisible
                            ? "art-visible"
                            : ""
                    }
                `}
            >

                <div className="container">

                    <div className="lux-art-content">

                        <p className="lux-art-icon">

                            ✧

                        </p>

                        <h2>

                            The Art of Refinement

                        </h2>

                        <p>

                            We believe beauty is not rushed.
                            It is cultivated through premium
                            ingredients, expert hands,
                            and an environment designed to
                            soothe the soul.

                        </p>

                    </div>

                </div>

            </section>


            {/* SERVICES GRID */}

            <section

            ref={cardsRef}

            className="lux-services-section"
            >

            <div className="container">

                <div className="lux-services-header">

                    <div>

                        <p className="lux-mini-title">

                            CURATED OFFERINGS

                        </p>

                        <h2>

                            Signature Treatments

                        </h2>

                    </div>

                </div>

                <div className="lux-services-cards">

                    {
                        services.map((service, index) => (

                            <div
                            className={`
                                lux-service-card
                                ${
                                    cardsVisible
                                        ? "card-visible"
                                        : ""
                                }
                            `}
                            style={{
                                "--delay": `${index * 0.3}s`
                            }}
                            key={service.id}
                        >

                                <div className="lux-card-image">

                                    <img
                                        src={service.image}
                                        alt={service.name}
                                    />

                                </div>

                                <div className="lux-card-content">

                                    <h3>

                                        {service.name}

                                    </h3>
                                    <p>
                                                {service.description.length > 100
                                                    ? service.description.substring(0, 50) + "..."
                                                    : service.description
                                                }
                                            </p>


                                    <div className="lux-card-bottom">

                                        <div>

                                            <span>

                                                STARTING FROM

                                            </span>

                                            <h4>

                                                ₹{service.price}

                                            </h4>

                                        </div>

                                        <div className="lux-duration">

                                            ⏱ {service.duration} mins

                                        </div>

                                    </div>

                                    <Link
                                        to={`/book-appointment/${service.id}`}
                                        className="lux-card-btn"
                                    >

                                        BOOK NOW

                                    </Link>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

            </section>


            {/* ESCAPE SECTION */}

            <section

                    ref={escapeRef}

                    className="lux-escape-section"
                >

                <div className="container">

                    <div className="lux-escape-grid">

                        {/* LEFT */}

                        <div

                            className={`
                                lux-escape-content

                                ${
                                    escapeVisible
                                        ? "escape-left-active"
                                        : ""
                                }
                            `}
                        >

                            <h2>

                                More than
                                an appointment.
                                <br />

                                <span>

                                    An escape.

                                </span>

                            </h2>

                            <p>

                                From the moment you cross
                                our threshold, the outside
                                world fades away.
                                Every detail is designed
                                to restore both beauty
                                and inner calm.

                            </p>

                            <ul>

                                <li>

                                    Complimentary welcome ritual

                                </li>

                                <li>

                                    Private relaxing atmosphere

                                </li>

                                <li>

                                    Premium imported products

                                </li>

                                <li>

                                    Personalized aftercare guidance

                                </li>

                            </ul>

                        </div>


                        {/* RIGHT */}

                        <div

                            className={`
                                lux-escape-images

                                ${
                                    escapeVisible
                                        ? "escape-right-active"
                                        : ""
                                }
                            `}
                        >

                            <img
                                src="/gallery/photo3.png"
                                alt=""
                                className="escape-img-one"
                            />

                            <img
                                src="/gallery/photo5.png"
                                alt=""
                                className="escape-img-two"
                            />

                        </div>

                    </div>

                </div>

            </section>


            <Footer />

        </>
    );
};

export default Services;