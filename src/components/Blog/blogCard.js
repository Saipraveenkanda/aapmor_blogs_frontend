import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useNavigate } from "react-router-dom";

const Blog = (blogDetails) => {
  const navigate = useNavigate();
  const [isBookmarked, setBookmark] = useState(false);
  const {
    category,
    date,
    description,
    title,
    username,
    userrole,
    _id,
    blogImage,
  } = blogDetails.blogDetails;
  const formattedDate = new Date(date).toDateString();

  const handleReadMore = () => {
    navigate(`/blogs/${_id}`);
  };
  return (
    <>
      {/* WEB VIEW */}
      <Card
        sx={{
          display: { xs: "none", sm: "block" },
          height: "max-content",
          width: { xs: "100%", sm: 300, md: 250 },
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0px 0px 10px 0px #00000050 ",
          },
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(
              ${blogImage}
            )`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 120,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Chip
            label={category}
            size="small"
            sx={{
              justifySelf: "flex-start",
              alignSelf: "flex-end",
              m: "4px 4px 0px 0px",
              backgroundColor: "#00000090",
              fontSize: "10px",
              color: "#ffffff",
              border: "0.5px solid #ffffff",
            }}
          />
          <Box
            sx={{
              background: "linear-gradient(to top, #000000, #00000002 )",
              paddingLeft: 1,
              boxSizing: "border-box",
            }}
          >
            <Typography variant="subtitle2" color={"#ffffff"}>
              {username}
            </Typography>
            <Typography
              variant="caption"
              color={"#ffffff"}
              sx={{ display: "flow" }}
            >
              {userrole}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            pl: 1,
            pr: 1,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            minHeight: 100,
          }}
        >
          <Typography
            variant="caption"
            color={"darkgray"}
            fontSize={"10px"}
            mt={0.5}
          >
            Posted at {formattedDate}
          </Typography>
          <Typography variant="p" fontWeight={700}>
            {title.slice(0, 50)}
          </Typography>
          <Typography variant="caption" color={"grey"}>
            {description.slice(0, 60)}...
          </Typography>
        </Box>
        <Divider flexItem orientation="horizontal" />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "max-content",
            padding: "0px 10px",
            alignSelf: "flex-end",
            cursor: "pointer",
            "&:hover": {
              color: "#e65100",
            },
          }}
          onClick={handleReadMore}
        >
          <Typography variant="body2">Read more</Typography>
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Card>

      {/* MOBILE VIEW */}

      <Card
        sx={{
          height: "160px",
          borderRadius: 2,
          border: "1px dotted #00000050",
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
        onClick={handleReadMore}
      >
        <img
          src={blogImage}
          alt={title}
          style={{
            width: "30%",
            height: "80%",
            borderRadius: 4,
            marginLeft: "10px",
            boxShadow: "-1px -1px 10px 0px #bfbfbf",
          }}
        />
        <Divider orientation="vertical" flexItem />
        <Stack
          direction={"column"}
          spacing={1}
          sx={{
            padding: 1,
            boxSizing: "border-box",
            alignItems: "space-between",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Typography
              variant="caption"
              fontWeight={100}
              fontSize={10}
              color={"grey"}
            >
              Posted: {formattedDate}
            </Typography>
            <Chip
              label={category}
              size="small"
              sx={{
                justifySelf: "flex-end",
                alignSelf: "flex-end",
                m: "4px 4px 0px 0px",
                backgroundColor: "#00000090",
                fontSize: "10px",
                color: "#ffffff",
              }}
            />
          </Stack>

          <Typography variant="body2" fontWeight={700}>
            {title.slice(0, 50)}
          </Typography>
          <Stack direction={"row"} spacing={1} minWidth={"100%"}>
            <Avatar sx={{ width: 22, height: 22 }} />
            <Stack direction={"column"} spacing={0}>
              <Typography variant="caption" fontSize={10}>
                {username}
              </Typography>
              <Typography variant="caption" fontSize={10}>
                {userrole}
              </Typography>
            </Stack>
            {isBookmarked ? (
              <IconButton
                onClick={() => setBookmark(!isBookmarked)}
                sx={{ justifySelf: "flex-end" }}
              >
                <BookmarkAddedIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setBookmark(!isBookmarked)}>
                <BookmarkAddOutlinedIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
};

export default Blog;
