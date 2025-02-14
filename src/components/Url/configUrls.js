const host = process.env.REACT_APP_API_URL;
export const updatePassUrl = `${host}/users/`;
export const forgetPassUrl = `${host}/sendEmail`;
export const registerApiUrl = `${host}/api/register`;
export const loginApiUrl = `${host}/api/login`;
export const createBlogApiUrl = `${host}/blogs/`;
export const saveBlogsApiUrl = `${host}/blogs/savedblogs/`;
export const profileUpdateApiUrl = `${host}/profile`;
export const publishBlogApiUrl = `${host}/publishBlog`;
export const likesApiUrl = `${host}/likes`;
export const saveBLogApiUrl = `${host}/saveblog`;
export const getSavedBlogsApiUrl = `${host}/usersaved`;
export const profileCheckingApiUrl = `${host}/profile/check`;
export const commentsApiUrl = `${host}/comments`;
export const uploadThumbnailUrl = `${host}/post/blogthumb`;
export const deleteBlogUrl = `${host}/blogs`;
