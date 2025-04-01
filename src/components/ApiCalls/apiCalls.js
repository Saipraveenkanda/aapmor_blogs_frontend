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
  uploadThumbnailUrl,
  deleteBlogUrl,
  postWinnerUrl,
  getWinnerUrl,
  blogSummary,
  profileImageUrl,
  generateUserBioUrl,
  getAuthorUrl,
  likeCommentsUrl,
  commentReplyUrl,
} from "../Url/configUrls";
import axios from "axios";
const host = process.env.REACT_APP_API_URL;

export const sendOtpApi = async (email) => {
  const response = await axios.post(forgetPassUrl, { email });
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
  const token = Cookies.get("jwtToken");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogDetails),
  };
  const response = await fetch(createBlogApiUrl, options);
  return response;
};

export const deleteBlogApi = async (id) => {
  const token = Cookies.get("jwtToken");
  const options = {
    method: "DELETE",
    url: `${deleteBlogUrl}/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios(options);
    if (response.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateBlogApi = async (id, updatedData) => {
  const token = Cookies.get("jwtToken");
  const options = {
    method: "PUT",
    url: `${deleteBlogUrl}/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(updatedData),
  };
  const response = await axios(options);
  return response;
};
export const getBlogsApi = async () => {
  const response = await axios.get(
    // `${host}/blogs/filter/?category=${category}`
    `${host}/blogs`
  );
  return response;
};
export const getBlogViewApi = async (id) => {
  const response = await axios.get(`${host}/blogs/${id}`);
  return response;
};

export const saveBlogsApi = async (saveDetails) => {
  const response = await axios.post(saveBlogsApiUrl, saveDetails);
  return response;
};
export const profileUpdateApi = async (profileDetails) => {
  const token = Cookies.get("jwtToken");
  const options = {
    method: "post",
    url: profileUpdateApiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify(profileDetails),
  };
  const response = await axios(options);
  return response;
};

//CHECKING PROFILE AFTER LOGIN API
export const profileCheckingApi = async () => {
  const token = Cookies.get("jwtToken");
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
  const token = Cookies.get("jwtToken");
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
export const likesApi = async (id, name) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "put",
    url: likesApiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id, name },
  };
  const response = await axios(config);
  return response;
};

//GET SAVED BLOGS API
export const getSavedBlogsApi = async () => {
  const token = Cookies.get("jwtToken");
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
  const token = Cookies.get("jwtToken");
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
  const token = Cookies.get("jwtToken");
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

export const uploadThumbnail = async (image) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "post",
    url: uploadThumbnailUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: image,
  };
  const response = await axios(config);
  return response;
};
export const uploadProfileImage = async (image) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "post",
    url: profileImageUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: image,
  };
  const response = await axios(config);
  return response;
};

export const postWinnerDetails = async (data) => {
  const token = Cookies.get("jwtToken");
  try {
    const config = {
      method: "post",
      url: postWinnerUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const getWinnerOfTheMonth = async () => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "get",
    url: getWinnerUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response;
};
export const getSummaryOfBlog = async (data) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "post",
    url: blogSummary,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const response = await axios(config);
  return response;
};

export const getAutoBioService = async (data) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "post",
    url: generateUserBioUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const response = await axios(config);
  return response;
};
export const getAuthorDetailsService = async (email) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "get",
    url: `${getAuthorUrl}/${email}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response;
};

export const commentLikeService = async (blogId, commentIndex) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "post",
    url: `${likeCommentsUrl}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { blogId, commentIndex },
  };
  const response = await axios(config);
  return response;
};
export const commentReplyService = async (
  blogId,
  commentIndex,
  replyText,
  name
) => {
  const token = Cookies.get("jwtToken");
  const config = {
    method: "post",
    url: `${commentReplyUrl}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { blogId, commentIndex, replyText, name },
  };
  const response = await axios(config);
  return response;
};
