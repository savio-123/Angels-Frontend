import React from "react";
import {
    FaAward,
    FaSpa,
    FaShieldAlt,
    FaHeart
} from "react-icons/fa";

import InnerNavbar from "../components/InnerNavbar";
import Footer from "../components/Footer";
import useReveal from "../hooks/useReveal";

import { Link } from "react-router-dom";
import "../styles/About.css";


const About = () => {

    const philosophy = [

        {
            icon: <FaAward />,
            title: "Expert Craftsmanship",
            description:
                "Highly trained professionals dedicated to the art of beauty."
        },

        {
            icon: <FaSpa />,
            title: "Premium Products",
            description:
                "Exclusive use of luxury, cruelty-free, and organic brands."
        },

        {
            icon: <FaShieldAlt />,
            title: "Hygiene First",
            description:
                "Uncompromising sterilization and cleanliness protocols."
        },

        {
            icon: <FaHeart />,
            title: "Your Comfort",
            description:
                "A serene, unhurried atmosphere tailored to your relaxation."
        }
    ];


    const artists = [

        {
            image: "/artists/team-ananya.png",
            name: "Priya Sharma",
            role: "LEAD STYLIST",
            quote:
                "Beauty begins with confidence."
        },

        {
            image: "/artists/team-deepa.png",
            name: "Ananya Kapoor",
            role: "BRIDAL SPECIALIST",
            quote:
                "Every bride deserves to feel like royalty."
        },

        {
            image: "/artists/team-priya.png",
            name: "Deepa Nair",
            role: "SKIN CARE EXPERT",
            quote:
                "Healthy skin is timeless beauty."
        }
    ];

    const [journeyRef, journeyVisible] =
    useReveal();

    const [philosophyRef, philosophyVisible] =
        useReveal();

    const [statsRef, statsVisible] =
        useReveal();

    const [artistsRef, artistsVisible] =
        useReveal();

    const [atmosphereRef, atmosphereVisible] =
        useReveal();

    const [ctaRef, ctaVisible] =
        useReveal();


    return (

        <>

            <InnerNavbar transparent />


            {/* HERO */}

            <section className="about-hero">

                <div className="about-overlay"></div>

                <div className="container">

                    <div className="about-hero-content">

                        <p className="about-mini-title">

                            OUR STORY

                        </p>

                        <h1>

                            Where Beauty Meets
                            <br />

                            <span>

                                Artistry

                            </span>

                        </h1>

                        <p className="about-description">

                            Angel's Beauty Parlour
                            was founded on a simple
                            belief: every woman
                            deserves a sanctuary
                            where she can rediscover
                            her radiance.

                        </p>

                    </div>

                </div>

            </section>


            {/* JOURNEY */}

            <section
                ref={journeyRef}
                className={`
                    journey-section
                    ${
                        journeyVisible
                            ? "journey-visible"
                            : ""
                    }
                `}
            >

                <div className="container">

                    <div className="journey-grid">

                        <div className="journey-image">

                            <img
                                src="/about-story.png"
                                alt=""
                            />

                        </div>


                        <div className="journey-content">

                            <h2>

                                A Journey of
                                <span>

                                    {" "}Passion

                                </span>

                            </h2>

                            <p>

                                What began as a small,
                                intimate parlour has
                                blossomed into a trusted
                                luxury destination.

                            </p>

                            <p>

                                We've created an
                                unhurried environment
                                where premium products
                                meet expert techniques.

                            </p>


                            <div className="journey-trust">

                                <div
                                    className="
                                        trust-icons
                                    "
                                >

                                    ★ ★ ★

                                </div>

                                <span>

                                    TRUSTED BY 1000+ WOMEN

                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* PHILOSOPHY */}

            <section

                ref={philosophyRef}

                className="philosophy-section"
            >

                <div className="container">

                    <div className="section-heading">

                        <h2>

                            Our
                            <span>

                                {" "}Philosophy

                            </span>

                        </h2>

                        <p>

                            The pillars that define
                            the Angel's experience.

                        </p>

                    </div>


                    <div className="philosophy-grid">

                        {
                            philosophy.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <div

                                        className={`
                                            philosophy-card

                                            ${
                                                philosophyVisible
                                                    ? "visible"
                                                    : ""
                                            }
                                        `}

                                        style={{
                                            transitionDelay:
                                                `${index * 0.15}s`
                                        }}

                                        key={index}
                                    >

                                        <div
                                            className="
                                                philosophy-icon
                                            "
                                        >

                                            {item.icon}

                                        </div>

                                        <h3>

                                            {item.title}

                                        </h3>

                                        <p>

                                            {
                                                item.description
                                            }

                                        </p>

                                    </div>
                                )
                            )
                        }

                    </div>

                </div>

            </section>


            {/* STATS */}

            <section

                    ref={statsRef}

                    className={`
                        stats-section

                        ${
                            statsVisible
                                ? "stats-visible"
                                : ""
                        }
                    `}
                >

                <div className="container">

                    <div className="stats-grid">

                        <div className="stat-item">

                            <h2>

                                8+

                            </h2>

                            <p>

                                YEARS OF EXCELLENCE

                            </p>

                        </div>

                        <div className="stat-item">

                            <h2>

                                500+

                            </h2>

                            <p>

                                HAPPY BRIDES

                            </p>

                        </div>

                        <div className="stat-item">

                            <h2>

                                100%

                            </h2>

                            <p>

                                ORGANIC FOCUS

                            </p>

                        </div>

                        <div className="stat-item">

                            <h2>

                                4.9

                            </h2>

                            <p>

                                AVERAGE RATING

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ARTISTS */}

            <section

                ref={artistsRef}

                className="artists-section"
            >

                <div className="container">

                    <div className="section-heading">

                        <h2>

                            Meet the
                            <span>

                                {" "}Artists

                            </span>

                        </h2>

                        <p>

                            The passionate experts
                            behind your flawless looks.

                        </p>

                    </div>


                    <div className="artists-grid">

                        {
                            artists.map(
                                (
                                    artist,
                                    index
                                ) => (

                                    <div

                                        className={`
                                            artist-card

                                            ${
                                                artistsVisible
                                                    ? "artist-visible"
                                                    : ""
                                            }
                                        `}

                                        style={{
                                            transitionDelay:
                                                `${index * 0.15}s`
                                        }}

                                        key={index}
                                    >

                                        <div
                                            className="
                                                artist-image-wrapper
                                            "
                                        >

                                            <img
                                                src={artist.image}
                                                alt=""
                                            />

                                            <div
                                                className="
                                                    artist-overlay
                                                "
                                            >

                                                <p>

                                                    "
                                                    {artist.quote}
                                                    "

                                                </p>

                                            </div>

                                        </div>

                                        <h3>

                                            {artist.name}

                                        </h3>

                                        <span>

                                            {artist.role}

                                        </span>

                                    </div>
                                )
                            )
                        }

                    </div>

                </div>

            </section>


            {/* ATMOSPHERE */}

            <section

                ref={atmosphereRef}

                className={`
                    atmosphere-section

                    ${
                        atmosphereVisible
                            ? "atmosphere-visible"
                            : ""
                    }
                `}
            >

                <div className="container">

                    <div className="atmosphere-header">

                        <h2>

                            The
                            <span>

                                {" "}Atmosphere

                            </span>

                        </h2>

                    </div>


                    <div className="atmosphere-grid">

                        <div
                            className="
                                atmosphere-large
                            "
                        >

                            <img
                                src="/gallery/photo2.png"
                                alt=""
                            />

                        </div>

                        <div
                            className="
                                atmosphere-small-grid
                            "
                        >

                            <img
                                src="/gallery/photo5.png"
                                alt=""
                            />

                            <img
                                src="/gallery/photo6.png"
                                alt=""
                            />

                            <img
                                src="/gallery/photo1.png"
                                alt=""
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section

                    ref={ctaRef}

                    className={`
                        about-cta

                        ${
                            ctaVisible
                                ? "cta-visible"
                                : ""
                        }
                    `}
                >
                <div className="container">

                    <h2>

                        Ready to
                        Experience Luxury?

                    </h2>

                    <Link
                        to="/book-appointment"

                        className="
                            about-cta-btn
                        "
                    >

                        BOOK YOUR APPOINTMENT

                    </Link>

                </div>

            </section>


            <Footer />

        </>
    );
};

export default About;