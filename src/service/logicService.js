import AxiosInstance from "./AxiosInstance";

const baseURL = process.env.REACT_APP_API_URL;
export const axiosInstance = AxiosInstance(baseURL);
