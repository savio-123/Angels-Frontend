import React, { useState, useEffect } from "react";
import {
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import { Menu, X } from "lucide-react";

import "../styles/InnerNavbar.css";

function InnerNavbar({ transparent = false }) {

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const accessToken =
        localStorage.getItem("access");

    const isStaff =
        localStorage.getItem("is_staff") === "true";

    const isBookingPage =
        location.pathname === "/book-appointment";

    const isDashboardPage =
        location.pathname === "/dashboard";

    useEffect(() => {

        if (menuOpen) {

            document.body.style.overflow = "hidden";
        }
        else {

            document.body.style.overflow = "auto";
        }

        return () => {

            document.body.style.overflow = "auto";
        };

    }, [menuOpen]);

    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("is_staff");

        navigate("/");
    };

    return (

        <>
            <nav
                className={`inner-navbar ${
                    transparent
                        ? "transparent-navbar"
                        : ""
                }`}
            >

                <div className="container inner-nav-container">

                    <Link
                        to="/"
                        className="inner-brand-logo"
                    >
                        <img
                            src="/footer-logo.png"
                            alt="Logo"
                            className="inner-brand-image"
                        />

                    </Link>

                    <div className="inner-nav-links">

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/services">
                            Services
                        </Link>

                        <Link to="/about">
                            About
                        </Link>

                        <Link to="/contact">
                            Contact
                        </Link>

                    </div>

                    <div className="inner-nav-buttons">

                        {
                            accessToken &&
                            isStaff &&
                            !isDashboardPage && (

                                <Link
                                    to="/dashboard"
                                    className="inner-dashboard-link"
                                >
                                    Dashboard
                                </Link>

                            )
                        }

                        {
                            accessToken &&
                            isStaff && (

                                <button
                                    className="inner-logout-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            )
                        }

                    </div>

                    <button
                        aria-label="Open Menu"
                        className="inner-mobile-btn"
                        onClick={() =>
                            setMenuOpen(true)
                        }
                    >
                        <Menu size={28}/>
                    </button>

                </div>

            </nav>

            <div
                className={`mobile-overlay ${
                    menuOpen
                        ? "show-overlay"
                        : ""
                }`}
                onClick={() =>
                    setMenuOpen(false)
                }
            />

            <div
                className={`mobile-drawer ${
                    menuOpen
                        ? "show-drawer"
                        : ""
                }`}
            >

            <button
                aria-label="Close Menu"
                className="drawer-close"
                onClick={() =>
                    setMenuOpen(false)
                }
            >
                <X size={24}/>
            </button>

                <div className="drawer-links">

                    <Link
                        to="/"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Home
                    </Link>

                    <Link
                        to="/services"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Services
                    </Link>

                    <Link
                        to="/about"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Contact
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

                <div className="drawer-bottom">

                    
                <p>
                            Thamarassery,
                            <br />
                            Kozhikode, Kerala
                            <br />
                            MON - SAT  : 9:00 am - 8:00 pm
                            <br />
                            <span>
                            +91 9526 999 111
                            <br/>
                            info@angelsbeautyparlour.com
                            </span>
                        </p>

                    {
                        !isBookingPage && (

                            <Link
                                to="/book-appointment"
                                className="drawer-book-btn"
                                onClick={() =>
                                    setMenuOpen(false)
                                }
                            >
                                BOOK A VISIT
                            </Link>

                        )
                    }

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
}

export default InnerNavbar;