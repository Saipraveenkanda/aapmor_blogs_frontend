import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    blogViewObj: {},
    appTheme: false,
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
  },
});
export const { setBlogsData, setBlogViewObj, setAppTheme } = blogSlice.actions;
export default blogSlice.reducer;
