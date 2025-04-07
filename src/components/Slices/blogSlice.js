import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    blogViewObj: {},
    appTheme: false,
    topBlogs: [],
    winnerBlogs: [],
  },
  reducers: {
    setBlogsData: (state, action) => {
      state.blogs = action.payload;
    },
    setBlogViewObj: (state, action) => {
      state.blogViewObj = action.payload;
    },
    setAppTheme: (state, action) => {
      state.appTheme = action.payload;
    },
    setTopBlogsData: (state, action) => {
      state.topBlogs = action.payload;
    },
    setWinnerBlogs: (state, action) => {
      state.winnerBlogs = action.payload;
    },
  },
});
export const {
  setBlogsData,
  setBlogViewObj,
  setAppTheme,
  setTopBlogsData,
  setWinnerBlogs,
} = blogSlice.actions;
export default blogSlice.reducer;
