import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  IconButton,
  Paper,
  Popover,
  Popper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../HomePage/header";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Footer from "../HomePage/footer";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./style.css";
import Cookies from "js-cookie";
import { LoadingButton } from "@mui/lab";
import { LinkedinLogo, PaperPlaneTilt } from "@phosphor-icons/react";
import ProfilePopup from "../HomePage/ProfilePopup";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeletePopup from "./DeletePoup";
import BestBlogRibbon from "../Blog/BestBlogRibbon";
import AboutAuthor from "./AboutAuthor";
import CommentSection from "./CommentSection";
import BlogNotFound from "./NoBlogComponent";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import SendIcon from "@mui/icons-material/Send";
import {
  commentLikeService,
  commentReplyService,
  commentsApi,
  deleteBlogApi,
  getAuthorDetailsService,
  getBlogViewApi,
  removeSaveBlogApi,
  saveBlogApi,
  likesApi,
} from "../../providers/blogProvider";
import {
  unpublishBlogToWeb,
  publishBlogToWeb,
  postWinnerDetails,
} from "../../providers/adminProvider";
import { profileCheckingApi } from "../../providers/userProvider";
import { getUserFromToken, token } from "../../utilities/authUtils";

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
  const [userCreatedBlog, setUserCreatedBlog] = useState([]);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authorDetails, setAuthorDetails] = useState("");
  // const [comments, setComments] = useState([]);
  const [openSharePop, setOpenSharePop] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [copied, setCopied] = useState(false);
  const [isWinnerAnnounced, setIsWinnerAnnounced] = useState(false);

  const shareText = encodeURIComponent(
    `${blogDetails?.title}\nRead more: "https://blogs.aapmor.com/blogs/${blogDetails?._id}`
  );
  const whatsappUrl = `https://wa.me/?text=${shareText}`;
  const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareText}`;
  useEffect(() => {
    getUserDetail();
    getBlogItem();
    // eslint-disable-next-line
  }, []);

  const handleShareButton = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenSharePop(true);
  };

  const getUserDetail = async () => {
    const response = await profileCheckingApi();
    if (response) {
      setUserCreatedBlog(response?.data?.res?.createdBlogs);
      setIsAdmin(
        response?.data?.res?.admin ? response?.data?.res?.admin : false
      );
    }
  };

  // console.log(getUserFromToken(), "USER FROM TOKEN");
  const { name, email } = getUserFromToken();
  // const name = Cookies.get("name");
  // const email = Cookies.get("email");
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

  useEffect(() => {
    authorId !== "" && getAuthorDetails();
  }, [authorId]);

  const getAuthorDetails = async () => {
    const response = await getAuthorDetailsService(authorId);
    if (response) {
      setAuthorDetails(response.data);
    }
  };

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
    try {
      const response = await getBlogViewApi(id);
      if (response) {
        setApiStatus("SUCCESS");
        if (response.status === 200) {
          const blogDetails = await response.data;
          setBlogDetails(blogDetails);
          setAuthorId(blogDetails?.email);
        } else {
          setApiStatus("FAILURE");
        }
      }
    } catch (error) {
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
    publishedToWeb,
    blogImage,
  } = blogDetails;

  const renderLoading = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 156px)",
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

  const handleLike = async (index) => {
    const response = await commentLikeService(_id, index);
    console.log(response, "LIKING COMMENT");
    if (response) {
      getBlogItem();
    }
  };

  const handleReply = async (commentIndex, replyText) => {
    const response = await commentReplyService(
      _id,
      commentIndex,
      replyText,
      name
    );
    console.log(response, "REPLYING COMMENT");
    if (response) {
      // setComments((prevComments) =>
      //   prevComments.map((c) =>
      //     c._id === commentId ? { ...c, replies: response.data.replies } : c
      //   )
      // );
      getBlogItem();
    }
  };

  const renderComments = () => {
    return (
      // <Stack direction={"column"} spacing={0}>
      //   {comments.map((eachComment) => {
      //     const { comment, name, dateObject } = eachComment;
      //     const time = getTimeAgo(dateObject);
      //     return (
      //       <>
      //         <Stack
      //           key={eachComment._id}
      //           direction={"row"}
      //           spacing={2}
      //           sx={{
      //             padding: 1,
      //             boxSizing: "border-box",
      //           }}
      //         >
      //           <Avatar>{name[0].toUpperCase()}</Avatar>
      //           <Stack direction={"column"} spacing={1}>
      //             <Typography variant="inherit" color={"#000"} fontWeight={600}>
      //               {name}{" "}
      //               <text style={{ color: "grey", fontSize: "10px" }}>
      //                 {"\u25CF"}
      //               </text>
      //               <span
      //                 style={{
      //                   fontWeight: "lighter",
      //                   color: "lightslategray",
      //                   fontSize: "12px",
      //                 }}
      //               >
      //                 {" "}
      //                 {time}
      //               </span>
      //             </Typography>

      //             <Typography variant="body2">{comment}</Typography>
      //           </Stack>
      //         </Stack>
      //         <Divider orientation="horizontal" flexItem />
      //       </>
      //     );
      //   })}
      // </Stack>
      <CommentSection
        comments={comments}
        handleLike={handleLike}
        handleReply={handleReply}
        getTimeAgo={getTimeAgo}
        user={email}
      />
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
      blogImage,
    };
    try {
      if (!isWinnerAnnounced) {
        const response = await postWinnerDetails(formData);
        if (response?.response?.data?.error) {
          setSnackMessage(response?.response?.data?.error);
          setOpenSnackBar(true);
          return;
        }
        if (response.status === 201) {
          setSnackMessage("Winner has been set successfully!");
          setOpenSnackBar(true);
          setIsWinnerAnnounced(true);
          setBlogDetails((prev) => ({ ...prev, isBestBlog: true }));
        }
      } else {
        setIsWinnerAnnounced(false);
        setSnackMessage("Winner status reverted!");
        setOpenSnackBar(true);
        setBlogDetails((prev) => ({ ...prev, isBestBlog: false }));
      }
    } catch (error) {
      alert("Error: " + error.message);
      setSnackMessage(error.message);
      setOpenSnackBar(true);
    }
  };

  useEffect(() => {
    if (blogDetails && blogDetails.isBestBlog) {
      setIsWinnerAnnounced(true);
    } else {
      setIsWinnerAnnounced(false);
    }
  }, [blogDetails]);

  const handlePublish = async () => {
    const payload = {
      title: blogDetails?.title,
      description: blogDetails?.description,
      category: blogDetails?.category,
      blogImage: blogDetails?.blogImage,
      username: blogDetails?.username,
      userrole: blogDetails?.userrole,
      date: blogDetails?.date,
      likes: blogDetails?.likes,
      comments: blogDetails?.comments,
      email: blogDetails?.email,
      blogId: blogDetails?._id,
    };
    const response = publishedToWeb
      ? await unpublishBlogToWeb(blogDetails?._id)
      : await publishBlogToWeb(payload);
    console.log(payload, response, "PUBLISHING BLOG");
    if (response.status === 200) {
      setSnackMessage("Blog published to website");
      setOpenSnackBar(true);
      getBlogItem();
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
              src={authorDetails?.image}
              sx={(theme) => ({
                backgroundColor: "accent.main",
                width: 40,
                height: 40,
                border: `2px solid ${theme.palette.accent.main}`,
                backdropFilter: "blur(40px)",
              })}
            >
              <Typography color={"text.primary"}>
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
              sx={{
                color: "#ffffff",
                backgroundColor: "accent.main",
              }}
            />

            {/* SAVE OR UNSAVE ICON */}

            {token !== undefined && (
              <>
                {saved ? (
                  <Tooltip title="Remove from saved blogs">
                    <IconButton onClick={handleBlogUnsave}>
                      <BookmarkAddedIcon sx={{ color: "accent.main" }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add to saved blogs">
                    <IconButton onClick={handleBlogSave}>
                      <BookmarkAddOutlinedIcon sx={{ color: "accent.main" }} />
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
                    borderColor: "accent.main",
                    color: "text.primary",
                    fontWeight: "bold",
                    "&:hover": { borderColor: "accent.main" },
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
                  onClick={() => setOpenDeletePopup(true)}
                >
                  <DeleteOutlineOutlinedIcon
                    fontSize="medium"
                    sx={{
                      color: "accent.main",
                    }}
                  />
                </IconButton>
              )}
            {/* AWARD IMAGE */}
            {isBestBlog && <BestBlogRibbon />}
            {/* WINNER ANNOUNCEMENT BUTTON */}
            {token !== undefined && isAdmin && (
              <Button
                size="medium"
                variant="outlined"
                color="inherit"
                disableElevation
                onClick={handleSubmit}
                sx={(theme) => ({
                  borderRadius: 4,
                  border: `0.5px solid ${theme.palette.accent.main}`,
                  textTransform: "none",
                  color: "text.primary",
                  position: "absolute",
                  backgroundColor: "accent.main",
                  right: "40px",
                  fontWeight: "bold",
                })}
              >
                {isWinnerAnnounced ? "Revert Winner" : "Announce Winner"}
              </Button>
            )}
            {token !== undefined && isAdmin && (
              <Button
                size="medium"
                variant="outlined"
                color="inherit"
                disableElevation
                onClick={handlePublish}
                sx={(theme) => ({
                  borderRadius: 4,
                  border: `0.5px solid ${theme.palette.accent.main}`,
                  textTransform: "none",
                  color: "text.primary",
                  fontWeight: "bold",
                  position: "absolute",
                  backgroundColor: "accent.main",
                  right: "220px",
                })}
              >
                {publishedToWeb ? "Unpublish " : "Publish to website"}
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

          {/* AUTHOR SECTION */}
          {authorDetails && <AboutAuthor author={authorDetails} />}

          <Divider orientation="horizontal" flexItem sx={{ mt: 3 }} />

          {/* Comments and likes*/}
          <Stack direction={"row"} spacing={4} mt={2}>
            {token && (
              <Stack direction={"row"} alignItems={"center"} spacing={4}>
                <div class="media-object">
                  <Button
                    variant="standard"
                    disableFocusRipple
                    disableRipple
                    onClick={handleLikes}
                    sx={{
                      marginTop: 0,
                      padding: "8px 16px",
                      gap: 1,
                      textTransform: "none",
                      position: "relative",
                      border: "none",
                      "&:hover": {
                        backgroundColor: "unset",
                      },
                    }}
                  >
                    {liked ? (
                      <ThumbUpAltIcon sx={{ color: "accent.main" }} />
                    ) : (
                      <ThumbUpOffAltIcon />
                    )}
                    {liked ? (
                      <Typography>Liked</Typography>
                    ) : (
                      <Typography>Like</Typography>
                    )}
                  </Button>
                </div>
                <Divider flexItem sx={{ border: "1px solid #ffffff" }} />
              </Stack>
            )}
            <Stack direction={"row"} alignItems={"center"} mt={2} spacing={1}>
              <InsertCommentOutlinedIcon fontSize="small" />
              <Typography>{comments?.length} Comments </Typography>
            </Stack>
            <Divider sx={{ border: "1px solid #ffffff" }} />
            <div className="media-object">
              <Button
                // onClick={() => window.open(whatsappUrl, "_blank")}
                onClick={(event) => handleShareButton(event)}
                sx={{
                  // padding: "10px 15px",
                  // backgroundColor: "#25D366",
                  // color: "white",
                  // border: "none",
                  // borderRadius: "5px",
                  // cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "unset",
                  },
                  color: "text.primary",
                  textTransform: "none",
                  gap: 1,
                }}
              >
                {/* sx={{ color: "#25D366" }} */}
                <ShareOutlinedIcon fontSize="small" />
                <Typography>Share</Typography>
              </Button>
            </div>
          </Stack>
        </Box>

        {/* Comments view */}

        <Box
          sx={{
            // paddingLeft: 4,
            // ml: { md: 8, xs: 0 },
            backgroundColor: "background.default",
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
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient
                        id="starGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#FE8B76" />
                        <stop offset="100%" stopColor="#6360BE" />
                      </linearGradient>
                    </defs>
                  </svg>
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
                        backgroundColor: "background.default",
                        p: 1,
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      variant="outlined"
                      multiline
                      rows={2}
                      maxRows={2}
                      fullWidth
                    />
                    <LoadingButton
                      variant="contained"
                      loading={loading}
                      disabled={disableCommentButton}
                      onClick={handleCommentApi}
                      disableElevation
                      sx={{
                        width: "30px",
                        backgroundColor: "transparent",
                        height: "40px",
                        "&.Mui-disabled": {
                          backgroundColor: "transparent",
                          color: "white",
                        },
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <SendIcon
                        fontSize="large"
                        className="winner-icon gradient-icon"
                        style={{
                          fill: disableCommentButton
                            ? "grey"
                            : "url(#starGradient)",
                        }}
                      />
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
    return <BlogNotFound />;
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
      {/* SHARE POPUP */}
      <Popover
        open={openSharePop}
        anchorEl={anchorEl}
        onClose={() => setOpenSharePop(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{ borderRadius: 4 }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          sx={(theme) => ({
            p: 2,
            width: "25vw",
            borderRadius: 2,
            // border: `0.5px solid ${theme.palette.accent.main}`,
          })}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              // textAlign: "center",
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ShareOutlinedIcon fontSize="large" sx={{ color: "accent.main" }} />
            Share this blog!
          </Typography>
          <Typography /* textAlign={"center"} */>
            Good reads spark better convos.
            {/* <br /> */} Share it with your squad!
          </Typography>
          <Stack>
            <Typography variant="body2" fontWeight={"bold"} gutterBottom>
              Share the link
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ backgroundColor: "background.default", borderRadius: 2 }}
            >
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
                value={window.location.href}
                aria-readonly
              />
              <Button
                onClick={() =>
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000); // Hide after 2 sec
                    })
                }
              >
                <ContentCopyOutlinedIcon />
              </Button>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="body2" fontWeight={"bold"} gutterBottom>
              Share to
            </Typography>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Stack direction={"column"} alignItems={"center"} spacing={0}>
                <IconButton
                  sx={{
                    backgroundColor: "#25D366",
                    "&:hover": {
                      color: "#ffffff",
                      bgcolor: "#25D366",
                    },
                  }}
                  onClick={() => window.open(whatsappUrl, "_blank")}
                >
                  <WhatsAppIcon sx={{ color: "#ffffff" }} />
                </IconButton>
                <Typography fontSize={"12px"}>WhatsApp</Typography>
              </Stack>
              <Stack direction={"column"} alignItems={"center"} spacing={0}>
                <IconButton
                  sx={{
                    backgroundColor: "#0077B5",
                    "&:hover": {
                      color: "#ffffff",
                      bgcolor: "#0077B5",
                    },
                  }}
                  onClick={() => window.open(linkedInUrl, "_blank")}
                >
                  <LinkedinLogo size={24} color="#ffffff" />
                </IconButton>
                <Typography fontSize={"12px"}>LinkedIn</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Popover>
      <Snackbar
        open={copied}
        message="Link copied!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <Footer />
    </>
  );
};

export default BlogView;
