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
import { useState, React } from "react";
import { createBlogApi, publishBlogApi } from "../ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";
import Header from "../HomePage/header";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import BlotFormatter from "quill-blot-formatter";

import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

const name = Cookies.get("username");
const role = Cookies.get("userrole");
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/blotFormatter", BlotFormatter);

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
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

const CreateBlog = () => {
  document.title = "Create New Blog";
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const newDate = new Date();
  const dateObject = `${newDate.getDate()} ${newDate.toLocaleString("default", {
    month: "short",
  })}, ${newDate.getFullYear()}`;

  const handleFileUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBlogImage(base64);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const submitPost = async () => {
    setLoading(true);
    const blogDetails = {
      username: name,
      userrole: role,
      title,
      description,
      blogImage,
      category,
      date: dateObject,
      likes: 0,
      comments: [],
      htmlFile: editorHtml,
      savedUsers: [],
    };

    const response = await createBlogApi(blogDetails);
    if (response.status === 200) {
      setLoading(false);
      const data = await response.json();
      var blogId = data.message;
      navigate("/");
    }
    const content = { title, description, blogImage, dateObject, blogId };
    await publishBlogApi(content);
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

                    <MenuItem value={"Arts"}>Arts</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button variant="outlined" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={submitPost}
              >
                Publish
              </LoadingButton>
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
    </>
  );
};
export default CreateBlog;
