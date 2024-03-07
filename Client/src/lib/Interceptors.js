import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_AUTH_URL}`,
});

// 401 - Unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 404) {
            alert("Server Error, Please try again later");
        }
        if (error?.response?.status === 401) {
            try {
                const response = await axiosInstance.get("/refreshToken");
                localStorage.setItem("accessToken", response?.data?.accessToken);
                window.location.reload();
            } catch (error) {
                // if refresh Token Not present, clear local storage and redirect to login 
                localStorage.clear();
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
            request.headers.Authorization = accessToken;
        }
        return request;
    },
    (error) => error
);