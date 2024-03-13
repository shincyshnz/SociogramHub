import axios from 'axios';
import { axiosInstance } from './Interceptors';
import { useQuery } from '@tanstack/react-query';

const createFormData = (data) => {
    let formData = new FormData();

    for (const key in data) {
        formData.append(key, data[key]);
    }
    return formData;
}

/* ---------------------- Authentication & Authorization -------------------------------- --*/

export const RegisterAPI = async (data) => {
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
    return response?.data?.userDetails;
}

export const GetUsersAPI = async (searchTerm) => {
    const response = await axios(`${import.meta.env.VITE_USERS_URL}/searchUser?name=${searchTerm}`);
    return response?.data?.users;
}

export const GetSuggestedUsersAPI = async () => {
    const response = await axiosInstance.get(`${import.meta.env.VITE_USERS_URL}/suggestedUsers?limit=${import.meta.env.VITE_SUGGESTED_USER_LIMIT}`);
    return response?.data?.suggestedUsers;
}

export const FollowUsersAPI = async (data) => {
    const response = await axiosInstance(`${import.meta.env.VITE_USERS_URL}/${data}/follow`, {
        method: "POST"
    });
    return response?.data?.message;
}

export const UnFollowUsersAPI = async (data) => {
    const response = await axiosInstance(`${import.meta.env.VITE_USERS_URL}/${data}/unfollow`, {
        method: "POST"
    });
    return response?.data?.message;
}

/* ---------------------- Post Data ----------------------------------------- --*/

export const CreatePostsAPI = async (data) => {
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

export const AddCommentsAPI = async (data) => {
    const response = axiosInstance(`${import.meta.env.VITE_COMMENTS_URL}/addComments`, {
        method: "POST",
        withCredentials: true,
        data,
    });
    return response;
}

export const GetUserPostsAPI = async () =>{
    const response = await axiosInstance.get(`${import.meta.env.VITE_POSTS_URL}/userPosts`);
    return response?.data;
}

