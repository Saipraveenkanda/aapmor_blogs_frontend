import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnauthorizedPage from "../../components/UnauthorizedComponent";
import { useNavigate } from "react-router-dom";
import WinnerItem from "../../modules/admin/components/WinnerItem";
import {
  getPublishBlogToWeb,
  getTrendingBlogs,
  getWinnerOfTheMonth,
} from "../../providers/adminProvider";
import { profileCheckingApi } from "../../providers/userProvider";
import Header from "../../components/HomePage/header";
import { setTopBlogsData, setWinnerBlogs } from "../../store/slices/blogSlice";
import RecentBlogs from "./components/recentBlogs";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';

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

  //back navigation
  const handleBack=()=>{
 navigate(-1)
  }
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
            <IconButton onClick={handleBack}>
              <ArrowBackIosIcon/>
            </IconButton>
            Admin Dashboard
          </Typography>
          <Grid container spacing={2} flexDirection={"column"}>
            {/* TOP LIKED BLOGS OF LAST 2 MONTHS */}
            <Grid
              xs={12}
              md={6}
              spacing={2}
              item
              sx={{ flexDirection: "column" }}
            >
              <RecentBlogs blogs={topBlogs} />
            </Grid>
            {/* PUBLISHED BLOGS */}
            <Grid xs={12} md={6} item spacing={2}>
              <RecentBlogs publishedBlogs={publishedBlogs} />
            </Grid>
            {/* WINNERS OF THE PREVIOUS MONTHS */}
            <Typography
              sx={{ mt: 2, pl: 2 }}
              variant="h5"
              fontWeight={"bold"}
              gutterBottom
            >
              Monthly Spotlight: Winning Blogs
            </Typography>
            <Grid xs={12} container item spacing={2}>
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
