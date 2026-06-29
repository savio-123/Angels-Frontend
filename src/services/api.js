import axios from 'axios'

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL
})

// Request Interceptor
api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem(
            "access"
        )

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`
        }

        return config
    },

    (error) => {

        return Promise.reject(error)
    }
)


// Response Interceptor
api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config

        if (

            error.response?.status === 401 &&

            !originalRequest._retry
        ) {

            originalRequest._retry = true

            try {

                const refresh = localStorage.getItem(
                    "refresh"
                )

                const res = await api.post(
                    "token/refresh/",
                    {
                        refresh
                    }
                );

                localStorage.setItem(
                    "access",
                    res.data.access
                )

                originalRequest.headers.Authorization =
                    `Bearer ${res.data.access}`

                return api(originalRequest)

            } catch {

                localStorage.removeItem("access")

                localStorage.removeItem("refresh")

                window.location.href = "/own-login"
            }
        }

        return Promise.reject(error)
    }
)

export default api