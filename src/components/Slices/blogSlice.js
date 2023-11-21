import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    blogViewObj: {},
  },
  reducers: {
    setBlogsData: (state, action) => {
      state.blogs = action.payload;
    },
    setBlogViewObj: (state, action) => {
      state.blogViewObj = action.payload;
    },
  },
});
export const { setBlogsData, setBlogViewObj } = blogSlice.actions;
export default blogSlice.reducer;
