import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    useParams,
    useNavigate,
    Link
} from "react-router-dom";
import api from "../services/api";
import {CalendarDays, Clock3} from "lucide-react";
import { Helmet } from "react-helmet-async";

import InnerNavbar from "../components/InnerNavbar";
import Footer from "../components/Footer";
import MovingGallery from "../components/MovingGallery";

import "../styles/Bookingcss.css";

function BookAppointment() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        service: id || "",
        appointment_date: "",
        appointment_time: ""
    })


    useEffect(() => {
        fetchServices()
    }, [])

    const serviceID = Number(id)

    const selectedService = services.find(

        (service) => service.id === serviceID
    )


    const fetchServices = async () => {

        try {

            const res = await api.get(

                "parlour/services/"
            )

            setServices(res.data)

        } catch (error) {

            console.log(error)
        }
    }


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (
            formData.customer_name.trim().length < 3
        ) {
        
            toast.error(
                "Enter a valid name"
            )
        
            return
        }

        if (
            !/^\d{10}$/.test(
                formData.customer_phone
            )
        ) {
        
            toast.error(
                "Phone number must be 10 digits"
            )
        
            return
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.customer_email
            )
        ) {
        
            toast.error(
                "Enter valid email"
            )
        
            return
        }

        if (!formData.service) {

            toast.error(
                "Please select a service"
            )
        
            return
        }

        if (
            !formData.appointment_date ||
            !formData.appointment_time
        ) {
        
            toast.error(
                "Please select date and time"
            )
        
            return
        }

        const formattedTime = new Date(
            `1970-01-01T${formData.appointment_time}`
        ).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });

        setLoading(true)

        try {
            await api.post(
                "/parlour/book-appointment/",
                formData
            );
            
            toast.success(
                "Redirected to WhatsApp for confirmation"
            );
            
            const serviceName =
                selectedService?.name ||
                services.find(
                    service =>
                        service.id === Number(formData.service)
                )?.name;
            
            const message = `
            Appointment Request:
            
            Name:${formData.customer_name}
            Phone:${formData.customer_phone}
            Email:${formData.customer_email}
            Service:${serviceName}
            Date:${formData.appointment_date}
            Time:${formattedTime}
            `;
            
            window.open(
            
                `https://wa.me/918075336873?text=${encodeURIComponent(message)}`,
            
                "_blank"
            );
            
            navigate("/");

        } catch (error) {

            console.log(error)

            const errors = error?.response?.data

            if (errors) {

                const firstError =

                    Object.values(errors)[0]?.[0]

                toast.error(firstError)

            } else {

                toast.error("Booking Failed")
            }
        }
        finally{
            setLoading(false)
        }
    }


    return (

        <>
        <Helmet>

            <title>
              Book Appointment | Angel's Beauty Parlour
            </title>
            <meta
            name="description"
            content="
            Book your beauty appointment online with
            Angel's Beauty Parlour. Quick, easy and secure
            appointment booking.
            "
            />
            <Link rel="canonical"
            href="https://angels-frontend.vercel.app/book-appointment"
            />
            </Helmet>

            <InnerNavbar />
            <div className="booking-page">

            <div className="booking-container">

                {/* IMAGE */}

                <div className="booking-image-side">

                    <img
                        src="/Booking.avif"
                        alt=""
                    />

                </div>


                {/* FORM */}

                <div className="booking-form-side">

                    <p className="booking-small-title">

                        BOOK YOUR VISIT

                    </p>

                    <h1 className="booking-title">

                        Luxury Beauty
                        <br />
                        Experience

                    </h1>

                    <p className="booking-description">

                        Reserve your appointment and
                        indulge in a premium beauty
                        experience crafted exclusively
                        for you.

                    </p>

                    <form
                        onSubmit={handleSubmit}

                        className="booking-form"
                        >

                        <input
                            type="text"

                            name="customer_name"

                            placeholder="Your Name"

                            className="
                                form-control
                                booking-input
                            "

                            onChange={handleChange}
                        />


                        <input
                            type="text"

                            name="customer_phone"

                            placeholder="Phone Number"

                            className="
                                form-control
                                booking-input
                            "

                            onChange={handleChange}
                        />


                        <input
                            type="email"

                            name="customer_email"

                            placeholder="Email Address"

                            className="
                                form-control
                                booking-input
                            "

                            onChange={handleChange}
                        />


                        {
                            id ? (

                                <input
                                    type="text"

                                    className="
                                        form-control
                                        booking-input
                                    "

                                    value={
                                        selectedService?.name || ""
                                    }

                                    disabled
                                />

                            ) : (

                                <select
                                    name="service"

                                    className="
                                        form-control
                                        booking-input
                                    "

                                    onChange={handleChange}
                                >

                                    <option value="">

                                        Select Service

                                    </option>

                                    {
                                        services.map((service) => (

                                            <option
                                                key={service.id}

                                                value={service.id}
                                            >

                                                {service.name}

                                            </option>
                                        ))
                                    }

                                </select>
                            )
                        }


                        <div className="booking-field">
                            <CalendarDays size={18} />
                            <input
                                type="date"
                                name="appointment_date"
                                value={formData.appointment_date}
                                onChange={handleChange}
                                className="form-control booking-input"
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>


                        <div className="booking-field">
                            <Clock3 size={18} />
                            <input
                                type="time"
                                name="appointment_time"
                                value={formData.appointment_time}
                                onChange={handleChange}
                                className="form-control booking-input"
                            />
                        </div>


                        <button
                            className="booking-btn"

                            disabled={loading}
                        >

                            {
                                loading ? (

                                    <>
                                        <span
                                            className="
                                                spinner-border
                                                spinner-border-sm
                                                me-2
                                            "
                                        ></span>

                                        Booking...

                                    </>

                                ) : (

                                    "CONFIRM APPOINTMENT"
                                )
                            }

                        </button>

                        </form>

                </div>

            </div>

            </div>
            <MovingGallery />
            <Footer />

        </>
    )
}

export default BookAppointment