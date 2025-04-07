import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/header";
import RecentBlogs from "../RecentBlogs/recentBlogs";
import {
  getBlogsApi,
  getPublishBlogToWeb,
  getTrendingBlogs,
  getWinnerOfTheMonth,
  profileCheckingApi,
} from "../ApiCalls/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setTopBlogsData, setWinnerBlogs } from "../Slices/blogSlice";
import UnauthorizedPage from "./UnauthorizedComponent";
import { useNavigate } from "react-router-dom";
import WinnerItem from "./WinnerItem";

const AdminPage = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const topBlogs = useSelector((state) => state.blogs.topBlogs);
  const winnerBlogs = useSelector((state) => state.blogs.winnerBlogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(topBlogs, "TOP BLOGS");
  useEffect(() => {
    getUserDetail();
    getTopBlogsData();
    getPublishedBlogs();
    getWinnerBlogs();
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

  const getTopBlogsData = async () => {
    const response = await getTrendingBlogs();
    if (response.status === 200) {
      dispatch(setTopBlogsData(response.data));
    } else {
      console.log("Error in fetching blogs");
    }
  };
  const getWinnerBlogs = async () => {
    const response = await getWinnerOfTheMonth();
    if (response) {
      dispatch(setWinnerBlogs(response.data));
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
        <Box sx={{ padding: "10px 40px" }}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            // textAlign={"center"}
            gutterBottom
          >
            Admin Dashboard
          </Typography>
          <Grid container spacing={2}>
            {/* TOP LIKED BLOGS OF LAST 2 MONTHS */}
            <Grid xs={6} spacing={2} item sx={{ flexDirection: "column" }}>
              <RecentBlogs blogs={topBlogs} />
            </Grid>
            {/* PUBLISHED BLOGS */}
            <Grid xs={6} item spacing={2}>
              <RecentBlogs publishedBlogs={publishedBlogs} />
            </Grid>
            {/* WINNERS OF THE PREVIOUS MONTHS */}
            <Grid xs={12} item>
              <WinnerItem winners={winnerBlogs} />
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
