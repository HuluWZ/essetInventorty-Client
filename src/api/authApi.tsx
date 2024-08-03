import axios from "axios";


const api = import.meta.env.VITE_API_URL;
const url = `${api}auth`;

export const register = async (data: any) => {
    try {
        const response = await axios.post(`${url}/create`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data: any) => {
    try {
        const response = await axios.post(`${url}/login`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axios.get(`${url}/logout`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


