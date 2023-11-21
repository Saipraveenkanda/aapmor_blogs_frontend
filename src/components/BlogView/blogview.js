import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../HomePage/header";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Footer from "../HomePage/footer";
import {
  commentsApi,
  likesApi,
  removeSaveBlogApi,
  saveBlogApi,
} from "../ApiCalls/apiCalls";
import Cookies from "js-cookie";
import { LoadingButton } from "@mui/lab";

const BlogView = () => {
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState({});
  const location = useLocation();
  const { pathname } = location;
  const path = pathname.split("/");
  const id = path[2];
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBlogItem();
  }, []);

  const token = Cookies.get("jwtToken");
  const cookiesName = Cookies.get("username");
  const name = cookiesName !== undefined ? cookiesName : "U";
  const email = Cookies.get("userEmail");
  const dateObject = new Date();

  /*   var dateObject = new Date();
  var datetime =
    dateObject.getDay() +
    "/" +
    dateObject.getMonth() +
    "/" +
    dateObject.getFullYear() +
    " @ " +
    dateObject.getHours() +
    ":" +
    dateObject.getMinutes() +
    ":" +
    dateObject.getSeconds(); */

  const handleCommentApi = async () => {
    setLoading(true);
    const commentObject = { comment, id, name, dateObject };
    const response = await commentsApi(commentObject);
    console.log(response);
    if (response.status === 200) {
      setLoading(false);
      getBlogItem();
    }
    setComment("");
  };

  const handleLikes = async () => {
    const response = await likesApi({ id });
    console.log(response);
    if (response.status === 200) {
      getBlogItem();
    }
  };

  const getBlogItem = async () => {
    const response = await axios.get(`http://localhost:3005/blogs/${id}`);
    const blogDetails = await response.data;
    if (response.status === 200) {
      setApiStatus("SUCCESS");
      setBlogDetails(blogDetails);
    } else {
      setApiStatus("FAILURE");
    }
  };

  const {
    category,
    comments,
    date,
    likes,
    title,
    html,
    username,
    _id,
    savedUsers,
  } = blogDetails;

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
        <CircularProgress />
      </Box>
    );
  };

  // time difference
  const getTimeAgo = (dateObject) => {
    const currentDate = new Date();
    const date = new Date(dateObject);
    const timeDifference = currentDate - date;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days + " days ago";
    } else if (hours > 0) {
      return hours + " hours ago";
    } else if (minutes > 0) {
      return minutes + " minutes ago";
    } else {
      return seconds + " seconds ago";
    }
  };

  // SAVE BLOG TO USER SAVED

  const handleBlogSave = async () => {
    const response = await saveBlogApi(_id);
    if (response.status === 200) {
      getBlogItem();
    }
  };

  const handleBlogUnsave = async () => {
    const response = await removeSaveBlogApi(_id);
    if (response.status === 200) {
      getBlogItem();
    }
  };

  // RENDER EACH COMMENT

  const renderComments = () => {
    return (
      <Stack direction={"column"} spacing={0}>
        {comments.map((eachComment) => {
          const { comment, name, dateObject } = eachComment;
          const time = getTimeAgo(dateObject);
          return (
            <>
              <Stack
                key={eachComment._id}
                direction={"row"}
                spacing={2}
                sx={{
                  padding: 1,
                  boxSizing: "border-box",
                }}
              >
                <Avatar>{name[0].toUpperCase()}</Avatar>
                <Stack direction={"column"} spacing={1}>
                  <Typography variant="inherit" color={"#000"} fontWeight={600}>
                    {name}{" "}
                    <text style={{ color: "grey", fontSize: "10px" }}>
                      {"\u25CF"}
                    </text>
                    <span
                      style={{
                        fontWeight: "lighter",
                        color: "lightslategray",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      {time}
                    </span>
                  </Typography>

                  <Typography variant="body2">{comment}</Typography>
                </Stack>
              </Stack>
              <Divider orientation="horizontal" flexItem />
            </>
          );
        })}
      </Stack>
    );
  };
  //RENDERING NO COMMENTS VIEW
  const renderNoCommentsView = () => {
    return (
      <Box sx={{}}>
        <Typography variant="body1">No comments yet</Typography>
      </Box>
    );
  };

  //RENDERING BLOG VIEW
  const renderBLogView = () => {
    document.title = `Blog: ${title}`;
    const saved = savedUsers.includes(email) ? true : false;
    const formattedDate = new Date(date).toDateString();
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "space-around",
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: 4,
            paddingTop: 0,
            maxWidth: { md: "70%", xs: "100%", sm: "90%" },
            boxSizing: "border-box",
          }}
        >
          <Chip
            label={category}
            size="small"
            color="primary"
            sx={{
              fontSize: "12px",
              color: "#ffffff",
              padding: 1,
              mb: 2,
            }}
          />
          <Typography gutterBottom variant="h4" color={"grey"}>
            {title}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, pb: 1 }}>
            <Avatar>P</Avatar>
            <Stack direction={"column"} spacing={0}>
              <Typography variant="p">{username}</Typography>
              <Stack direction={"row"} spacing={2}>
                <Typography variant="caption" color={"darkgray"}>
                  Created on {formattedDate}
                </Typography>
              </Stack>
            </Stack>

            {/* SAVE OR UNSAVE ICON */}

            {token !== undefined && (
              <>
                {saved ? (
                  <Tooltip title="Remove from saved blogs">
                    <IconButton onClick={handleBlogUnsave}>
                      <BookmarkAddedIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add to saved blogs">
                    <IconButton onClick={handleBlogSave}>
                      <BookmarkAddOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            )}
          </Box>

          <Divider orientation="horizontal" flexItem />

          {/* HTML FILE */}

          <Box
            dangerouslySetInnerHTML={{ __html: html }}
            sx={{ width: { md: "70%", xs: "100%", sm: "90%" } }}
          ></Box>

          <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} />

          {/* Comments and likes*/}
          <Stack direction={"row"} spacing={4} mt={2}>
            <Stack direction={"column"} alignItems={"center"}>
              <IconButton
                onClick={handleLikes}
                sx={{ marginTop: 0, padding: 0 }}
              >
                <ThumbUpOutlinedIcon />
              </IconButton>
              <Typography>{likes} </Typography>
            </Stack>
            <Stack direction={"column"} alignItems={"center"} mt={2}>
              <InsertCommentOutlinedIcon />
              <Typography>{comments.length} </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Comments view */}

        <Box
          sx={{
            paddingLeft: 4,
            backgroundColor: "#fff",
            width: { md: "50%", xs: "80%", sm: "90%" },
          }}
        >
          <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <ChatBubbleOutlineOutlinedIcon />
              <Typography fontFamily={"Lora"} fontSize={"24px"}>
                Comments
              </Typography>
            </Stack>
            <Divider orientation="horizontal" flexItem />
            {token && (
              <Box
                sx={{
                  backgroundColor: "#bfbfbf20",
                  borderRadius: 2,
                  padding: 1,
                  boxSizing: "border-box",
                  mt: 1,
                }}
              >
                <Stack direction={"row"} spacing={3} sx={{ mt: 1 }}>
                  <Avatar>{name[0].toUpperCase()}</Avatar>
                  <Stack
                    direction={"column"}
                    alignItems={"flex-end"}
                    spacing={1}
                    sx={{ width: "100%" }}
                  >
                    <TextField
                      placeholder="Add a comment"
                      sx={{
                        fontSize: "10px",
                        backgroundColor: "#fff",
                        paddingLeft: 1,
                        paddingTop: 1,
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      variant="standard"
                      multiline
                      rows={2}
                      fullWidth
                    />
                    <LoadingButton
                      variant="contained"
                      loading={loading}
                      size="small"
                      onClick={handleCommentApi}
                      endIcon={<SendOutlinedIcon />}
                    >
                      Send
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Box>
            )}

            <Divider sx={{ mt: 1 }} />

            {comments.length > 0 ? renderComments() : renderNoCommentsView()}
            {/* Comments box */}
          </Box>
        </Box>
      </Box>
    );
  };
  const renderFailureView = () => {
    return <Box>Unable to view the blog</Box>;
  };

  const renderBlogDetails = () => {
    switch (apiStatus) {
      case "INITIAL":
        return renderLoading();
      case "SUCCESS":
        return renderBLogView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };
  return (
    <>
      <Header />
      <IconButton
        sx={{
          pl: 2,
          pt: 2,
          height: "12px",
          width: "12px",
        }}
        size="small"
        onClick={() => navigate("/")}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {renderBlogDetails()}
      <Footer />
    </>
  );
};

export default BlogView;
