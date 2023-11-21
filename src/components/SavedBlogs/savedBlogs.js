import React, { useEffect, useState } from "react";
import Header from "../HomePage/header";
import { Box, CircularProgress, Typography } from "@mui/material";
import BottomNavbar from "../BottomNavigation/bottomNavigation";
import { getSavedBlogsApi } from "../ApiCalls/apiCalls";
import Blog from "../Blog/blogCard";

const SavedBlogs = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [apiStatus, setApiStatus] = useState("INITIAL");

  useEffect(() => {
    document.title = "AAPMOR | Blogs - Saved";
    const getSavedBlogs = async () => {
      const response = await getSavedBlogsApi();
      if (response.status === 200) {
        setSavedBlogs(response.data);
        setApiStatus("SUCCESS");
      } else {
        setApiStatus("FAILURE");
      }
    };
    getSavedBlogs();
  }, []);

  const renderLoading = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Typography>Loading saved blogs...</Typography>
        <CircularProgress />
      </Box>
    );
  };

  const renderFailureView = () => {
    return (
      <Box>
        <Typography variant="subtitle1" fontWeight={600} fontSize={18}>
          Oops! Something went wrong while trying to fetch the blogs.
          <br />
          Please check your internet connection and try again later
        </Typography>
      </Box>
    );
  };

  const renderBlogsView = () => {
    return (
      <Box>
        <Typography variant="h6" sx={{ pl: 2, pt: 2 }} fontWeight={700}>
          Your Saved Blogs
        </Typography>
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          {savedBlogs.map((blogItem) => {
            return <Blog blogDetails={blogItem} key={blogItem._id} />;
          })}
        </Box>
      </Box>
    );
  };

  const renderEmptyBlogsView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "85vh",
        }}
      >
        <Typography variant="p" fontWeight={600} fontSize={20}>
          Sorry, you haven't saved any blogs, try saving some blogs and refresh
          the page
        </Typography>
      </Box>
    );
  };

  const renderSavedBlogs = () => {
    return (
      <Box>
        {savedBlogs.length > 0 ? renderBlogsView() : renderEmptyBlogsView()}
      </Box>
    );
  };

  const renderApiStatus = () => {
    switch (apiStatus) {
      case "INITIAL":
        return renderLoading();
      case "SUCCESS":
        return renderSavedBlogs();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <Box>{renderApiStatus()}</Box>
      <BottomNavbar />
    </>
  );
};

export default SavedBlogs;
