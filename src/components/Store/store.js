import { configureStore } from "@reduxjs/toolkit";
// import navbarChange from "../Slices/DarkLightThemeSlice";
import blogReducer from "../../store/slices/blogSlice";
const store = configureStore({
  reducer: {
    // navbar: navbarChange,
    blogs: blogReducer,
  },
});
export default store;
