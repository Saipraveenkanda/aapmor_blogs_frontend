import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login.js";
import Home from "./components/HomePage/home.js";
import BlogView from "./components/BlogView/blogview.js";
import CreateBlog from "./components/CreateBlog/postblog.js";
import SavedBlogs from "./components/SavedBlogs/savedBlogs.js";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute.js";
import UserProfile from "./components/UserProfile/userProfile.js";
import UserBlogs from "./components/UserBlogs/userBlogs.js";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/blogs/:id" element={<BlogView />} />
      {/* Routes with protected access */}
      <Route exact path="/" element={<ProtectedRoute />}>
        <Route exact path="/createblog" element={<CreateBlog />} />
        <Route exact path="/user/saved" element={<SavedBlogs />} />
        <Route exact path="/user/profile" element={<UserProfile />} />
        <Route exact path="/user/blogs" element={<UserBlogs />} />
      </Route>
    </Routes>
  );
};
//APP MODIFIED
export default App;
