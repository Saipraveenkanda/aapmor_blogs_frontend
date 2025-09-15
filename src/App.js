import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login.js";
import Home from "./components/HomePage/home.js";
import BlogView from "./components/BlogView/blogview.js";
import CreateBlog from "./components/CreateBlog/postblog.js";
import SavedBlogs from "./components/SavedBlogs/savedBlogs.js";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute.js";
import UserProfile from "./components/UserProfile/userProfile.js";
import UserBlogs from "./components/UserBlogs/userBlogs.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import AdminPage from "./modules/admin/AdminPage.jsx";
import WriteBlog from "./components/CreateBlog/WriteBlog.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff5252", // Kind of Red
    },
    text: {
      primary: "#f4f6f8", // Primary Text Color
      secondary: "#bfbfbf", // Secondary Text Color
      body: "#ff5252",
      watermark: "#ffffff14",
    },
    background: {
      default: "#121212", // Default Background Color
      paper: "#2c2c2c",
      dark: "#2c2c2c",
    },
    action: {
      hover: "#FF8F07", // Action Hover Color
    },
    accent: {
      // main: "#016A70", // Custom color
      main: "#FF8F07",
      light: "#FF8F0750",
      dark: "#e65100",
    },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff5252",
    },
    text: {
      primary: "#121212",
      secondary: "#4f4f4f",
      body: "#ff5252",
      watermark: "#00000014",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
      dark: "#ffffff",
    },
    action: {
      hover: "#FF8F07",
    },
    accent: {
      // main: "#016A70",
      main: "#FF8F07",
      light: "#FF8F07",
      dark: "#e65100",
    },
  },
});

const App = () => {
  const mode = useSelector((state) => state.blogs.appTheme);
  const appTheme = JSON.parse(localStorage.getItem("theme")) || mode;

  return (
    <ThemeProvider theme={appTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/blogs/:id" element={<BlogView />} />
        {/* Routes with protected access */}
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/createblog" element={<CreateBlog />} />
          <Route exact path="/writeblog" element={<WriteBlog />} />
          <Route exact path="/user/saved" element={<SavedBlogs />} />
          <Route exact path="/user/profile" element={<UserProfile />} />
          <Route exact path="/user/blogs" element={<UserBlogs />} />
          <Route exact path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
//APP MODIFIED
export default App;
