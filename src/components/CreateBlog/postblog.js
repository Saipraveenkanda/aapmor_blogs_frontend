import {
  Box,
  Button,
  TextField,
  Stack,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { Image } from "@mui/icons-material";
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
import { LoadingButton } from "@mui/lab";
import ProfilePopup from "../HomePage/ProfilePopup";
import BottomNavbar from "../BottomNavigation/bottomNavigation";

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
          {/* HEADER BOX */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
              backgroundColor: "#bfbfbf20",
              pb: 1,
              borderRadius: "6px",
              boxSizing: "border-box",
              border: "0.5px solid #bfbfbf",
              marginTop: 2,
            }}
          >
            <TextField
              placeholder="Enter your blog title"
              label="Blog title"
              onChange={(e) => setTitle(e.target.value)}
              sx={{ width: "50%" }}
              variant="standard"
              required
              value={title}
            />
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth variant="standard">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label={category}
                    onChange={(e) => setCategory(e.target.value)}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value={"Insights"}>Insights</MenuItem>
                    <MenuItem value={"Fitness"}>Fitness</MenuItem>
                    <MenuItem value={"Artificial Intelligence"}>
                      Artificial Intelligence
                    </MenuItem>
                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                    <MenuItem value={"Politics"}>Politics</MenuItem>
                    <MenuItem value={"International"}>International</MenuItem>
                    <MenuItem value={"News"}>News</MenuItem>
                    <MenuItem value={"Sports"}>Sports</MenuItem>
                    <MenuItem value={"Fashion"}>Fashion</MenuItem>
                    <MenuItem value={"Food & Health"}>Food & health</MenuItem>
                    <MenuItem value={"Gaming"}>Gaming</MenuItem>
                    <MenuItem value={"Technology"}>Technology</MenuItem>
                    <MenuItem value={"Arts"}>Arts</MenuItem>
                    <MenuItem value={"Travel"}>Travel</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem("blogData");
                  navigate("/");
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={submitPost}
                disabled={!disablePublishButton}
              >
                {isEdit ? "Update" : "Publish"}
              </LoadingButton>
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              ></LoadingButton>
            </Stack>
          </Box>
          <Box
            sx={{
              mt: 0.5,
              backgroundColor: "#bfbfbf10",
              padding: 2,
              borderRadius: "6px",
              border: "0.5px solid #bfbfbf",
              boxSizing: "border-box",
            }}
          >
            <Stack direction={"row"} spacing={4} alignItems={"flex-end"}>
              <TextField
                variant="standard"
                placeholder="Enter few lines about your blog"
                fullWidth
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Divider orientation="vertical" flexItem />
              <Input
                accept="image/*"
                multiple
                type="file"
                onChange={handleFileUpload}
                id="imageFile"
                sx={{ display: "none" }}
              />
              <Tooltip title="Insert thumbnail image for your blog">
                <label htmlFor="imageFile">
                  <Image sx={{ cursor: "pointer" }} />
                </label>
              </Tooltip>
            </Stack>
          </Box>
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
                boxShadow: "0px 0px 10px 0px #00000050",
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
