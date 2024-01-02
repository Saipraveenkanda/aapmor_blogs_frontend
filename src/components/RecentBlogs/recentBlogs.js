import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecentBlogs = () => {
  const blogObj = useSelector((state) => state.blogs);
  const recentBlogsList = blogObj.blogs;
  const navigate = useNavigate();

  return (
    <Box>
      {recentBlogsList.length > 0 ? (
        <>
          <Typography variant="body1" fontWeight={600} marginTop={2}>
            Related blogs you might like
          </Typography>
          <List sx={{ bgcolor: "background.paper", maxWidth: "100%" }}>
            {recentBlogsList.slice(0, 5).map((eachBlogItem) => {
              const { blogImage, description, title, username, _id } =
                eachBlogItem;
              return (
                <>
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
                    <Stack direction={"column"} spacing={0}>
                      <Typography
                        variant="subtitle2"
                        fontSize={12}
                        style={{
                          minWidth: "200px",
                        }}
                        fontWeight={600}
                      >
                        {title.slice(0, 26)}...
                      </Typography>

                      <Typography
                        sx={{ display: "inline", maxWidth: "85%" }}
                        component="span"
                        variant="caption"
                        fontSize={11}
                        color="text.primary"
                      >
                        {username}
                        {` - ${description.slice(0, 50)}`}
                      </Typography>
                    </Stack>
                  </ListItem>
                  <Divider orientation="horizontal" />
                </>
              );
            })}
          </List>
        </>
      ) : null}
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
