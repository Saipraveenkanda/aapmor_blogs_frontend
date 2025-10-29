import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, {  useState } from "react";
import Header from "../HomePage/header";
import SmartButtonOutlinedIcon from "@mui/icons-material/SmartButtonOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import {
  createBlogApi,
  getSummaryOfBlog,
  publishBlogApi,
  updateBlogApi,
  uploadThumbnail,
} from "../../providers/blogProvider";
import { Catoreries } from "../../utilities/constants";
import QuillEditor from "./QuillEditor";
import { useLocation, useNavigate } from "react-router-dom";
import BlogPreview from "../BlogView/PreviewBlog";
import Cookies from "js-cookie";

const WriteBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { editBlog, isEdit } = location.state || {};

  const name = Cookies.get("username");
  const role = Cookies.get("userrole");

  const savedBlogData = JSON.parse(localStorage.getItem("blogData"));
  const savedData =
    (savedBlogData !== null && savedBlogData) ||
    (editBlog !== undefined && editBlog);

  const [formData, setFormData] = useState({
    title: savedData?.title || "",
    description: savedData?.description || "",
    category: savedData?.category || "",
    image: savedData?.blogImage || "",
    content: savedData?.html || "",
  });

  const [plainText, setPlainText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);

  const newDate = new Date();
  const dateObject = `${newDate.getDate()} ${newDate.toLocaleString("default", {
    month: "short",
  })}, ${newDate.getFullYear()}`;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = value;
    setPlainText(tempDiv.innerText);
  };

  const handleSummarize = async () => {
    setSummaryLoading(true);
    const payload = {
      text: plainText,
    };
    const response = await getSummaryOfBlog(payload);
    if (response) {
      setFormData((prev) => ({ ...prev, description: response.data.summary }));
      setSummaryLoading(false);
    }
    setSummaryLoading(false);
  };

  const handleFileUpload = async (e) => {
    setImageLoading(true);
    const file = e.target.files[0];
    const imageData = new FormData();
    imageData.append("image", file);
    const response = await uploadThumbnail(imageData);
    if (response) {
      setFormData((prev) => ({ ...prev, image: response.data.url }));
      setImageLoading(false);
    }
  };

  const handleSave = () => {
    const saveBlogData = {
      category: formData.category,
      title: formData.title,
      description: formData.description,
      blogImage: formData.image,
      html: formData.content,
    };
    setLoading(true);
    localStorage.setItem("blogData", JSON.stringify(saveBlogData));
    setLoading(false);
  };

  const submitPost = async () => {
    if (!name || !role) {
      setProfile(true);
    } else {
      setLoading(true);
      const blogDetails = {
        username: name,
        userrole: role,
        title: formData.title,
        description: formData.description,
        blogImage: formData.image,
        category: formData.category,
        date: newDate,
        likes: [],
        comments: [],
        htmlFile: formData.content,
        savedUsers: [],
      };
      const updatedData = {
        title: formData.title,
        description: formData.description,
        blogImage: formData.image,
        category: formData.category,
        html: formData.content,
      };
      const response = await (isEdit
        ? updateBlogApi(editBlog?._id, updatedData)
        : createBlogApi(blogDetails));
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        const data = !isEdit && response?.data?.message;
        var blogId = data;
        const content = {
          title: formData.title,
          description: formData.description,
          blogImage: formData.image,
          dateObject,
          blogId,
          name,
          role,
          editorHtml: formData.content,
        };
        !isEdit && (await publishBlogApi(content));
        navigate("/");
      }
      setLoading(false);
    }
  };

  const disablePublishButton =
    !!formData.title &&
    !!formData.description &&
    !!formData.category &&
    !!formData.image &&
    !!formData.content &&
    formData.content !== "<p><br></p>";

  return (
    <Grid
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header setProfileDetails={() => {}} />
      <Grid sx={{ width: "80%", marginTop: "20px" }}>
        <Grid
          xs={12}
          container
          sx={{
            border: "1px solid rgb(206, 205, 205)",
            padding: "20px",
          }}
        >
          <Grid xs={9} item>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "grey" }}
              >
                TITLE<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                placeholder="Enter your blog title"
                // sx={{ minWidth: { xs: "350px", sm: "500px", md: "600px" } }}
                variant="outlined"
                required
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  mb: 1,
                }}
              >
                {" "}
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "grey" }}
                >
                  Blog Description<span style={{ color: "red" }}>*</span>
                </Typography>
                <Button
                  size="small"
                  onClick={handleSummarize}
                  title="Summarize your blog"
                  variant="outlined"
                  disabled={summaryLoading}
                  sx={{
                    textTransform: "none",
                    border: "1px solid #016A70",
                    borderLeft: summaryLoading && "none",
                    color: "#016A70",
                    "&:hover": {
                      color: "#ffffff",
                      backgroundColor: "#016A7080",
                      border: "1px solid #016A70",
                    },
                  }}
                  endIcon={
                    <SmartButtonOutlinedIcon
                      fontSize="large"
                      sx={{ width: "30px", height: "30px" }}
                    />
                  }
                >
                  {summaryLoading ? (
                    <Box sx={{ width: "100px" }}>
                      <div class="dots"></div>
                    </Box>
                  ) : (
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      {/* <SmartButtonOutlinedIcon fontSize="large" /> */}
                      Summarize
                    </Typography>
                  )}
                </Button>
              </Box>
              <TextField
                disabled={summaryLoading}
                variant="outlined"
                placeholder="Enter few lines about your blog"
                fullWidth
                multiline
                rows={4}
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid xs={3} item sx={{ paddingLeft: "12px" }}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "grey" }}
              >
                Category<span style={{ color: "red" }}>*</span>
              </Typography>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                fullWidth
                size="small"
                displayEmpty
              >
                <MenuItem value="" disabled sx={{ color: "grey" }}>
                  Select Category
                </MenuItem>
                {Catoreries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Tooltip title="Insert thumbnail image for your blog">
                <Button
                  component="label"
                  fullWidth
                  variant="outlined"
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{
                    textTransform: "none",
                    marginTop: "12px",
                    border: "1px solid #016A70",
                    color: "#016A70",
                    "&:hover": {
                      color: "#ffffff",
                      backgroundColor: "#016A7080",
                      border: "1px solid #016A70",
                    },
                  }}
                  required
                >
                  Thumbnail <span style={{ color: "red" }}> *</span>
                  <Input
                    accept="image/*"
                    type="file"
                    onChange={handleFileUpload}
                    id="imageFile"
                    sx={{ display: "none" }}
                  />
                  <label htmlFor="imageFile"></label>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              {(formData.image !== "" || imageLoading) && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    backgroundColor: "#bfbfbf50",
                    width: "100%",
                    height: "180px",
                    mt: 1,
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "4px",
                    }}
                    spacing={1}
                  >
                    <Typography variant="p2" fontWeight={500}>
                      Blog thumbnail
                    </Typography>
                    <Tooltip
                      title="click to remove thumbnail"
                      placement="right"
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            image: "",
                          }))
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  {imageLoading ? (
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <img
                      src={formData.image}
                      alt="thumbnail"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderBottomRightRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      }}
                    />
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ mt: 2 }}>
          <QuillEditor
            content={formData.content}
            handleContentChange={handleContentChange}
          />
        </Grid>
        <Grid
          sx={{
            position: "fixed",
            bottom: "12%",
            right: "3%",
            zIndex: 101,
          }}
        >
          <Fab
            aria-label="add"
            onClick={handleSave}
            disabled={loading}
            size="small"
            sx={{ marginRight: "4px", background: "#5CB338" }}
          >
            <SaveIcon
              titleAccess="Save"
              sx={{ color: "white", "&:hover": { color: "#000" } }}
            />
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
            <CloseIcon
              titleAccess="Close"
              sx={{ color: "white", "&:hover": { color: "#000" } }}
            />
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
            ) : isEdit ? (
              <UpdateOutlinedIcon
                titleAccess="Update"
                sx={{ color: "white", "&:hover": { color: "#000" } }}
              />
            ) : (
              <SendIcon
                titleAccess="Publish"
                sx={{ color: "white", "&:hover": { color: "#000" } }}
              />
            )}
          </Fab>
          <BlogPreview htmlContent={formData.content} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WriteBlog;
