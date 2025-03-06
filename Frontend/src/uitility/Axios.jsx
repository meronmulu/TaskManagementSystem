import axios from "axios"

const API_URL = "http://localhost:6600/api/users";


const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});




export default axiosInstance;