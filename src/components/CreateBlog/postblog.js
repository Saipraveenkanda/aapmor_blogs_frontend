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
} from "@mui/material";
import { useState, React, useEffect } from "react";
import {
  createBlogApi,
  getSummaryOfBlog,
  publishBlogApi,
  updateBlogApi,
  uploadThumbnail,
} from "../ApiCalls/apiCalls";
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
ReactQuill.Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    ["image", "video"],
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
  const [scrollPos, setScrollPos] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const name = Cookies.get("username");
  const role = Cookies.get("userrole");
  const [plainText, setPlainText] = useState("");
  const navigate = useNavigate();

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

  const handleSummarize = async () => {
    setSummaryLoading(true);
    const payload = {
      text: plainText,
    };
    console.log(plainText, "PLAIN TEXT");

    const response = await getSummaryOfBlog(payload);
    console.log(response, "SUMMARY RESPONSE");
    if (response) {
      setDescription(response.data.summary);
      setSummaryLoading(false);
    }
    setSummaryLoading(false);
  };

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
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "grey" }}
              >
                TITLE<span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                placeholder="Enter your blog title"
                onChange={(e) => setTitle(e.target.value)}
                // sx={{ minWidth: { xs: "350px", sm: "500px", md: "600px" } }}
                variant="standard"
                required
                fullWidth
                value={title}
              />
            </Grid>
            <Grid item xs={9} md={4} sx={{ paddingRight: "4px" }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "grey" }}
              >
                Category<span style={{ color: "red" }}>*</span>
              </Typography>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                size="small"
                displayEmpty
              >
                <MenuItem value="" disabled sx={{ color: "grey" }}>
                  Select Category
                </MenuItem>
                {catoreries.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2} md={2}>
              <Tooltip title="Insert thumbnail image for your blog">
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  tabIndex={-1}
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{
                    textTransform: "none",
                    marginTop: "24px",
                    border: "1px solid #016A70",
                    color: "#016A70",
                    "&:hover": {
                      color: "#ffffff",
                      backgroundColor: "#016A7080",
                      border: "1px solid #016A70",
                    },
                  }}
                  required
                  size="large"
                >
                  Thumbnail <span style={{ color: "red" }}> *</span>
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
            <Stack direction={"row"} spacing={2} alignItems={"flex-end"}>
              <TextField
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
              <Button
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
            </Stack>
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

          {/* EDITOR BOX*/}
          {(blogImage !== "" || imageLoading) && (
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
              {imageLoading ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ position: "relative", width: "100%", height: "100%" }}
                />
              ) : (
                <img
                  src={blogImage}
                  alt="thumbnail"
                  style={{
                    width: "100%",
                    height: "80%",
                  }}
                />
              )}
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
              ref={quillRef}
              theme="snow"
              value={editorHtml}
              onChange={handleChange}
              modules={modules}
            />
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


      `}
      </style>
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

const loader = () => {
  return <></>;
};
