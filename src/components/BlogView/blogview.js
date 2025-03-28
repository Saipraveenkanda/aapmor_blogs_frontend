import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Popover,
  Snackbar,
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
  deleteBlogApi,
  likesApi,
  postWinnerDetails,
  profileCheckingApi,
  removeSaveBlogApi,
  saveBlogApi,
} from "../ApiCalls/apiCalls";
import Cookies from "js-cookie";
import { LoadingButton } from "@mui/lab";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import ProfilePopup from "../HomePage/ProfilePopup";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Slide from "@mui/material/Slide";
import DeletePopup from "./DeletePoup";
import blogAward from "../../assets/starlogo.png";
import BestBlogRibbon from "../Blog/BestBlogRibbon";
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
  const [userCreatedBlog, setUserCreatedBlog] = useState([]);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverid = open ? "simple-popover" : undefined;

  useEffect(() => {
    getUserDetail();
    getBlogItem();
    // eslint-disable-next-line
  }, []);

  const getUserDetail = async () => {
    const response = await profileCheckingApi();
    if (response) {
      setUserCreatedBlog(response?.data?.res?.createdBlogs);
      setIsAdmin(
        response?.data?.res?.admin ? response?.data?.res?.admin : false
      );
    }
  };

  const token = Cookies.get("jwtToken");
  const cookiesName = Cookies.get("username");
  const name = cookiesName !== undefined ? cookiesName : "U";
  const email = Cookies.get("userEmail");
  const dateObject = new Date();

  useEffect(() => {
    const liked = blogDetails?.likes?.some((like) => like.email === email);
    const likesCount = blogDetails?.likes?.length;
    setLiked(liked);
    setLikesCount(likesCount);
  }, [blogDetails]);

  useEffect(() => {
    if (comment.length >= 1) {
      setDisableCommentButton(false);
    } else {
      setDisableCommentButton(true);
    }
  }, [comment]);

  const handleCommentApi = async () => {
    const trimmedComment = comment.trim();
    if (trimmedComment === "") {
      setDisableCommentButton(true);
    } else {
      setLoading(true);
      const commentObject = { comment, id, name, dateObject };
      const response = await commentsApi(commentObject);
      if (response.status === 200) {
        setLoading(false);
        getBlogItem();
      }
      setComment("");
    }
  };

  const handleEdit = () => {
    localStorage.removeItem("blogData");
    navigate("/createblog", { state: { editBlog: blogDetails, isEdit: true } });
  };

  const handleDelete = async () => {
    const response = await deleteBlogApi(id);
    if (response.status === 200) {
      navigate("/");
    }
    if (response.status === 404) {
      <Alert>Blog not found</Alert>;
    }
  };

  const handleLikes = async () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prevCount) => prevCount + 1);
    } else {
      setLiked(false);
      setLikesCount((prevCount) => prevCount - 1);
    }
    const name = cookiesName;
    if (!name) {
      setProfile(true);
    } else {
      const response = await likesApi(id, name);
      if (response.status === 200) {
        getBlogItem();
      }
    }
  };

  const getBlogItem = async () => {
    const response = await axios.get(`${host}/blogs/${id}`);
    if (response) {
      setApiStatus("SUCCESS");
      if (response.status === 200) {
        const blogDetails = await response.data;
        setBlogDetails(blogDetails);
      } else {
        setApiStatus("FAILURE");
      }
    }
    if (response.status === 500) {
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
    isBestBlog,
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
    return htmlContent?.replace(/<img/g, '<img class="quill-blog-image"');
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

  const handleSubmit = async () => {
    const previousMonth = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(new Date(new Date().setMonth(new Date().getMonth() - 1)));

    const formData = {
      winnerName: username,
      blogTitle: title,
      blogLink: window.location.href,
      month: previousMonth,
      blogId: _id,
    };
    try {
      const response = await postWinnerDetails(formData);
      if (response?.response?.data?.error) {
        setSnackMessage(response?.response?.data?.error);
        setOpenSnackBar(true);
      }
      if (!response.status === 201) {
        throw new Error("Failed to save winner");
      } else if (response.status === 201) {
        setSnackMessage("Winner has been set successfully!");
        setOpenSnackBar(true);
        getBlogItem();
      }
    } catch (error) {
      alert("Error: " + error.message);
      setSnackMessage(error.message);
      setOpenSnackBar(true);
    }
  };

  //RENDERING BLOG VIEW
  const renderBLogView = () => {
    document.title = `Blog: ${title}`;
    const saved = savedUsers?.includes(email) ? true : false;
    // const liked = likes?.some((like) => like.email === email);
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
                      <BookmarkAddedIcon sx={{ color: "#016A70" }} />
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
            {/* EDIT ICON */}
            {token !== undefined &&
              userCreatedBlog?.includes(blogDetails?._id) && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ModeEditOutlinedIcon fontSize="small" />}
                  sx={{
                    textTransform: "none",
                    borderColor: "#016A70",
                    color: "#016A70",
                    fontWeight: "bold",
                    "&:hover": { borderColor: "#016A70" },
                  }}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              )}
            {/* DELETE ICON */}
            {token !== undefined &&
              userCreatedBlog?.includes(blogDetails?._id) && (
                <IconButton
                  title="Delete Blog"
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderColor: "#016A70",
                    color: "#016A70",
                    fontWeight: "bold",
                    "&:hover": { borderColor: "#016A70" },
                  }}
                  onClick={() => setOpenDeletePopup(true)}
                >
                  <DeleteOutlineOutlinedIcon fontSize="medium" />
                </IconButton>
              )}
            {/* AWARD IMAGE */}
            {isBestBlog && <BestBlogRibbon />}
            {/* WINNER ANNOUNCEMENT BUTTON */}
            {token !== undefined && isAdmin && !isBestBlog && (
              <Button
                variant="outlined"
                color="inherit"
                disableElevation
                onClick={handleSubmit}
                sx={{
                  textTransform: "none",
                  borderRadius: 4,
                  position: "fixed",
                  top: "80px",
                  right: "40px",
                }}
              >
                Announce Winner
              </Button>
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
            {token && (
              <Stack direction={"column"} alignItems={"center"}>
                <IconButton
                  onClick={handleLikes}
                  sx={{ marginTop: 0, padding: 0 }}
                >
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
                  {likesCount}{" "}
                </Typography>
              </Stack>
            )}
            <Stack direction={"column"} alignItems={"center"} mt={2}>
              <InsertCommentOutlinedIcon />
              <Typography>{comments?.length} </Typography>
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
                      variant="outlined"
                      multiline
                      rows={1}
                      maxRows={1}
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

            {comments?.length > 0 ? renderComments() : renderNoCommentsView()}
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
            border: "0.5px solid #016A70",
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      <DeletePopup
        open={openDeletePopup}
        setOpen={setOpenDeletePopup}
        handleDelete={handleDelete}
      />
      <Footer />
    </>
  );
};

export default BlogView;
