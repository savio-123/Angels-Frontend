import React, { useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";

import "../styles/Navbar.css";

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const accessToken = localStorage.getItem("access");

    const isStaff =
        localStorage.getItem("is_staff") === "true";
    
    const isDashboardPage =
        location.pathname === "/dashboard";    

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("is_staff");

        navigate("/");
    };

    return (

        <>

            {/* NAVBAR */}

            <nav className="custom-navbar">

                <div className="container custom-nav-container">

                    {/* LEFT */}

                    <Link
                        className="brand-logo"
                        to="/"
                    >

                        <img
                            src="/footer-logo.png"
                            alt="Logo"
                            className="brand-image"
                        />

                    </Link>

                    {/* CENTER */}

                    <div className="nav-center-links">

                        <Link
                            to="/"
                            className="nav-center-link"
                        >
                            Home
                        </Link>

                        <Link
                            to="/services"
                            className="nav-center-link"
                        >
                            Services
                        </Link>

                        <Link
                            to="/about"
                            className="nav-center-link"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            className="nav-center-link"
                        >
                            Contact
                        </Link>
                        {
                            accessToken ? (

                                <>
                                    {
                                        isStaff && (

                                            <>
                                                <Link
                                                    className="dashboard-link"
                                                    to="/dashboard"
                                                >
                                                    Dashboard
                                                </Link>

                                            </>
                                        )
                                    }
                                </>

                            ) : 
                            <>
                            <Link
                                className="dashboard-link"
                                to="/own-login"
                            >
                                   Login
                                For Admin Only
                            </Link>

                        </>
                        }

                    </div>

                    {/* RIGHT */}

                    <div className="navbar-buttons">
                        {
                            accessToken ? (

                                <button     
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : null
                        }
                    </div>

                    {/* MOBILE BUTTON */}

                    <button
                        className={`mobile-menu-btn ${
                            menuOpen ? "active" : ""
                        }`}
                        onClick={() =>
                            setMenuOpen(!menuOpen)
                        }
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>

            </nav>

            {/* MOBILE MENU */}

            <div
                className={`mobile-menu ${
                    menuOpen ? "show-menu" : ""
                }`}
            >

                <button
                    className="close-menu-btn"
                    onClick={() => setMenuOpen(false)}
                >
                    ✕
                </button>

                <div className="mobile-links">

                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>

                    <Link
                        to="/services"
                        onClick={() => setMenuOpen(false)}
                    >
                        Services
                    </Link>

                    <Link
                        to="/about"
                        onClick={() => setMenuOpen(false)}
                    >
                        About Us
                    </Link>

                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contacts
                    </Link>
                    {
                                            accessToken &&
                                            isStaff &&
                                            !isDashboardPage && (
                    
                                                <Link
                                                    to="/dashboard"
                                                    onClick={() =>
                                                        setMenuOpen(false)
                                                    }
                                                >
                                                    Dashboard
                                                </Link>
                    
                                            )
                                        }

                </div>

                <div className="mobile-bottom">

                    <p>
                        Thamarassery, Kozhikode, Kerala 673586
                        <br />
                        MON - SAT  : 9:00 am - 8:00 pm
                        <br />
                        <a
                        href="tel:+919526999111"
                    >
                        +91 9526 999 111
                    </a>
                    </p>

                    <Link
                        className="mobile-book-btn"
                        to="/book-appointment"
                        onClick={() => setMenuOpen(false)}
                    >
                        BOOK A VISIT
                    </Link>

                    {
                        accessToken &&
                        isStaff && (

                            <button
                                className="drawer-logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        )
                    }

                </div>

            </div>

        </>
    );
};

export default Navbar;