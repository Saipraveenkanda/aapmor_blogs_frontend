import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { getSavedBlogsApi, removeSaveBlogApi } from "../ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";


const SavedBlogs = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AAPMOR | Blogs - Profile";
    getSavedBlogs();
  }, []);

  const getSavedBlogs = async () => {
    const response = await getSavedBlogsApi();
    if (response.status === 200) {
      setSavedBlogs(response.data);
      setApiStatus("SUCCESS");
    } else {
      setApiStatus("FAILURE");
    }
  };

  const handleBlogUnsave = async (id) => {
    const response = await removeSaveBlogApi(id);
    if (response.status === 200) {
      getSavedBlogs();
    }
  };

  const renderLoading = () => {
    return (
      <Box sx={{ width: "100%", mb: 1.5, mt: 2 }}>
        {[1, 2, 3, 4].map((each, index) => (
          <div key={index}>
            <Box
              key={index}
              sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 1.5 }}
            >
              <Skeleton
                variant="rectangular"
                sx={{ width: "84px", height: "72px", borderRadius: "4px" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  marginTop: 0,
                }}
              >
                <Skeleton sx={{ width: "100%", height: "24px" }} />
                <Skeleton sx={{ width: "100%", height: "20px" }} />
                <Skeleton sx={{ width: "100%", height: "20px" }} />
              </Box>
            </Box>
            {index !== 3 && <Divider orientation="horizontal" sx={{ mb: 1 }} />}
            {/* <Divider sx={{ mb: 1 }} /> */}
          </div>
        ))}
      </Box>
    );
  };

  const renderFailureView = () => {
    return (
      <Box sx={{ display: "grid", placeItems: "center", height: "100%" }}>
        <Typography variant="subtitle1" fontWeight={600} fontSize={18}>
          Oops! Something went wrong while trying to fetch the blogs.
          <br />
          Please check your internet connection or try again later
        </Typography>
      </Box>
    );
  };

  const renderTimeLine = (likes, comments, date, _id) => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
        sx={{
          width: "100%",
          padding: "6px 10px",
          background: "rgba(255, 255, 255, 0.1)", // Light glass effect
          borderRadius: "8px",
          backdropFilter: "blur(8px)", // Soft blur effect
          boxSizing: "border-box",
        }}
      >
        {/* Left Section: Date, Likes, Comments */}
        <Typography
          variant="caption"
          sx={{
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#666",
          }}
        >
          📅 {new Date(date).toLocaleDateString()}
          <ThumbUpOutlinedIcon
            fontSize="small"
            sx={{ color: "#016A70" }}
          />{" "}
          {likes?.length}
          <CommentIcon fontSize="small" sx={{ color: "#016A70" }} />{" "}
          {comments?.length}
        </Typography>

        {/* Right Section: Unsave & Read More */}
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            sx={{ color: "#016A70" }}
            onClick={() => handleBlogUnsave(_id)}
          >
            <BookmarkIcon />
          </IconButton>
          <Button
            size="small"
            // variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#016A70",
              borderRadius: "16px",
              border: "1px solid #016A70",
              "&:hover": {
                border: "1px solid transparent",
                color: "#016A70",
                backgroundColor: "transparent",
              },
            }}
            startIcon={<VisibilityIcon fontSize="small" />}
            onClick={() => navigate(`/blogs/${_id}`)}
          >
            Read More
          </Button>
        </Stack>
      </Stack>
    );
  };

  const renderBlogsView = () => {
    return (
      <List
        sx={{
          bgcolor: "background.paper",
          maxWidth: "100%",
          overflowY: "auto",
          maxHeight: "calc(78vh - 32px)",
          scrollbarWidth: "thin",
        }}
      >
        {savedBlogs?.map(
          (
            {
              blogImage,
              description,
              title,
              username,
              _id,
              likes,
              comments,
              date,
            },
            index
          ) => {
            return (
              <Box key={_id}>
                <ListItem
                  key={_id}
                  disablePadding
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "flex-start",
                    width: "100%",
                    mb: 1.5,
                    mt: 1.5,
                  }}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <ListItemAvatar>
                      <Avatar
                        alt="blog image"
                        src={blogImage}
                        sx={{ width: 64, height: 64 }}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <Stack direction={"column"} spacing={0}>
                      {/* <Typography variant="caption">
                        {new Date(date).toLocaleString()} | {likes?.length}{" "}
                        likes | {comments?.length} comments
                      </Typography> */}
                      <Typography
                        variant="p"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "normal",
                        }}
                        fontWeight={600}
                      >
                        {title}
                      </Typography>

                      <Typography
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "normal",
                        }}
                        component="span"
                        variant="p"
                        color="text.primary"
                      >
                        <b>{username || "Anonymous"}</b>
                        {` : ${description}`}
                      </Typography>
                    </Stack>
                  </Stack>
                  {renderTimeLine(likes, comments, date, _id)}
                </ListItem>
                {index !== savedBlogs.length - 1 && (
                  <Divider orientation="horizontal" />
                )}
              </Box>
            );
          }
        )}
      </List>
    );
  };

  const renderEmptyBlogsView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
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
      {/* <Header /> */}
      <Typography
        variant="h6"
        // gutterBottom
        sx={{ fontWeight: "bold", color: "#016A70" }}
      >
        Your Saved Blogs
      </Typography>
      <Box>{renderApiStatus()}</Box>
      {/* <BottomNavbar /> */}
    </>
  );
};

export default SavedBlogs;
