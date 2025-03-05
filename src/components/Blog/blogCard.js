import {
  Avatar,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "./awardribbon.css";

import React, { useState } from "react";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useNavigate } from "react-router-dom";
import { DotOutline } from "@phosphor-icons/react";

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
    isBestBlog,
  } = blogDetails.blogDetails;
  const formattedDate = new Date(date).toDateString();

  const handleReadMore = () => {
    navigate(`/blogs/${_id}`);
  };
  return (
    <>
      {/* WEB VIEW */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          flexDirection: "row",
          justifyContent: "flex-start",
          height: "25vh",
          width: "100%",
          borderRadius: 2,
          backdropFilter: "blur(12px)",
          border: "0.5px solid transparent",
          "&:hover": {
            // boxShadow: "0px 0px 2px 0px #016A70",
            border: "0.5px solid #016A70",
          },
          cursor: "pointer",
        }}
        elevation={0}
        onClick={handleReadMore}
      >
        {/* AWARD RIBBON */}
        {isBestBlog && (
          <div className="ribbon">
            <span>Best of Feb</span>
          </div>
        )}
        {/* <Box sx={{ position: "absolute", top: 0, right: -10, zIndex:100 }}>
          <img src={awardLogo} alt="awardlogo" style={{ width: "80px" }} />
        </Box> */}
        <Grid container xs={12} sx={{ zIndex: 10 }}>
          {/* Image Details */}
          <Grid item xs={4}>
            <Box
              sx={{
                flex: 1,
                backgroundImage: `url(${blogImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                p: 1,
                boxSizing: "border-box",
                whiteSpace: "nowrap",
              }}
            >
              {/* <img
                src={blogImage}
                alt={"blog-image"}
                style={{ width: "60%" }}
              /> */}
              <Chip
                label={category}
                size="medium"
                sx={{
                  alignSelf: "flex-start",
                  // m: "4px 4px 0px 0px",
                  backgroundColor: "#00000090",
                  fontSize: "10px",
                  color: "#ffffff",
                  border: "0.5px solid #ffffff",
                }}
              />
            </Box>
          </Grid>
          {/* Description */}
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "space-between",
                // alignItems: "center",
                // height: "50%",
                padding: "4px 8px",
                gap: 1,
              }}
            >
              {/* INFO */}
              <Box
                sx={{
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  // minHeight: 100,
                  backgroundColor: "transparent",
                }}
              >
                <Typography variant="p" color={""}>
                  {username || "Anonymous"}
                </Typography>
                <DotOutline size={20} />
                <Typography variant="p" color={""} sx={{ display: "flow" }}>
                  {userrole || "-"}
                </Typography>
                <DotOutline size={20} />
                <Typography variant="p" color={"darkgray"}>
                  Posted at {formattedDate}
                </Typography>
              </Box>
              {/* TITLE DESCRIPTION */}
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {title}
                </Typography>
                <Typography
                  variant="p"
                  color={"CaptionText"}
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxHeight: "100%",
                    lineHeight: "1.5em",
                  }}
                >
                  {description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

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
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            spacing={1}
            minWidth={"100%"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Avatar
                sx={{ width: 24, height: 24, p: 1, boxSizing: "border-box" }}
              >
                {username?.split("")[0]}
              </Avatar>
              <Stack direction={"column"} spacing={0}>
                <Typography variant="caption" fontSize={10}>
                  {username}
                </Typography>
                <Typography variant="caption" fontSize={8}>
                  {userrole}
                </Typography>
              </Stack>
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
      <Divider
        orientation="horizontal"
        variant="middle"
        flexItem
        sx={{ borderColor: "#016A7050" }}
      />
    </>
  );
};

export default Blog;
