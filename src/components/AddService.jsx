import { useState,useRef } from "react";

import { toast } from "react-toastify";

import api from "../services/api";

function AddService({
    onSuccess,
    onClose
}) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        image: null
    });

    const fileInputRef = useRef(null);
    const handleChange = (e) => {

        if (e.target.name === "image") {

            setFormData({

                ...formData,
                image: e.target.files[0]
            });

        } else {

            setFormData({

                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.image) {

            toast.error(
                "Please select an image"
            );

            return;
        }

        if (
            !formData.image.type.startsWith(
                "image/"
            )
        ) {

            toast.error(
                "Please upload a valid image"
            );

            return;
        }

        try {

            const data = new FormData();

            data.append(
                "name",
                formData.name
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "price",
                formData.price
            );

            data.append(
                "duration",
                formData.duration
            );

            data.append(
                "image",
                formData.image
            );

            await api.post(
                "parlour/services/create/",
                data
            );

            toast.success(
                "Service Added Successfully"
            );
            onSuccess?.();

            setFormData({

                name: "",
                description: "",
                price: "",
                duration: "",
                image: null
            });

            if (fileInputRef.current) { 
                fileInputRef.current.value = ""; 
            }

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed To Add Service"
            );
        }
};

return (

    <div className="container mt-5">

        <div className="add-service-card">

        <h3 className="add-service-title">
            Add New Service
        </h3>

        <form 
        onSubmit={handleSubmit} 
        className="add-service-form"
        >

            <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Service Name"
                className="form-control mb-3"
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                value={formData.description}
                placeholder="Description"
                className="form-control mb-3"
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="Price"
                className="form-control mb-3"
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="duration"
                value={formData.duration}
                placeholder="Duration In Minutes"
                className="form-control mb-3"
                onChange={handleChange}
                required
            />

            <input
                type="file"
                name="image"
                className="form-control mb-3"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                required
            />
            
            <div className="d-flex gap-2">

            <button
                type="submit"
                className="btn btn-dark"
            >
                Add Service
            </button>

            <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
            >
                Close
            </button>

            </div>

        </form>
       </div> 

    </div>
);

}

export default AddService;
