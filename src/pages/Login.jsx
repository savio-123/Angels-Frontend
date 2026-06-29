import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    const [FormData,setFormData] = useState({
        username:'',
        password:'',
    })

    const handleChange = (e) =>{
        setFormData({
            ...FormData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit= async(e) =>{
        e.preventDefault()

        try{
            const res = await api.post('users/own-login/',FormData)

            localStorage.setItem("is_staff",res.data.is_staff)
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)

            alert("Login Successful")
            navigate('/')

        }
        catch (error) {

            console.log(error)
            alert("Invalid Credentials")
        }
    }
    return (

        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control mb-3"
                    onChange={handleChange}
                />

                <button className="btn btn-dark">
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login
