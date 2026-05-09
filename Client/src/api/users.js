import { axiosInstance } from "../lib/axios";

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