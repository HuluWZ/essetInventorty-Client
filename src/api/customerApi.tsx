import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const api = `${url}customer/`;


const token = localStorage.getItem("token") || "";

//get all categories
export const getCustomers = async () => {
    const response = await axios.get(`${api}get`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

//create category
export const createCustomer = async (data: any) => {
    const response = await axios.post(`${api}create`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}


//get category by id
export const getCustomerById = async (id: any) => {
    const response = await axios.get(`${api}get/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

//update category
export const updateCustomer = async (id: any, data: any) => {
    const response = await axios.put(`${api}update/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}


export const deleteCustomer = async (id: any) => {
    const response = await axios.delete(`${api}delete/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}
