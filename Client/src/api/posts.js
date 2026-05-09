import { axiosInstance } from "../lib/axios";
import { createFormData } from "../lib/utils/createFormData";

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

export const GetUserPostsAPI = async (userId) =>{
    const response = await axiosInstance.get(`${import.meta.env.VITE_POSTS_URL}/userPosts/userId`);
    return response?.data;
}

