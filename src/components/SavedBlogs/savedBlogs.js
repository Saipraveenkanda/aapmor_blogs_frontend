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
        <Typography sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          Loading saved blogs <CircularProgress />
        </Typography>
      </Box>
    );
  };

  const renderFailureView = () => {
    return (
      <Box sx={{ display: "grid", placeItems: "center", height: "90vh" }}>
        <Typography variant="subtitle1" fontWeight={600} fontSize={18}>
          Oops! Something went wrong while trying to fetch the blogs.
          <br />
          Please check your internet connection or try again later
        </Typography>
      </Box>
    );
  };

  const renderBlogsView = () => {
    return (
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          // textAlign={""}
        >
          Your Saved Blogs
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            // p: 2,
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            "@media(max-width:480px)": { width: "100%" },
          }}
        >
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
