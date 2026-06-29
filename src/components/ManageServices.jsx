import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import api from "../services/api";


function ManageServices({ onAddService }) {

    const [services, setServices] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [updating, setUpdating] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [selectedService, setSelectedService] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        image: null
    })


    useEffect(() => {

        fetchServices()

    }, [])

    
    const fetchServices = async () => {
        
        try {

            const res = await api.get(
                "parlour/services/"
            )

            setServices(res.data)

        } catch (error) {

            console.error(error)
        }
    }

    const updateService = async (e) => {

        e.preventDefault()

        if (!selectedService) {

            toast.error(
                "No service selected"
            );
        
            return;
        }
    
        try {
            setUpdating(true);
    
            const data = new FormData()
    
            data.append("name", formData.name)
    
            data.append(
                "description",
                formData.description
            )
    
            data.append(
                "price",
                formData.price
            )
    
            data.append(
                "duration",
                formData.duration
            )
    
            if (formData.image) {
    
                data.append(
                    "image",
                    formData.image
                )
            }
    
            await api.put(
                `parlour/services/${selectedService.id}/`,
                data
            )
    
            toast.success(
                "Service Updated"
            )
            setShowModal(false)
            
    
            fetchServices()
    
        } catch (error) {
    
            console.error(error)
    
            toast.error(
                "Update Failed"
            )
        }
        finally {

            setUpdating(false);
        
        }
    }

    const handleEditClick = (service) => {

        setSelectedService(service)
    
        setFormData({
    
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration,
            image: null
        })
    
        setShowModal(true)
    }

    const handleChange = (e) => {

        if (e.target.name === "image") {
    
            setFormData({
    
                ...formData,
                image: e.target.files[0]
            })
    
        } else {
    
            setFormData({
    
                ...formData,
                [e.target.name]: e.target.value
            })
        }
    }


    const deleteService = async (id) => {

        const result = await Swal.fire({
    
            title: "Delete Service?",
    
            text:
                "This action cannot be undone.",
    
            icon: "warning",
    
            showCancelButton: true,
    
            confirmButtonText: "Delete",
    
            cancelButtonText: "Keep",
    
            confirmButtonColor: "#dc3545",
    
            reverseButtons: true
        });
    
        if (!result.isConfirmed) {
            return;
        }
    
        try {
            setDeletingId(id);
    
            await api.delete(
                `parlour/services/${id}/`
            );
    
            await Swal.fire({
    
                icon: "success",
    
                title: "Deleted",
    
                text:
                    "Service removed successfully.",
    
                timer: 1500,
    
                showConfirmButton: false
            });
    
            fetchServices();
    
        } catch (error) {
    
            console.error(error);
    
            Swal.fire({
    
                icon: "error",
    
                title: "Oops...",
    
                text:
                    "Failed to delete service."
            });
        }
        finally {

            setDeletingId(null);
        
        }
    };


    return (

        <div className="service-management-section">
    
            <div className="service-management-header">
    
                <div>
    
                    <h2>Service Management</h2>
    
                    <p>
                        Manage all services available for booking
                    </p>
    
                </div>
    
                <div className="booking-pill">
    
                    {services.length} Services
    
                </div>
    
            </div>
    
            <div className="service-management-card">
    
                <div className="service-management-toolbar">
    
                    <div />
    
                    <button
                        className="service-management-btn"
                        onClick={onAddService}
                    >
                        + Add Service
                    </button>
    
                </div>
    
                <div className="table-responsive">
    
                    <table className="service-management-table">
    
                        <thead>
    
                            <tr>
    
                                <th>Name</th>
    
                                <th>Price</th>
    
                                <th>Duration</th>
    
                                <th>Actions</th>
    
                            </tr>
    
                        </thead>
    
                        <tbody>
    
                            {
                                services.map((service) => (
    
                                    <tr key={service.id}>
    
                                        <td>
                                            {service.name}
                                        </td>
    
                                        <td>
                                            ₹ {service.price}
                                        </td>
    
                                        <td>
                                            {service.duration} mins
                                        </td>
    
                                        <td>
    
                                            <div className="service-action-buttons">
    
                                                <button
                                                    className="service-edit-btn"
                                                    onClick={() =>
                                                        handleEditClick(service)
                                                    }
                                                >
                                                    Edit
                                                </button>
    
                                                <button
                                                    className="service-delete-btn"
                                                    disabled={deletingId === service.id}
                                                    onClick={() =>
                                                        deleteService(service.id)
                                                    }
                                                >

                                                    {
                                                        deletingId === service.id
                                                            ? "Deleting..."
                                                            : "Delete"
                                                    }

                                                </button>
    
                                            </div>
    
                                        </td>
    
                                    </tr>
    
                                ))
                            }
    
                        </tbody>
    
                    </table>
    
                </div>
    
            </div>
    
            {
                showModal && (
    
                    <div
                        className="modal d-block"
                        tabIndex="-1"
                    >
    
                        <div className="modal-dialog">
    
                            <div className="modal-content">
    
                                <div className="modal-header">
    
                                    <h5 className="modal-title">
                                        Edit Service
                                    </h5>
    
                                    <button
                                        className="btn-close"
                                        onClick={() =>
                                            setShowModal(false)
                                        }
                                    />
    
                                </div>
    
                                <form onSubmit={updateService}>
    
                                    <div className="modal-body">
    
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            className="form-control mb-3"
                                            onChange={handleChange}
                                            required
                                        />
    
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            className="form-control mb-3"
                                            onChange={handleChange}
                                            required
                                        />
    
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            className="form-control mb-3"
                                            onChange={handleChange}
                                            required
                                        />
    
                                        <input
                                            type="number"
                                            name="duration"
                                            value={formData.duration}
                                            className="form-control mb-3"
                                            onChange={handleChange}
                                            required
                                        />
    
                                        <input
                                            type="file"
                                            name="image"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
    
                                    </div>
    
                                    <div className="modal-footer">
    
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                setShowModal(false)
                                            }
                                        >
                                            Close
                                        </button>
    
                                        <button
                                            className="btn btn-dark"
                                            disabled={updating}
                                        >

                                            {
                                                updating
                                                    ? "Updating..."
                                                    : "Update"
                                            }

                                        </button>
    
                                    </div>
    
                                </form>
    
                            </div>
    
                        </div>
    
                    </div>
                )
            }
    
        </div>
    );
}

export default ManageServices