import axios from 'axios';
import { axiosInstance } from './Interceptors';

const createFormData = (data) => {
    let formData = new FormData();

    for (const key in data) {
        formData.append(key, data[key]);
    }
    return formData;
}

/* ---------------------- Authentication & Authorization -------------------------------- --*/

export const registerAPI = async (data) => {
    // let formData = new FormData();

    // for (const key in data) {
    //     formData.append(key, data[key]);
    // }
    const response = await axios(`${import.meta.env.VITE_AUTH_URL}/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        data: createFormData(data),
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

/* ---------------------- Users Data ---------------------------------------- --*/

export const GetProfileAPI = async () => {
    const response = await axiosInstance.get(`${import.meta.env.VITE_AUTH_URL}/profile`);
    console.log(response?.data, "==profile");
    return response?.data?.userDetails;
}

export const GetUsersAPI = async (searchTerm) => {
    const response = await axios(`${import.meta.env.VITE_USERS_URL}/searchUser?name=${searchTerm}`);
    return response?.data?.users;
}

export const GetSuggestedUsersAPI = async () => {
    const response = await axiosInstance(`${import.meta.env.VITE_USERS_URL}/suggestedUsers?limit=${process.env.SUGGESTED_USER_LIMIT}`);
    console.log(response?.data);
    return response?.data?.suggestedUsers;
}

/* ---------------------- Post Data ----------------------------------------- --*/

export const createPostsAPI = async (data) => {
    const response = await axiosInstance(`${import.meta.env.VITE_POSTS_URL}/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        data: createFormData(data),
    });
    return response;
}

export const GetPostsAPI = async () => {
    const response = await axiosInstance.get(`${import.meta.env.VITE_POSTS_URL}/getAllPosts`);
    return response?.data?.posts;
}