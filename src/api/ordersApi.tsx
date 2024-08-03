import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const url = `${api}orders`;

const token = localStorage.getItem("token");

export const getOrders = async () => {
    const response = await axios.get(`${url}/get`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Something went wrong");
    }
    return response.data;
};


export const createOrder = async (data: any) => {
    const response = await axios.post(`${url}/create`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const updateOrder = async (id: string, data: any) => {
    const response = await axios.put(`${url}/update/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const deleteOrder = async (id: string) => {
    const response = await axios.delete(`${url}/delete/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;

}

export const approveOrder = async (id: string) => {
    console.log(id);
    const response = await axios.get(`${url}/approve/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}


export const orderReport = async () => {
    const response = await axios.get(`${url}/report`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

export const getOrder = async (id: string) => {
    try {

        const response = await axios.get(`${url}/get/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}
