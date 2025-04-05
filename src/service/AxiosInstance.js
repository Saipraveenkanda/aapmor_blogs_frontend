import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("jwtToken");

const AxiosInstance = (baseURL) => {
  const initAxiosInstance = () => {
    const options = {
      baseURL: baseURL,
      timeout: 60000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const axiosInstance = axios.create(options);
    return axiosInstance;
  };

  return initAxiosInstance();
};

export default AxiosInstance;
