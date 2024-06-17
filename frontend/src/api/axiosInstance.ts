import axios from "axios";
import { DOMAIN_URL } from "../utils/constant";

const axiosInstance = axios.create({
    baseURL: DOMAIN_URL + "/api",
});

export default axiosInstance;
