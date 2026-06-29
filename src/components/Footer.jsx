import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "../styles/Footer.css";


function Footer() {

    return (

        <footer className="footer-section">

            <div className="container">

                <div className="row gy-5">

                    {/* LOGO */}

                    <div className="col-lg-3">

                        <img
                            src="/footer-logo.png"
                            alt="Logo"
                            className="footer-logo"
                        />

                    </div>


                    {/* USEFUL LINKS */}

                    <div className="col-lg-2">

                        <p className="footer-small-title">

                            USEFUL LINKS

                        </p>

                        <div className="footer-links">

                            <Link to="/">
                                Home
                            </Link>

                            <Link to="/about">
                                About Us
                            </Link>

                            <Link to="/services">
                                Services
                            </Link>

                            <Link to="/contact">
                                Contacts
                            </Link>

                        </div>

                    </div>


                    {/* SERVICES */}

                    <div className="col-lg-3">

                        <p className="footer-small-title">

                            SERVICES

                        </p>

                        <div className="footer-links">

                            <span>
                                Hair Styling
                            </span>

                            <span>
                                Facial
                            </span>

                            <span>
                                Bridal Makeup
                            </span>

                            <span>
                                Hair Coloring
                            </span>

                            <span>
                                Treatments
                            </span>

                        </div>

                    </div>


                    {/* CONTACTS */}

                    <div className="col-lg-3">

                        <p className="footer-small-title">

                            CONTACTS

                        </p>

                        <div className="footer-contact">

                            <p>

                                Thamarassery, Kozhikode,
                                Kerala

                            </p>

                            <p>

                                Mon - Sun :
                                9:00 am - 8:00 pm

                            </p>

                            <a href="tel:+919526999111">

                                <FaPhoneAlt />

                                +91 9526 999 111

                            </a>

                            <a href="mailto:info@gmail.com">

                                <FaEnvelope />

                                info@gmail.com

                            </a>

                        </div>

                    </div>

                </div>


                {/* BOTTOM */}

                <div className="footer-bottom">

                    <p>

                        Copyright © 2026
                        Angel's Beauty Parlour.
                        All rights reserved.

                    </p>

                    <div className="footer-socials">

                        <a
                            href="https://www.instagram.com/angelsbeautyparlourspa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noreferrer"
                        >

                            <FaInstagram />

                        </a>

                        <a
                            href="https://www.facebook.com/p/Angels-Beauty-Parlour-Spa-100064090293276/"
                            target="_blank"
                            rel="noreferrer"
                        >

                            <FaFacebookF />

                        </a>

                    </div>

                </div>

            </div>

        </footer>
    )
}

export default Footer