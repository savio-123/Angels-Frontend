import InnerNavbar from "../components/InnerNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Helmet } from "react-helmet-async";

import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaChevronDown
} from "react-icons/fa";

import { useState, useRef, useEffect } from "react";

import "../styles/Contact.css";

const faqData = [

    {
        question:
            "How do I book an appointment?",

        answer:
            "You can book online through our booking page or contact us directly."
    },

    {
        question:
            "What products do you use?",

        answer:
            "We use premium salon-grade products from trusted brands."
    },

    {
        question:
            "Do you offer home services?",

        answer:
            "Selected services are available at home upon request."
    },

    {
        question:
            "What is your cancellation policy?",

        answer:
            "Please notify us at least 24 hours before your appointment."
    }
]

function Contact() {

    const [openIndex, setOpenIndex] =
        useState(null)

    const [services, setServices] = useState([]);    

    const [faqVisible, setFaqVisible] =
        useState(false)    
        
    const [formData, setFormData] = useState({
                                            name: "",
                                            email: "",
                                            phone: "",
                                            service: "",
                                            preferredDate: "",
                                            message: ""
                                        });

    const faqRef = useRef()

    useEffect(() => {

        fetchServices();
    
    }, []);
    
    
    const fetchServices = async () => {
    
        try {
    
            const res = await api.get(
                "parlour/services/"
            );
    
            setServices(
                res.data
            );
    
        } catch (error) {
    
            console.log(error);
        }
    };

    useEffect(() => {

        const observer =
            new IntersectionObserver(

                ([entry]) => {

                    if (
                        entry.isIntersecting
                    ) {

                        setFaqVisible(true)
                    }
                },

                {
                    threshold: 0.2
                }
            )

        if (faqRef.current) {

            observer.observe(
                faqRef.current
            )
        }

        return () =>
            observer.disconnect()

    }, [])

    const handleChange = (e) => {

        setFormData({
    
            ...formData,
    
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();
    
        const {
    
            name,
    
            email,
    
            phone,
    
            service,
    
            preferredDate,
    
            message
    
        } = formData;
    
    
        if (
    
            !name ||
    
            !email ||
    
            !phone ||
    
            !message
    
        ) {
    
            alert(
                "Please fill all required fields."
            );
    
            return;
        }
    
    
        if (
    
            !/^\d{10}$/.test(phone)
    
        ) {
    
            alert(
                "Enter a valid 10 digit phone number."
            );
    
            return;
        }
    
    
        const whatsappMessage =
    
    `NEW ENQUIRY
    
    Name: ${name}
    
    Phone: ${phone}
    
    Email: ${email}
    
    Service: ${service}
    
    Preferred Date: ${preferredDate}
    
    Message:
    ${message}`;
    
        const whatsappURL =
    
            `https://wa.me/918075336873?text=${encodeURIComponent(
                whatsappMessage
            )}`;
    
        window.open(
            whatsappURL,
            "_blank"
        );
    };

    return (

        <>
          <Helmet>

            <title>

            Contact Us | Angel's Beauty Parlour

            </title>

            <meta

            name="description"

            content="
            Get in touch with Angel's Beauty Parlour.
            Call us, visit our salon or book an
            appointment online.
            "

            />

            </Helmet>
            <InnerNavbar transparent/>

            {/* HERO */}

            <section
                className="contact-hero"
            >

                <div
                    className="contact-overlay"
                />

                <div
                    className="
                        container
                        contact-hero-content
                    "
                >

                    <p
                        className="
                            contact-small-title
                        "
                    >

                        GET IN TOUCH

                    </p>

                    <h1
                        className="contact-title"
                    >

                        We'd Love to

                        <span>

                            Hear From You

                        </span>

                    </h1>

                    <p
                        className="
                            contact-subtitle
                        "
                    >

                        Book a treatment,
                        ask a question,
                        or simply say hello.

                    </p>

                </div>

            </section>

            {/* FORM */}

            <section
                className="
                    contact-form-section
                "
            >

                <div
                    className="container"
                >

                <div className="contact-form-card">

                <h2>

                    Send an Enquiry

                </h2>

                <form

                    className="contact-form"

                    onSubmit={handleSubmit}
                >

                    <div className="contact-form-grid">

                    <input

                        type="text"

                        name="name"

                        placeholder="Jane Doe"

                        value={formData.name}

                        onChange={handleChange}
                        />

                        <input

                        type="email"

                        name="email"

                        placeholder="jane@example.com"

                        value={formData.email}

                        onChange={handleChange}
                        />

                        <input

                        type="text"

                        name="phone"

                        placeholder="+91 9876543210"

                        value={formData.phone}

                        onChange={handleChange}
                        />

                        <input

                        type="date"

                        name="preferredDate"

                        value={formData.preferredDate}

                        onChange={handleChange}
                        />
                    </div>

                    <select

                        name="service"

                        value={formData.service}

                        onChange={handleChange}
                        >

                        <option value="">

                            Select a service

                        </option>

                        {

                            services.map(

                                (service) => (

                                    <option

                                        key={service.id}

                                        value={service.name}
                                    >

                                        {service.name}

                                    </option>
                                )
                            )
                        }

                        </select>

                    <textarea

                        rows="6"

                        name="message"

                        placeholder="How can we help you?"

                        value={formData.message}

                        onChange={handleChange}
                    />

                    <button type="submit">

                    SEND ENQUIRY

                    </button>

                </form>

                </div>

                </div>

            </section>

            {/* INFO */}

            <section
                className="
                    contact-info-section
                "
            >
              <div className="container">
                <div className="contact-info-card">

                    <h2>

                        Angel's Beauty

                    </h2>

                    <div className="contact-info-item">

                        <FaMapMarkerAlt />

                        <div>

                            <h5>Visit Us</h5>

                            <p>
                                Thamarassery,
                                Kozhikode,
                                Kerala
                            </p>

                        </div>

                    </div>

                    <div className="contact-info-item">

                        <FaPhoneAlt />

                        <div>

                            <h5>Call Us</h5>

                            <p>
                                +91 9946935725
                            </p>

                        </div>

                    </div>

                    <div className="contact-info-item">

                        <FaEnvelope />

                        <div>

                            <h5>Email Us</h5>

                            <p>
                                Angels333@gmail.com
                            </p>

                        </div>

                    </div>

                    <hr />

                    <h3 className="hours-title">

                        Opening Hours

                    </h3>

                    <div className="hours-row">

                        <span>Mon–Fri</span>

                        <span>9:00 AM – 8:00 PM</span>

                    </div>

                    <div className="hours-row">

                        <span>Saturday</span>

                        <span>9:00 AM – 8:00 PM</span>

                    </div>

                    <div className="hours-row">

                        <span>Sunday</span>

                        <span>9:00 AM – 8:00 PM</span>

                    </div>

                    </div>

            </div>

            </section>

            {/* LOCATION */}

            <section className="location-section">

                <div className="container">

                    <div className="location-wrapper">

                        <div className="location-card">

                            <div className="location-icon">

                                <FaMapMarkerAlt />

                            </div>

                            <h2>

                                Our Location

                            </h2>

                            <p>

                                Thamarassery,
                                Kozhikode,
                                Kerala

                            </p>

                            <a
                                href="https://maps.app.goo.gl/BQ8NjvPiW5vhtHYz6"
                                target="_blank"
                                rel="noreferrer"
                            >

                                GET DIRECTIONS

                            </a>

                        </div>

                    </div>

                </div>

                </section>

            {/* FAQ */}

            <section

                ref={faqRef}

                className="
                    faq-section
                "
            >

                <div
                    className="container"
                >

                    <h2
                        className="faq-title"
                    >

                        Frequently Asked

                        <span>

                            Questions

                        </span>

                    </h2>

                    {

                        faqData.map(

                            (
                                faq,
                                index
                            ) => (

                                <div

                                    key={index}

                                    className={`
                                        faq-card
                                        ${
                                            faqVisible
                                            ?
                                            "faq-visible"
                                            :
                                            ""
                                        }
                                    `}

                                    style={{

                                        transitionDelay:

                                            `${index * 0.15}s`
                                    }}
                                >

                                    <button

                                        className="
                                            faq-question
                                        "

                                        onClick={() =>

                                            setOpenIndex(

                                                openIndex === index

                                                ?

                                                null

                                                :

                                                index
                                            )
                                        }
                                    >

                                        {

                                            faq.question
                                        }

                                        <FaChevronDown />

                                    </button>

                                    {

                                        openIndex === index && (

                                            <div
                                                className="
                                                    faq-answer
                                                "
                                            >

                                                {

                                                    faq.answer
                                                }

                                            </div>
                                        )
                                    }

                                </div>
                            )
                        )
                    }

                </div>

            </section>
            <section className="about-cta">

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
    )
}

export default Contact;