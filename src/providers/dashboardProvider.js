import { toast } from "react-toastify";
import { TOAST_MESSAGES } from "../utilities/constants";
import { apiEndpoints } from "../config/apiEndpoints";
import createAxiosInstance from "../config/AxiosInstance";

const axios = createAxiosInstance();
export const getNotifications = async () => {
  try {
    return await axios.get(apiEndpoints.getNotificationsUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};
export const deleteNotifications = async (userId) => {
  try {
    return await axios.delete(`${apiEndpoints.getNotificationsUrl}/${userId}`);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};
