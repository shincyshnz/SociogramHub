import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_AUTH_URL}`
});

// 401 - Unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            // localStorage.clear();
            const response = await axiosInstance("/refreshToken");
            if (response) {
                localStorage.setItem("accessToken", response?.data?.accessToken)
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
);

// Attach accesstoken
axiosInstance.interceptors.request.use(
    (request) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            request.withCredentials = true;
            request.headers.Accesstoken = accessToken;
        }
        return request;
    },
    (error) => error
);