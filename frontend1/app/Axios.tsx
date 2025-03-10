import axios from "axios"

const API_BASE_URL = "http://localhost:6600/api";


const instance = axios.create({
       baseURL: API_BASE_URL,
       headers: {
        "Content-Type": "application/json",
       },
})



export default instance;