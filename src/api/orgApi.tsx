import axios from "axios";
const url = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token");
const org = localStorage.getItem("org");

export const getOrgs = async () => {
    try {
        const response = await axios.get(`${url}orgs/get/${org}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }

};


