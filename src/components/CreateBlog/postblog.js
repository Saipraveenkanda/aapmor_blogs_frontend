import {
  Box,
  Button,
  TextField,
  Stack,
  Input,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Typography,
  Grid,
  Fab,
  CircularProgress,
} from "@mui/material";
import { useState, React, useEffect } from "react";
import {
  createBlogApi,
  publishBlogApi,
  updateBlogApi,
  uploadThumbnail,
} from "../ApiCalls/apiCalls";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../HomePage/header";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ProfilePopup from "../HomePage/ProfilePopup";
import BottomNavbar from "../BottomNavigation/bottomNavigation";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["image", "video"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const CreateBlog = () => {
  const location = useLocation();
  const { editBlog, isEdit } = location.state || {};
  const savedBlogData = JSON.parse(localStorage.getItem("blogData"));
  const savedData =
    (savedBlogData !== null && savedBlogData) ||
    (editBlog !== undefined && editBlog);
  document.title = "Create New Blog";
  const [category, setCategory] = useState(
    savedData !== false ? savedData.category : ""
  );
  const [title, setTitle] = useState(
    savedData !== false ? savedData.title : ""
  );
  const [description, setDescription] = useState(
    savedData !== false ? savedData.description : ""
  );
  const [blogImage, setBlogImage] = useState(
    savedData !== false ? savedData.blogImage : ""
  );
  const [editorHtml, setEditorHtml] = useState(
    savedData !== false ? savedData.html : ""
  );
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);
  const name = Cookies.get("username");
  const role = Cookies.get("userrole");
  const handleSave = () => {
    const saveBlogData = {
      category,
      title,
      description,
      blogImage: blogImage,
      html: editorHtml,
    };
    if (title && description && blogImage && category && editorHtml) {
      setLoading(true);
      localStorage.setItem("blogData", JSON.stringify(saveBlogData));
      setLoading(false);
    }
  };
  const disablePublishButton =
    !!category &&
    !!title &&
    !!description &&
    !!blogImage &&
    !!editorHtml &&
    editorHtml !== "<p><br></p>";

  // useEffect(() => {
  //   if (name && role && disablePublishButton) {
  //     console.log("submitting by default");
  //     submitPost();
  //   }
  // }, [name, role]);

  const handleClose = () => {
    setProfile(false);
  };

  const navigate = useNavigate();
  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const newDate = new Date();
  const dateObject = `${newDate.getDate()} ${newDate.toLocaleString("default", {
    month: "short",
  })}, ${newDate.getFullYear()}`;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const response = await uploadThumbnail(formData);
    if (response) {
      setBlogImage(response.data.url);
    }
  };
  const submitPost = async () => {
    if (!name || !role) {
      setProfile(true);
    } else {
      setLoading(true);
      const blogDetails = {
        username: name,
        userrole: role,
        title,
        description,
        blogImage,
        category,
        date: newDate,
        likes: [],
        comments: [],
        htmlFile: editorHtml,
        savedUsers: [],
      };
      const updatedData = {
        _id: editBlog._id,
        title,
        description,
        blogImage,
        category,
        htmlFile: editorHtml,
      };
      console.log(blogDetails);
      const response = await (isEdit
        ? updateBlogApi(editBlog?._id, updatedData)
        : createBlogApi(blogDetails));
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        const data = !isEdit && (await response.json());
        var blogId = data?.message;
        navigate("/");
      }
      const content = {
        title,
        description,
        blogImage,
        dateObject,
        blogId,
        name,
        role,
        editorHtml,
      };
      !isEdit && (await publishBlogApi(content));
    }
  };

  const catoreries = [
    "Insights",
    "Fitness",
    "Artificial Intelligence",
    "Entertainment",
    "Politics",
    "International",
    "News",
    "Sports",
    "Fashion",
    "Food & Health",
    "Gaming",
    "Technology",
    "Arts",
    "Travel",
  ];

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          {/* pradeep  */}
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              margin: "20px 0px",
            }}
            container
          >
            <Grid item xs={12} md={7.7}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "grey" }}
              >
                TITLE<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                placeholder="Enter your blog title"
                onChange={(e) => setTitle(e.target.value)}
                sx={{ minWidth: { xs: "350px", sm: "500px", md: "600px" } }}
                variant="standard"
                required
                value={title}
              />
            </Grid>
            <Grid item xs={9} md={3} sx={{ paddingRight: "4px" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "grey" }}
              >
                Catogery<span style={{ color: "red" }}>*</span>
              </Typography>
              <Select
                value={category}
                label={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                size="small"
              >
                {catoreries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2} md={1.3}>
              <Tooltip title="Insert thumbnail image for your blog">
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{ textTransform: "none", marginTop: "20px" }}
                  required
                >
                  Upload<span style={{ color: "red" }}>*</span>
                  <Input
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleFileUpload}
                    id="imageFile"
                    sx={{ display: "none" }}
                  />
                  <label htmlFor="imageFile"></label>
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "grey" }}
            >
              Blog Description<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="standard"
              placeholder="Enter few lines about your blog"
              fullWidth
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid
            sx={{
              position: "fixed",
              bottom: "12%",
              right: "3%",
              zIndex: 2,
            }}
          >
            <Fab
              aria-label="add"
              // onClick={handleSave}
              // disabled={loading}
              disabled={true}
              size="small"
              sx={{ marginRight: "4px", background: "#5CB338" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <SaveIcon sx={{ color: "white" }} />
              )}
            </Fab>
            <Fab
              aria-label="add"
              onClick={() => {
                localStorage.removeItem("blogData");
                navigate("/");
              }}
              size="small"
              sx={{ marginRight: "4px", background: "#F93827" }}
            >
              <CloseIcon sx={{ color: "white" }} />
            </Fab>
            <Fab
              aria-label="publish"
              onClick={submitPost}
              disabled={!disablePublishButton}
              size="small"
              sx={{ marginRight: "4px", background: "#024CAA" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <SendIcon sx={{ color: "white" }} />
              )}
            </Fab>
          </Grid>
          {/* pradeep  */}

          {/* EDITOR BOX*/}
          {blogImage !== "" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                boxSizing: "border-box",
                backgroundColor: "#bfbfbf50",
                width: "300px",
                height: "200px",
                mt: 1,
                borderRadius: 2,
                // boxShadow: "0px 0px 10px 0px #00000050",
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={12}
              >
                <Typography variant="p" fontWeight={500}>
                  Your blog thumbnail
                </Typography>
                <Tooltip title="click to remove thumbnail" placement="right">
                  <IconButton onClick={() => setBlogImage("")}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <img
                src={blogImage}
                alt="thumbnail"
                style={{
                  width: "100%",
                  height: "80%",
                }}
              />
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              m: 2,
              alignSelf: "center",
            }}
          >
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={handleChange}
              modules={modules}
            />
          </Box>
        </Box>
      </Box>
      <ProfilePopup
        profile={profile}
        setProfile={setProfile}
        handleClose={handleClose}
      />
      <BottomNavbar />
    </>
  );
};
export default CreateBlog;
