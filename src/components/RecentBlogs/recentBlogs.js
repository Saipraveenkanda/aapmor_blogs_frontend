import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecentBlogs = () => {
  const blogObj = useSelector((state) => state.blogs);
  const recentBlogsList = blogObj.blogs;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() - 1; // 0-based index (0 = January, 11 = December)
  const currentYear = currentDate.getFullYear();
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    const blogs = blogObj.blogs;
    if (blogs.length > 0) {
      setTopBlogs(
        [...recentBlogsList]
          .filter((blog) => {
            const blogDate = new Date(blog.date);
            return (
              blogDate.getMonth() === currentMonth &&
              blogDate.getFullYear() === currentYear
            );
          })
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(0, 5)
      );
      setLoading(false);
    }
  }, [blogObj]);

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
    <Box sx={{ mt: "24px" }}>
      {topBlogs.length > 0 ? (
        <>
          <Typography variant="h6" fontWeight={600}>
            Most liked blogs {/* of {monthName} */}
          </Typography>
          <List
            sx={{
              bgcolor: "background.paper",
              maxWidth: "100%",
              overflowY: "auto",
              height: "80vh",
              scrollbarWidth: "thin",
            }}
          >
            {topBlogs?.map(
              ({ blogImage, description, title, username, _id }) => {
                return (
                  <Box key={_id}>
                    <ListItem
                      key={_id}
                      alignItems="flex-start"
                      disablePadding
                      sx={{
                        display: "flex",
                        gap: 1,
                        cursor: "pointer",
                        mb: 1.5,
                        mt: 1.5,
                      }}
                      onClick={() => navigate(`/blogs/${_id}`)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt="blog image"
                          src={blogImage}
                          sx={{ width: 64, height: 64 }}
                          variant="rounded"
                        />
                      </ListItemAvatar>
                      <Stack direction={"column"} spacing={0.5}>
                        <Typography
                          variant="p"
                          // fontSize={12}
                          style={{
                            // minWidth: "200px",
                            textOverflow: "ellipsis",
                          }}
                          fontWeight={600}
                        >
                          {title.slice(0, 26)}...
                          {/* {title} */}
                        </Typography>

                        <Typography
                          sx={{ display: "inline", maxWidth: "85%" }}
                          component="span"
                          variant="p"
                          fontSize={12}
                          color="text.primary"
                          textOverflow={"ellipsis"}
                        >
                          <b>{username || "Anonymous"}</b>
                          {` - ${description.slice(0, 50)}...`}
                        </Typography>
                      </Stack>
                    </ListItem>
                    <Divider orientation="horizontal" />
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
    </Box>
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
