import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../HomePage/header";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
// import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Footer from "../HomePage/footer";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import "./style.css";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import {
  commentsApi,
  likesApi,
  removeSaveBlogApi,
  saveBlogApi,
} from "../ApiCalls/apiCalls";
import Cookies from "js-cookie";
import { LoadingButton } from "@mui/lab";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import ProfilePopup from "../HomePage/ProfilePopup";

const host = process.env.REACT_APP_API_URL;

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
  const [disableCommentButton, setDisableCommentButton] = useState(true);
  const [profile, setProfile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverid = open ? "simple-popover" : undefined;
  console.log(open, "OPEN");

  useEffect(() => {
    getBlogItem();
    // eslint-disable-next-line
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

  useEffect(() => {
    if (comment.length >= 1) {
      setDisableCommentButton(false);
    } else {
      setDisableCommentButton(true);
    }
  }, [comment]);

  const handleCommentApi = async () => {
    if (comment === "") {
      setDisableCommentButton(true);
    } else {
      setLoading(true);
      const commentObject = { comment, id, name, dateObject };
      const response = await commentsApi(commentObject);
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        getBlogItem();
      }
      setComment("");
    }
  };

  const handleLikes = async () => {
    const name = cookiesName;
    if (!name) {
      setProfile(true);
    } else {
      const response = await likesApi(id, name);
      console.log(response);
      if (response.status === 200) {
        getBlogItem();
      }
    }
  };

  const getBlogItem = async () => {
    const response = await axios.get(`${host}/blogs/${id}`);
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
  const handleClose = () => {
    setProfile(false);
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

  const addImageClass = (htmlContent) => {
    return htmlContent.replace(/<img/g, '<img class="quill-blog-image"');
  };

  const createMarkup = (content) => {
    return { __html: addImageClass(content) };
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
    const liked = likes.some((like) => like.email === email);
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
            justifyContent: "center",
            alignItems: "flex-start",
            // padding: { md: 4, xs: "16px" },
            // padding:"24px",
            // paddingTop: 0,
            // ml: { md: 8, xs: 0 },
            maxWidth: { md: "100%", xs: "100%", sm: "90%" },
            boxSizing: "border-box",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 1, pb: 1, alignItems: "center" }}>
            <Avatar
              sx={{
                backgroundColor: "#016A7050",
                width: 30,
                height: 30,
                border: `2px solid #016A70`,
                backdropFilter: "blur(40px)",
              }}
            >
              <Typography color={"#016A70"}>
                {username ? username?.split("")[0] : "U"}
              </Typography>
            </Avatar>
            <Stack direction={"column"} spacing={0}>
              <Typography variant="p">{username}</Typography>
              <Stack direction={"row"} spacing={2}>
                <Typography variant="caption" color={"darkgray"}>
                  Created on {formattedDate}
                </Typography>
              </Stack>
            </Stack>
            <Chip
              label={category}
              // size="medium"
              sx={{
                // fontSize: "12px",
                color: "#ffffff",
                // padding: 1,
                backgroundColor: "#016A70",
                // mb: 2,
              }}
            />

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
          <Typography
            variant="h5"
            fontWeight={"bold"}
            fontFamily={"Source sans pro"}
          >
            {title}
          </Typography>
          <Divider orientation="horizontal" flexItem />

          {/* HTML FILE */}

          <Box
            dangerouslySetInnerHTML={createMarkup(html)}
            sx={{
              width: { md: "80%", xs: "100%", sm: "90%" },
              // alignSelf: { md: "center", xs: "flex-start" },
            }}
          ></Box>

          <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} />

          {/* Comments and likes*/}
          <Stack direction={"row"} spacing={4} mt={2}>
            <Stack direction={"column"} alignItems={"center"}>
              <IconButton
                onClick={handleLikes}
                sx={{ marginTop: 0, padding: 0 }}
              >
                {/* <ThumbUpOutlinedIcon /> */}
                {/* <FontAwesomeIcon icon={faHandsClapping} /> */}
                {liked ? (
                  <ThumbUpAltIcon sx={{ color: "#016A70" }} />
                ) : (
                  <ThumbUpOffAltIcon />
                )}
              </IconButton>
              <Typography
                sx={{
                  cursor: "pointer",
                }}
                onClick={(e) => handleClick(e)}
              >
                {likes?.length}{" "}
              </Typography>
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
            // paddingLeft: 4,
            // ml: { md: 8, xs: 0 },
            backgroundColor: "#fff",
            width: { md: "70%", xs: "90%", sm: "90%" },
          }}
        >
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography fontFamily={"Source sans pro"} variant="h6">
              Comments
            </Typography>
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
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  sx={{}}
                >
                  {/* <Avatar>{name[0].toUpperCase()}</Avatar> */}
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
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
                      // size="small"
                      disabled={disableCommentButton}
                      onClick={handleCommentApi}
                      // endIcon={}
                      sx={{
                        height: "40px",
                        // borderRadius: "50%",
                        backgroundColor: "#016A70",
                        "&:hover": {
                          backgroundColor: "#016A70",
                        },
                      }}
                    >
                      {/* <SendOutlinedIcon /> */}
                      <PaperPlaneTilt size={30} />
                      {/* Send */}
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Box>
            )}

            {/* <Divider sx={{ mt: 1 }} /> */}

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
      <Grid container sx={{ flexDirection: "row", p: 3 }} xs={12}>
        <Grid item xs={0.4}>
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // mt: 1,
              // ml: 1,
              position: "sticky",
              top: "10%",
            }}
            // size="medium"
            title="Go back"
            onClick={() => navigate("/")}
          >
            <ArrowBackIosIcon fontSize="medium" />
          </IconButton>
        </Grid>
        <Grid xs={11.6} item>
          {renderBlogDetails()}
        </Grid>
      </Grid>
      <ProfilePopup
        profile={profile}
        setProfile={setProfile}
        handleClose={handleClose}
      />
      <Popover
        id={popoverid}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ borderRadius: 4 }}
      >
        <Stack direction={"column"} alignItems={"flex-start"} spacing={1}>
          {likes?.length > 0 ? (
            likes?.map((eachUser) => {
              return (
                <Stack direction={"row"} spacing={1.5} sx={{ p: 1 }}>
                  <PersonOutlineTwoToneIcon sx={{ color: "#016A70" }} />
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
      <Footer />
    </>
  );
};

export default BlogView;
