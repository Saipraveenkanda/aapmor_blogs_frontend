import Cookies from "js-cookie";
import {
  registerApiUrl,
  forgetPassUrl,
  loginApiUrl,
  createBlogApiUrl,
  saveBlogsApiUrl,
  profileUpdateApiUrl,
  profileCheckingApiUrl,
  publishBlogApiUrl,
  likesApiUrl,
  saveBLogApiUrl,
  getSavedBlogsApiUrl,
  commentsApiUrl,
} from "../Url/configUrls";
import axios from "axios";
const host = "192.168.0.122";
// const host = "localhost";
const token = Cookies.get("jwtToken");

export const sendOtpApi = async (email) => {
  const response = await axios.post(forgetPassUrl, { email });
  console.log(response);
  return response;
};

export const loginValidation = async (loginDetails) => {
  const response = await axios.post(loginApiUrl, loginDetails);
  return response;
};
export const submitRegisterApi = async (userDetails) => {
  const response = await axios.post(registerApiUrl, userDetails);
  return response;
};
export const createBlogApi = async (blogDetails) => {
  const jwtToken = Cookies.get("jwtToken");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(blogDetails),
  };
  const response = await fetch(createBlogApiUrl, options);
  return response;
};
export const getBlogsApi = async (category) => {
  const response = await axios.get(
    `http://${host}:3005/blogs/filter/?category=${category}`
  );
  return response;
};
export const getBlogViewApi = async (id) => {
  const response = await axios.get(`http://${host}:3005/blogs/${id}`);
  return response;
};

export const saveBlogsApi = async (saveDetails) => {
  const response = await axios.post(saveBlogsApiUrl, saveDetails);
  return response;
};
export const profileUpdateApi = async (profileDetails) => {
  const response = await axios.post(profileUpdateApiUrl, profileDetails);
  return response;
};

//CHECKING PROFILE AFTER LOGIN API
export const profileCheckingApi = async () => {
  const options = {
    method: "get",
    url: profileCheckingApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(options);

  return response;
};

//COMMENTS API
export const commentsApi = async (commentObject) => {
  const config = {
    method: "post",
    url: commentsApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: commentObject,
  };
  const response = await axios(config);
  return response;
};

//PUBLISHING BLOG
export const publishBlogApi = async (content) => {
  // const requestData = {
  //   htmlContent: htmlContent,
  // };
  const response = await axios.post(publishBlogApiUrl, content);
  return response;
};

// LIKES API
export const likesApi = async (id) => {
  const response = await axios.put(likesApiUrl, id);
  return response;
};

//GET SAVED BLOGS API
export const getSavedBlogsApi = async () => {
  const config = {
    method: "get",
    url: getSavedBlogsApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response;
};

//SAVING A BLOG API
export const saveBlogApi = async (_id) => {
  const config = {
    method: "post",
    url: saveBLogApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { _id },
  };
  const response = await axios(config);
  return response;
};

//REMOVE BLOG FROM SAVED ARRAY API
export const removeSaveBlogApi = async (_id) => {
  const config = {
    method: "put",
    url: saveBLogApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { _id },
  };
  const response = await axios(config);
  return response;
};
