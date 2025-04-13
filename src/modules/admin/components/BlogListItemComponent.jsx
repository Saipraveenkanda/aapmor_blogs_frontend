import {
  Avatar,
  Box,
  Divider,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

const BlogListItemComponent = ({
  blog,
  index,
  handleClick,
  setLikes,
  length,
}) => {
  const navigate = useNavigate();
  const {
    blogImage,
    description,
    title,
    username,
    likes,
    comments,
    _id,
  } = blog;
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
            <Typography
              variant="p"
              sx={{
                // maxWidth: "90%",
                textOverflow: "ellipsis",
              }}
              fontWeight={600}
            >
              {title?.slice(0, 26)}
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
      {index !== length - 1 && <Divider orientation="horizontal" />}
    </Box>
  );
};

export default BlogListItemComponent;
