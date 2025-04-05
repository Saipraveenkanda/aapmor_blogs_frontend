import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Skeleton,
  Stack,
  Typography,
  Popover,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons";

const RecentBlogs = ({ blogs }) => {
  // const blogObj = useSelector((state) => state.blogs);
  const recentBlogsList = blogs;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() - 1; // 0-based index (0 = January, 11 = December)
  const currentYear = currentDate.getFullYear();
  const [topBlogs, setTopBlogs] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [likes, setLikes] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverid = open ? "simple-popover" : undefined;

  useEffect(() => {
    setLoading(true);
    if (blogs.length > 0) {
      setTopBlogs(
        [...recentBlogsList]
          .filter((blog) => {
            const blogDate = new Date(blog.date);
            return (
              blogDate.getMonth() === currentMonth &&
              blogDate.getFullYear() === currentYear &&
              blog.likes.length > 0
            );
          })
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(0, 5)
      );
      setLoading(false);
    }
  }, [blogs]);

  const renderLoadingView = () => {
    return (
      <Box sx={{ width: "100%", mb: 1.5 }}>
        <Skeleton
          variant="text"
          sx={{ fontSize: "32px", width: "70%", mb: 2 }}
        />
        {[1, 2, 3, 4, 5].map((each, index) => (
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
            <Divider sx={{ mb: 1 }} />
          </div>
        ))}
      </Box>
    );
  };
  const monthName = new Date().toLocaleString("default", {
    month: "long",
  });

  return (
    <>
      <Paper sx={{ p: 2, boxSizing: "border-box", borderRadius: 2 }}>
        {topBlogs.length > 0 ? (
          <>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <ThumbUpOutlinedIcon sx={{ color: "#016A70" }} /> Most liked blogs
              of {monthName}
            </Typography>
            <List
              sx={{
                bgcolor: "background.paper",
                maxWidth: "100%",
                overflowY: "auto",
                maxHeight: "70vh",
                scrollbarWidth: "thin",
              }}
            >
              {topBlogs?.map(
                (
                  {
                    blogImage,
                    description,
                    title,
                    username,
                    _id,
                    likes,
                    comments,
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
                          gap: 1,
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          cursor: "pointer",
                          mb: 1.5,
                          mt: 1.5,
                        }}
                        onClick={() => navigate(`/blogs/${_id}`)}
                      >
                        <Stack
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt="blog image"
                              src={blogImage}
                              sx={{ width: 64, height: 64 }}
                              variant="rounded"
                            />
                          </ListItemAvatar>
                          <Stack direction={"column"} spacing={0}>
                            <Typography
                              variant="p"
                              sx={{
                                // maxWidth: "90%",
                                textOverflow: "ellipsis",
                              }}
                              fontWeight={600}
                            >
                              {title.slice(0, 26)}
                            </Typography>

                            <Typography
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2, // Limits text to 2 lines
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal", // Ensures wrapping
                              }}
                              component="span"
                              variant="p"
                              // fontSize={12}
                              color="text.primary"
                              // textOverflow={"ellipsis"}
                            >
                              <b>{username || "Anonymous"}</b>
                              {` : ${description}`}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack
                          sx={{
                            mr: 1,
                            justifySelf: "flex-end",
                            alignSelf: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              cursor: "pointer",
                              "&:hover": {
                                color: "action.hover",
                              },
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLikes(likes);
                              handleClick(e);
                            }}
                          >
                            <ThumbUpOutlinedIcon />
                            {likes.length}
                          </Typography>
                          <Divider flexItem sx={{ m: "4px 0px" }} />
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <ChatOutlinedIcon />
                            {comments.length}
                          </Typography>
                        </Stack>
                      </ListItem>
                      {index !== topBlogs.length - 1 && (
                        <Divider orientation="horizontal" />
                      )}
                    </Box>
                  );
                }
              )}
            </List>
          </>
        ) : (
          topBlogs.length === 0 &&
          !loading && <Typography>No blogs this month!</Typography>
        )}
        {loading && renderLoadingView()}
      </Paper>
      {/* Likes popover */}
      <Popover
        id={popoverid}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          spacing={1}
          sx={{
            borderRadius: 1,
            // border: "0.5px solid accent.main",
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {likes?.length > 0 ? (
            likes?.map((eachUser) => {
              return (
                <Stack direction={"row"} spacing={1.5} sx={{ p: 1 }}>
                  <PersonOutlineTwoToneIcon sx={{ color: "accent.main" }} />
                  <Typography variant="p" fontWeight={"500"}>
                    {eachUser.name}
                  </Typography>
                </Stack>
              );
            })
          ) : (
            <Stack direction={"row"} spacing={1.5} sx={{ p: 1 }}>
              <SentimentDissatisfiedOutlinedIcon sx={{ color: "#016A70" }} />
              <Typography variant="p" fontWeight={"500"}>
                No likes
              </Typography>
            </Stack>
          )}
        </Stack>
      </Popover>
    </>
  );
};

export default RecentBlogs;

/* 
blogImage: "data:image/webp;base64,UklGRtoFAQBXRUJQVlA4WAoAAA
category: "Entertainment"
comments: (13) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
date: "2023-11-07T18:30:00.000Z"
description: "Over the years, I have had many encounters with Japanese websites — be it researching visa requirements, planning trips, or simply ordering something online. And it took me a loooong while to get used to the walls of text, lavish use of bright colors & 10+ different fonts that sites like this one throw in your face"
html: "<p>Though there are numerous examples of sites wi
likes: 34
savedUser: ['praveensaik@aapmor.com']
title: "Why Japanese Websites Look So Different"
username: null
userrole: null
_id: "654b0002813fb027c425ee66" */
