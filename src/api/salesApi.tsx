import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const url = `${api}sales`;

const token = localStorage.getItem("token");

export const getSales = async () => {
    const response = await axios.get(`${url}/get`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status !== 200) {
        throw new Error(response.data.message);
    }

    return response.data;
};

export const createSale = async (data: any) => {
    const response = await axios.post(`${url}/create`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updateSale = async (id: string, data: any) => {
    const response = await axios.put(`${url}/update/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const deleteSale = async (id: string) => {
    const response = await axios.delete(`${url}/delete/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}


export const getAllReport = async () => {
    const response = await axios.get(`${url}/report`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}


export const getReportByWeek = async () => {
    try {
        const response = await axios.get(`${url}/week`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error)

    }
}


export const getSalesDetails = async (id: string) => {
    try {
        const response = await axios.get(`${url}/get/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error)
    }
};
