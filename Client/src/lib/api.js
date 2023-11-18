import axios from 'axios';

export const registerAPI = async (data) => {
    let formData = new FormData();

    for (const key in data) {
        formData.append(key, data[key]);
    }
    const response = await axios(`${import.meta.env.VITE_AUTH_URL}/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        data: formData,
    });
    return response;
};

export const LoginAPI = async (data) => {
    const response = await axios(`${import.meta.env.VITE_AUTH_URL}/login`, {
        method: "POST",
        withCredentials: true,
        data,
    });
    return response;
};

export const GenerateOtpAPI = async (data) => {
    const response = await axios(`${import.meta.env.VITE_PASSWORD_URL}/otp`, {
        method: "POST",
        data,
    });
    return response;
};

export const VerifyOtpAPI = async (data) => {
    const response = await axios(`${import.meta.env.VITE_PASSWORD_URL}/verifyOtp`, {
        method: "POST",
        data,
    });
    return response;
};

export const ResetPasswordAPI = async (data) => {
    const response = await axios(`${import.meta.env.VITE_PASSWORD_URL}/resetPassword`, {
        method: "POST",
        data,
    });
    return response;
};