import { toast } from "react-toastify";
import { TOAST_MESSAGES } from "../utilities/constants";
import { apiEndpoints } from "../config/apiEndpoints";
import createAxiosInstance from "../config/AxiosInstance";

const axios = createAxiosInstance();

export const createBlogApi = async (blogDetails) => {
  try {
    const response = await axios.post(
      apiEndpoints.createBlogApiUrl,
      blogDetails
    );
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //CREATE BLOG ERROR
    return error;
  }
};

export const deleteBlogApi = async (id) => {
  try {
    const response = await axios.delete(
      `${apiEndpoints.createBlogApiUrl}/${id}`
    );
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //DELETE BLOG ERROR
    return error;
  }
};

export const updateBlogApi = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${apiEndpoints.deleteBlogUrl}/${id}`,
      updatedData
    );
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //UPDATE BLOG ERROR
    return error;
  }
};

export const getBlogsApi = async () => {
  try {
    const response = await axios.get(apiEndpoints.getAllBlogs);
    return response;
  } catch (error) {
    toast.error(TOAST_MESSAGES.FAILURE_BLOGS); //GET BLOGS ERROR
    return error;
  }
};

export const getBlogViewApi = async (id) => {
  try {
    const response = await axios.get(`${apiEndpoints.getAllBlogs}/${id}`);
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    // toast.error(TOAST_MESSAGES.FAILURE_BLOG); //GET BLOG ERROR
    return error;
  }
};

/* NOT USING */
// export const saveBlogsApi = async (saveDetails) => {
//   try {
//     const response = await axios.post(
//       apiEndpoints.saveBlogsApiUrl,
//       saveDetails
//     );
//     return response;
//   } catch (error) {
//     console.log(error, "ERROR");
//     return <CustomSnackbar message={error} />;
//   }
// };

//COMMENTS API
export const commentsApi = async (commentObject) => {
  try {
    return axios.post(apiEndpoints.commentsApiUrl, commentObject);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //COMMENT ERROR
    return error;
  }
};

//PUBLISHING BLOG
export const publishBlogApi = async (content) => {
  try {
    return await axios.post(apiEndpoints.publishBlogApiUrl, content);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH BLOG ERROR
    return error;
  }
};

// LIKES API
export const likesApi = async (id, name) => {
  const payload = {
    id,
    name,
  };
  try {
    return await axios.put(apiEndpoints.likesApiUrl, payload);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //LIKES ERROR
    return error;
  }
};

//GET SAVED BLOGS API
export const getSavedBlogsApi = async () => {
  try {
    return await axios.get(apiEndpoints.getSavedBlogsApiUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET SAVED BLOGS ERROR
    return error;
  }
};

//SAVING A BLOG API
export const saveBlogApi = async (_id) => {
  try {
    return await axios.post(apiEndpoints.saveBLogApiUrl, { _id });
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //SAVE BLOG ERROR
    return error;
  }
};

//REMOVE BLOG FROM SAVED ARRAY API
export const removeSaveBlogApi = async (_id) => {
  try {
    return await axios.put(apiEndpoints.saveBLogApiUrl, { _id });
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //REMOVE SAVED BLOG ERROR
    return error;
  }
};

/* UPLOAD THUMBNAIL */
export const uploadThumbnail = async (image) => {
  try {
    return await axios.post(apiEndpoints.uploadThumbnailUrl, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //UPLOAD THUMBNAIL ERROR
    return error;
  }
};
/* GET BLOG SUMMARY FROM AI */
export const getSummaryOfBlog = async (data) => {
  try {
    return await axios.post(apiEndpoints.blogSummary, data);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET SUMMARY ERROR
    return error;
  }
};

/* GET AUTHOR DETAILS */
export const getAuthorDetailsService = async (email) => {
  try {
    return await axios.get(`${apiEndpoints.getAuthorUrl}/${email}`);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET AUTHOR DETAILS ERROR
    return error;
  }
};

/* LIKING COMMENTS */
export const commentLikeService = async (blogId, commentIndex) => {
  const payload = { blogId, commentIndex };
  try {
    return await axios.post(apiEndpoints.likeCommentsUrl, payload);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //LINKING COMMENTS ERROR
    return error;
  }
};

/* REPLY TO COMMENTS */
export const commentReplyService = async (
  blogId,
  commentIndex,
  replyText,
  name
) => {
  const payload = {
    blogId,
    commentIndex,
    replyText,
    name,
  };

  try {
    return await axios.post(apiEndpoints.commentReplyUrl, payload);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //REPLY TO COMMENTS ERROR
    return error;
  }
};

/* GET BLOGS BY CATEGORY */
export const getBlogsByCategoryApi = async (category = "All") => {
  try {
    const response = await axios.get(
      `${apiEndpoints.filterBlogsApiUrl}?category=${category}`
    );
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //FILTER BLOG ERROR
    return error;
  }
};
