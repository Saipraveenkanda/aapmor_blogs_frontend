import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/header";
import RecentBlogs from "../RecentBlogs/recentBlogs";
import {
  getBlogsApi,
  getPublishBlogToWeb,
  profileCheckingApi,
} from "../ApiCalls/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setBlogsData } from "../Slices/blogSlice";
import UnauthorizedPage from "./UnauthorizedComponent";
import { useNavigate } from "react-router-dom";

const AdminPage = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const blogObj = useSelector((state) => state.blogs);
  const blogs = blogObj.blogs;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetail();
    getBlogsData();
    getPublishedBlogs();
  }, []);

  const getUserDetail = async () => {
    setLoading(true);
    const response = await profileCheckingApi();
    if (response) {
      setIsAdmin(
        response?.data?.res?.admin ? response?.data?.res?.admin : false
      );
      setLoading(false);
    }
    setLoading(false);
  };

  const getPublishedBlogs = async () => {
    const response = await getPublishBlogToWeb();
    if (response) {
      setPublishedBlogs(response.data.data);
    }
  };

  const getBlogsData = async () => {
    const response = await getBlogsApi();
    if (response.status === 200) {
      dispatch(setBlogsData(response.data));
    } else {
      console.log("Error in fetching blogs");
    }
  };

  useEffect(() => {
    !isAdmin &&
      !loading &&
      setTimeout(() => {
        navigate("/");
      }, 2000);
  }, [isAdmin]);

  return (
    <Box>
      <Header />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : isAdmin ? (
        <Box sx={{ padding: "0px 40px" }}>
          <Typography variant="h6" fontWeight={"bold"} textAlign={"center"}>
            Admin Dashboard
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={4.5} item>
              <RecentBlogs blogs={blogs} context="recent" />
            </Grid>
            <Grid xs={4.5} item>
              <RecentBlogs blogs={publishedBlogs} context="published" />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <UnauthorizedPage />
      )}
    </Box>
  );
};

export default AdminPage;
