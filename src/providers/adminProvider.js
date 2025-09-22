import { toast } from "react-toastify";
import { apiEndpoints } from "../config/apiEndpoints";
import createAxiosInstance from "../config/AxiosInstance";
import { TOAST_MESSAGES } from "../utilities/constants";
const axios = createAxiosInstance();
/* POST WINNER DETAILS */
export const postWinnerDetails = async (data) => {
  try {
    return await axios.post(apiEndpoints.postWinnerUrl, data);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //POST WINNER ERROR
    return error;
  }
};

/* GET WINNER DETAILS */
export const getWinnerOfTheMonth = async () => {
  try {
    return await axios.get(apiEndpoints.getWinnerUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET WINNERS ERROR
    return error;
  }
};

/* PUBLISH BLOG TO AAPMOR WEBSITE */
export const publishBlogToWeb = async (data) => {
  try {
    return await axios.post(apiEndpoints.publishBlogToWebUrl, data);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};
/* GET PUBLISHED BLOGS TO AAPMOR WEBSITE */
export const getPublishBlogToWeb = async (data) => {
  try {
    return await axios.get(apiEndpoints.publishBlogToWebUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};
/* UNPUBLISH BLOG TO AAPMOR WEBSITE */
export const unpublishBlogToWeb = async (id) => {
  console.log(id, "ID IN FRONT END");
  try {
    return await axios.delete(`${apiEndpoints.publishBlogToWebUrl}/${id}`);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};
export const getTrendingBlogs = async () => {
  try {
    return await axios.get(`${apiEndpoints.getTrendingBLogsUrl}?months=3`);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};

export const getActivityService = async () => {
  try {
    return await axios.get(apiEndpoints.getActivityUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};
