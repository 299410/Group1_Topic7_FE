import axios from 'axios';

const axiosClient = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: attach token
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: handle errors
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Here we could handle global errors like 401 (token expired)
        // by clearing storage and redirecting to login if needed.
        return Promise.reject(error);
    }
);

export default axiosClient;
