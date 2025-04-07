import { apiEndpoints } from "../Url/configUrls";
import { axiosInstance } from "../../service/logicService";
import { toast } from "react-toastify";
import { TOAST_MESSAGES } from "../../utilities/constants";

export const sendOtpApi = async (email) => {
  try {
    const response = await axiosInstance.post(apiEndpoints.forgetPassUrl, {
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
    const response = await axiosInstance.post(
      apiEndpoints.loginApiUrl,
      loginDetails
    );
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //OTP ERROR
    return error;
  }
};

export const createBlogApi = async (blogDetails) => {
  try {
    const response = await axiosInstance.post(
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
    const response = await axiosInstance.delete(
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
    const response = await axiosInstance.put(
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
    const response = await axiosInstance.get(apiEndpoints.getAllBlogs);
    return response;
  } catch (error) {
    toast.error(TOAST_MESSAGES.FAILURE_BLOGS); //GET BLOGS ERROR
    return error;
  }
};

export const getBlogViewApi = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${apiEndpoints.getAllBlogs}/${id}`
    );
    return response;
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.FAILURE_BLOG); //GET BLOG ERROR
    return error;
  }
};

/* NOT USING */
// export const saveBlogsApi = async (saveDetails) => {
//   try {
//     const response = await axiosInstance.post(
//       apiEndpoints.saveBlogsApiUrl,
//       saveDetails
//     );
//     return response;
//   } catch (error) {
//     console.log(error, "ERROR");
//     return <CustomSnackbar message={error} />;
//   }
// };

export const profileUpdateApi = async (profileDetails) => {
  try {
    const response = await axiosInstance.post(
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
    return axiosInstance.get(apiEndpoints.profileCheckingApiUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PROFILE CHECK ERROR
    return error;
  }
};

//COMMENTS API
export const commentsApi = async (commentObject) => {
  try {
    return axiosInstance.post(apiEndpoints.commentsApiUrl, commentObject);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //COMMENT ERROR
    return error;
  }
};

//PUBLISHING BLOG
export const publishBlogApi = async (content) => {
  try {
    return await axiosInstance.post(apiEndpoints.publishBlogApiUrl, content);
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
    return await axiosInstance.put(apiEndpoints.likesApiUrl, payload);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //LIKES ERROR
    return error;
  }
};

//GET SAVED BLOGS API
export const getSavedBlogsApi = async () => {
  try {
    return await axiosInstance.get(apiEndpoints.getSavedBlogsApiUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET SAVED BLOGS ERROR
    return error;
  }
};

//SAVING A BLOG API
export const saveBlogApi = async (_id) => {
  try {
    return await axiosInstance.post(apiEndpoints.saveBLogApiUrl, { _id });
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //SAVE BLOG ERROR
    return error;
  }
};

//REMOVE BLOG FROM SAVED ARRAY API
export const removeSaveBlogApi = async (_id) => {
  try {
    return await axiosInstance.put(apiEndpoints.saveBLogApiUrl, { _id });
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //REMOVE SAVED BLOG ERROR
    return error;
  }
};

/* UPLOAD THUMBNAIL */
export const uploadThumbnail = async (image) => {
  try {
    return await axiosInstance.post(apiEndpoints.uploadThumbnailUrl, image);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //UPLOAD THUMBNAIL ERROR
    return error;
  }
};

/* UPLOAD PROFILE IMAGE */
export const uploadProfileImage = async (formData) => {
  try {
    return await axiosInstance.post(apiEndpoints.profileImageUrl, formData, {
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

/* POST WINNER DETAILS */
export const postWinnerDetails = async (data) => {
  try {
    return await axiosInstance.post(apiEndpoints.postWinnerUrl, data);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //POST WINNER ERROR
    return error;
  }
};

/* GET WINNER DETAILS */
export const getWinnerOfTheMonth = async () => {
  try {
    return await axiosInstance.get(apiEndpoints.getWinnerUrl);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET WINNERS ERROR
    return error;
  }
};

/* GET BLOG SUMMARY FROM AI */
export const getSummaryOfBlog = async (data) => {
  try {
    return await axiosInstance.post(apiEndpoints.blogSummary, data);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET SUMMARY ERROR
    return error;
  }
};

/* GET BIO FROM AI */
export const getAutoBioService = async (data) => {
  try {
    return await axiosInstance.post(apiEndpoints.generateUserBioUrl, data);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //GET biO FROM AI ERROR
    return error;
  }
};

/* GET AUTHOR DETAILS */
export const getAuthorDetailsService = async (email) => {
  try {
    return await axiosInstance.get(`${apiEndpoints.getAuthorUrl}/${email}`);
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
    return await axiosInstance.post(apiEndpoints.likeCommentsUrl, payload);
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
    return await axiosInstance.post(apiEndpoints.commentReplyUrl, payload);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //REPLY TO COMMENTS ERROR
    return error;
  }
};

/* PUBLISH BLOG TO AAPMOR WEBSITE */
export const publishBlogToWeb = async (data) => {
  try {
    return await axiosInstance.post(apiEndpoints.publishBlogToWebUrl, data);
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};
/* GET PUBLISHED BLOGS TO AAPMOR WEBSITE */
export const getPublishBlogToWeb = async (data) => {
  try {
    return await axiosInstance.get(apiEndpoints.publishBlogToWebUrl);
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
    return await axiosInstance.delete(
      `${apiEndpoints.publishBlogToWebUrl}/${id}`
    );
  } catch (error) {
    console.log(error, "ERROR");
    toast.error(TOAST_MESSAGES.DEFAULT_ERROR); //PUBLISH TO WEB ERROR
    return error;
  }
};
