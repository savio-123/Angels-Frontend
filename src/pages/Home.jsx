import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import WhyChooseUs from "../components/WhyChooseUs";
import ServicesSection from "../components/ServicesSection";
import OurWorks from "../components/OurWorks";
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import MovingGallery from '../components/MovingGallery';

import "../styles/Home.css"
import Navbar from '../components/Navbar';
import SplitText from '../utils/SplitText';
import RevealOnScroll from "../components/RevealOnScroll";


const Home = () => {

    const [services, setServices] = useState([])

    useEffect(() => {

        fetchServices()

    }, [])


    const fetchServices = async () => {

        try {

            const res = await api.get(
                'parlour/services/'
            )

            setServices(res.data)

        } catch (error) {

            console.log(error)
        }
    }


    return (

        <>
        
        <Helmet>

        <title>
            Angel's Beauty Parlour | Premium Beauty Salon in Calicut
        </title>

        <meta
            name="description"
            content="
            Experience premium beauty services including
            bridal makeup, facial, hair spa, threading,
            manicure and pedicure at Angel's Beauty Parlour
            in Calicut. Book your appointment online today.
            "
        />

        <meta
            name="keywords"
            content="beauty parlour,beauty salon,bridal makeup,facial,hair spa,threading,manicure,pedicure,Thamarassery,Kerala"
        />

        <meta
            property="og:title"
            content="Angel's Beauty Parlour | Premium Beauty Salon in Thamarassery, Calicut"
        />

        <meta
            property="og:description"
            content="Book premium beauty and hair care services online."
        />

        <meta
            property="og:type"
            content="website"
        />

        <meta
            property="og:url"
            content="https://angels-frontend.vercel.app/"
        />

        <meta
            property="og:image"
            content="https://angels-frontend.vercel.app/logo.png"
        />

        </Helmet>

            {/* HERO SECTION */}
            <Navbar />
            <div className="hero-section">

                <div className="hero-overlay"></div>

                <div
                    className="
                        container
                        h-100
                        d-flex
                        flex-column
                        justify-content-center
                        align-items-center
                        text-center
                        hero-content
                    "
                >

                <h1 className="hero-title">

                <SplitText
                    text="Feel Beautiful,"
                />

                <SplitText
                    text="Feel You."
                    delay={0.7}
                />

                </h1>

                <p className="hero-subtitle reveal-subtitle">

                PREMIUM BEAUTY & HAIR CARE

                </p>
                    <Link
                        to="/book-appointment"
                        className="
                            btn
                            btn-light
                            btn-lg
                            hero-button
                            reveal-button
                        "
                    >

                        BOOK APPOINTMENT

                    </Link>

                </div>

            </div>


            {/* SERVICES SECTION */}

            <RevealOnScroll animation="zoom">
                <ServicesSection services={services} />
            </RevealOnScroll>

            <RevealOnScroll animation="blur">
                <WhyChooseUs />
            </RevealOnScroll>

            <RevealOnScroll animation="left">
                <OurWorks />
            </RevealOnScroll>

            <RevealOnScroll animation="gallery">
                <Gallery />
            </RevealOnScroll>

            <RevealOnScroll animation="scale">
                <MovingGallery />
            </RevealOnScroll>
            <Footer />

        </>
    )
}

export default Home