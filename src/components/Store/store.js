import { configureStore } from "@reduxjs/toolkit";
// import navbarChange from "../Slices/DarkLightThemeSlice";
import blogReducer from "../../store/slices/blogSlice";
import userReducer from "../../store/slices/userSlice";
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
  },
});
export default store;
