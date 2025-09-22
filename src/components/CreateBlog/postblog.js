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
  Skeleton,
  FormControl,
  FormControlLabel,
  InputLabel,
  Popover,
  Avatar,
  Modal,
} from "@mui/material";
import { useState, React, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../HomePage/header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./loader.css";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ProfilePopup from "../HomePage/ProfilePopup";
import BottomNavbar from "../BottomNavigation/bottomNavigation";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import SmartButtonOutlinedIcon from "@mui/icons-material/SmartButtonOutlined";
import { useRef } from "react";
import ImageResize from "quill-image-resize-module-react";
import ClearIcon from "@mui/icons-material/Clear";

import {
  uploadThumbnail,
  createBlogApi,
  getSummaryOfBlog,
  publishBlogApi,
  updateBlogApi,
} from "../../providers/blogProvider";
import BlogPreview from "../BlogView/PreviewBlog";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

ReactQuill.Quill.register("modules/imageResize", ImageResize);

const Size = ReactQuill.Quill.import("attributors/style/size");
Size.whitelist = ["12px", "14px", "16px", "18px", "24px"]; // Custom font sizes
ReactQuill.Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ size: Size.whitelist }], // Numeric font size dropdown
    ["bold", "italic", "underline", "strike", "blockquote"], // Basic formatting
    [{ script: "sub" }, { script: "super" }], // Superscript & subscript
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ], // Lists & indentation
    [{ align: [] }], // Text alignment
    [{ color: [] }, { background: [] }], // Text & background color
    ["image", "video"], // Media support
  ],
  clipboard: {
    matchVisual: true,
  },
  imageResize: {
    parchment: ReactQuill.Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

const CreateBlog = () => {
  const quillRef = useRef(null);
  const location = useLocation();
  const { editBlog, isEdit, profileDetails } = location.state || {};
  console.log(profileDetails, "STATE");

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
  const [scrollPos, setScrollPos] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const name = Cookies.get("username");
  const role = Cookies.get("userrole");
  const [plainText, setPlainText] = useState("");
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  // const [tempImage, setTempImage] = useState("");
  const handleImageClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const openImage = Boolean(anchorEl);
  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    document.querySelectorAll(".ql-toolbar button").forEach((button) => {
      const format = button.classList[0]?.replace("ql-", "");
      if (format) {
        button.setAttribute(
          "data-tooltip",
          format.charAt(0).toUpperCase() + format.slice(1)
        );
      }
    });
  }, []);

  const handleSave = () => {
    const saveBlogData = {
      category,
      title,
      description,
      blogImage: blogImage,
      html: editorHtml,
    };
    setLoading(true);
    localStorage.setItem("blogData", JSON.stringify(saveBlogData));
    setLoading(false);
  };
  const disablePublishButton =
    !!category &&
    !!title &&
    !!description &&
    !!blogImage &&
    !!editorHtml &&
    editorHtml !== "<p><br></p>";

  const handleClose = () => {
    setProfile(false);
  };

  const handleChange = (html) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const scrollPos = quill.root.scrollTop;
    setEditorHtml(html);

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    setPlainText(tempDiv.innerText);

    setTimeout(() => {
      if (quill) {
        quill.root.scrollTop = scrollPos;
      }
    }, 0);
  };

  const newDate = new Date();
  const dateObject = `${newDate.getDate()} ${newDate.toLocaleString("default", {
    month: "short",
  })}, ${newDate.getFullYear()}`;

  const handleFileUpload = async (e) => {
    setImageLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const response = await uploadThumbnail(formData);
    if (response) {
      setBlogImage(response.data.url);
      setImageLoading(false);
    }
  };

  const submitPost = async () => {
    if (!profileDetails?.name) {
      setProfile(true);
    } else {
      setLoading(true);
      const blogDetails = {
        username: profileDetails?.name,
        userrole: profileDetails?.designation,
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
        title,
        description,
        blogImage,
        category,
        html: editorHtml,
      };
      console.log(blogDetails);
      const response = await (isEdit
        ? updateBlogApi(editBlog?._id, updatedData)
        : createBlogApi(blogDetails));
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        const data = !isEdit && response?.data?.message;
        var blogId = data;
        const content = {
          title,
          description,
          blogImage,
          dateObject,
          blogId,
          name: profileDetails?.name,
          role: profileDetails?.designation,
          editorHtml,
        };
        !isEdit && (await publishBlogApi(content));
        navigate("/");
      }
      setLoading(false);
    }
  };

  const catoreries = [
    "Technology",
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
    "Arts",
    "Travel",
  ];

  const handleSummarize = async () => {
    setSummaryLoading(true);
    const payload = {
      text: plainText,
    };
    const response = await getSummaryOfBlog(payload);
    if (response) {
      setDescription(response.data.summary);
      setSummaryLoading(false);
    }
    setSummaryLoading(false);
  };

  const UploadContainer = () => {
    return (
      <Box
        sx={{
          // width: 240,
          height: 100,
          border: "2px dashed #ccc",
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          "&:hover": { borderColor: "#1976d2" }, // highlight on hover
        }}
      >
        {!blogImage ? (
          <label
            htmlFor="file-upload"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#888",
              cursor: "pointer",
            }}
          >
            <Typography variant="body2" textAlign={"center"}>
              Click to Upload Thumbnail <span style={{ color: "red" }}>*</span>{" "}
            </Typography>
            <InsertPhotoOutlinedIcon />
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </label>
        ) : (
          <>
            <Box
              component="img"
              src={blogImage}
              alt="Uploaded"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onClick={handleHover}
            />
            <IconButton
              size="small"
              onClick={() => setBlogImage("")}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.8)",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Typography
              sx={{
                position: "absolute",
                textAlign: "center",
                color: "#ffffff",
                fontWeight: "bold",
              }}
              variant="caption"
            >
              Click to view full size
            </Typography>
          </>
        )}
      </Box>
    );
  };

  return (
    <>
      <Header setProfileDetails={() => {}} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <IconButton
          sx={{ position: "fixed", top: "80px", left: "5%" }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              margin: "20px 0px",
            }}
            container
            spacing={1}
          >
            <Grid item xs={12} md={8}>
              <TextField
                size="small"
                label={"Title"}
                placeholder="Enter your blog title"
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                required
                fullWidth
                value={title}
              />
            </Grid>
            {/* category */}
            <Grid item xs={9} md={4} sx={{ paddingRight: "4px" }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Category *</InputLabel>
                <Select
                  required
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                  size="small"
                  displayEmpty
                >
                  {catoreries.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* blog description */}
            <Grid item xs={12} md={10} mt={1}>
              <TextField
                label="Blog Description"
                disabled={summaryLoading}
                variant="outlined"
                placeholder="Enter few lines about your blog"
                fullWidth
                multiline
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            {/* thumbnail  */}
            <Grid item xs={12} md={2} mt={1}>
              <UploadContainer />
            </Grid>
            {/* Summarize button */}
            <Grid item xs={12} md={2}>
              <Button
                size="small"
                onClick={handleSummarize}
                title="Summarize your blog"
                variant="outlined"
                disabled={summaryLoading}
                sx={{
                  textTransform: "none",
                }}
                endIcon={
                  <SmartButtonOutlinedIcon
                    fontSize="large"
                    sx={{ width: "30px", height: "30px" }}
                  />
                }
              >
                {summaryLoading ? (
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Please Wait
                  </Typography>
                ) : (
                  <Typography sx={{ display: "flex", alignItems: "center" }}>
                    Summarize
                  </Typography>
                )}
              </Button>
            </Grid>
            {/* Preview Button */}
            <Grid sx={{ position: "sticky", top: "70px" }}>
              <Button
                title="Preview your blog before posting"
                onClick={() => setShowPreview(!showPreview)}
                sx={{
                  textTransform: "none",
                }}
                variant="outlined"
                endIcon={
                  showPreview ? (
                    <EditOutlinedIcon />
                  ) : (
                    <VisibilityIcon fontSize="small" color="warning" />
                  )
                }
              >
                {showPreview ? "Edit" : "Preview"}
              </Button>
            </Grid>
          </Grid>

          {/* floating buttons  */}
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
          </Grid>

          {/* Preview or Edit Blog */}
          <Box
            sx={{
              width: "100%",
              m: 2,
              alignSelf: "center",
            }}
          >
            {showPreview ? (
              <BlogPreview
                htmlContent={editorHtml}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
              />
            ) : (
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={editorHtml}
                onChange={handleChange}
                modules={modules}
              />
            )}
          </Box>
        </Box>
      </Box>
      <style>
        {`
        .ql-toolbar {
          position: sticky !important;
          top: 64px;
          background: #F2F2F2;
          z-index: 100;
          border-bottom: 1px solid #ccc;
        }
        .ql-toolbar {
          position: relative; 
        }

        .ql-toolbar button,
        .ql-toolbar .ql-picker-label {
          font-size: 18px !important; /* Increase toolbar icon size */
          position: relative; /* Make sure tooltips are positioned relative to buttons */
        }

        .ql-toolbar button:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 12px;
          padding: 5px 8px;
          border-radius: 4px;
          top: -35px; /* Move tooltip above button */
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          z-index: 10;
          opacity: 1;
          visibility: visible;
        }

        .ql-toolbar button::after {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease-in-out;
        }
        .ql-toolbar .ql-size .ql-picker-label::before, 
        .ql-toolbar .ql-size .ql-picker-item::before {
          content: attr(data-value) !important; /* Display actual font size */
        }
      `}
      </style>

      {/* Preview Image */}
      <Modal
        open={openImage}
        // anchorEl={anchorEl}
        onClose={handleImageClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        disableRestoreFocus
        PaperProps={{
          style: {
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
        >
          <IconButton
            onClick={() => setAnchorEl(null)}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "#ffffff",
              zIndex: 1,
            }}
          >
            <ClearIcon sx={{ color: "#ffffff" }} />
          </IconButton>
          <Avatar
            src={blogImage}
            variant="square"
            alt="Expanded Profile"
            sx={{
              width: "100%",
              height: "90vh",
              // border: "3px solid white",
            }}
          />
        </Box>
      </Modal>
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
