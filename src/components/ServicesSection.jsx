import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Swiper from "swiper";
import { Autoplay,Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const ServicesSection = ({ services }) => {

    useEffect(() => {

        const swiper = new Swiper(".services-swiper", {
    
            modules: [Autoplay, Pagination],
    
            loop: true,
    
            centeredSlides: true,
    
            slidesPerView: 3,
    
            speed: 1200,
    
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            },
    
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
    
            breakpoints: {
    
                320: {
                    slidesPerView: 1,
                },
    
                768: {
                    slidesPerView: 2,
                },
    
                1024: {
                    slidesPerView: 3,
                },
            },
    
            on: {
                init: function () {
    
                    this.autoplay.start();
                }
            }
        });
    
        return () => {
            swiper.destroy(true, true);
        };
    
    }, [services]);

    return (

        <div className="services-section">

            <div className="container-fluid">

                <p className="services-small-title">
                    OUR SERVICES
                </p>

                <h2 className="services-main-title">
                    A range of high-quality beauty services
                </h2>

                <div className="swiper services-swiper">

                    <div className="swiper-wrapper">

                        {
                            services.map((service) => (

                                <div
                                    className="swiper-slide"
                                    key={service.id}
                                >

                                    <div className="service-slide">

                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="service-slide-image"
                                        />

                                        <div className="service-overlay">

                                            <h3>{service.name}</h3>
                                            {/* truncated description */}
                                            <p>
                                                {service.description.length > 100
                                                    ? service.description.substring(0, 150) + "..."
                                                    : service.description
                                                }
                                            </p>

                                            <Link
                                                to={`/book-appointment/${service.id}`}
                                                className="service-btn"
                                            >
                                                VIEW DETAILS
                                            </Link>

                                        </div>

                                    </div>

                                </div>
                            ))
                        }

                    </div>
                    <div className="swiper-pagination"></div>

                </div>

            </div>

        </div>
    )
}

export default ServicesSection;