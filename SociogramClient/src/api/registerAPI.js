import axios from 'axios';
import { formatDate } from '../utils/formatDate';

const today = formatDate(new Date());

export const registerAPI = async (data, dob) => {
    let formData = new FormData();
    data.dob = dob;

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
