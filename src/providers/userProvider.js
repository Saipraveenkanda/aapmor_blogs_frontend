import { toast } from "react-toastify";
import { TOAST_MESSAGES } from "../utilities/constants";
import { apiEndpoints } from "../config/apiEndpoints";
import createAxiosInstance from "../config/AxiosInstance";

const axios = createAxiosInstance();
export const sendOtpApi = async (email) => {
  try {
    const response = await axios.post(apiEndpoints.forgetPassUrl, {
      email,
    });
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //EMAIL ERROR
    return error;
  }
};

export const loginValidation = async (loginDetails) => {
  try {
    const response = await axios.post(apiEndpoints.loginApiUrl, loginDetails);
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //OTP ERROR
    return error;
  }
};

export const profileUpdateApi = async (profileDetails) => {
  try {
    const response = await axios.post(
      apiEndpoints.profileUpdateApiUrl,
      profileDetails
    );
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PROFILE UPDATE ERROR
    return error;
  }
};

//CHECKING PROFILE AFTER LOGIN API
export const profileCheckingApi = async () => {
  try {
    return axios.get(apiEndpoints.profileCheckingApiUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PROFILE CHECK ERROR
    return error;
  }
};

/* UPLOAD PROFILE IMAGE */
export const uploadProfileImage = async (formData) => {
  try {
    return await axios.post(apiEndpoints.profileImageUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //UPLOAD PROFILE IMAGE ERROR
    return error;
  }
};

/* GET BIO FROM AI */
export const getAutoBioService = async (data) => {
  try {
    return await axios.post(apiEndpoints.generateUserBioUrl, data);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET biO FROM AI ERROR
    return error;
  }
};
