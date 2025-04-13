import {
  Box,
  Card,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Select,
  Typography,
  MenuItem,
  FormHelperText,
  Grid,
  Stack,
  Avatar,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  Popover,
  Divider,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/header";
import Cookies from "js-cookie";
import BottomNavbar from "../BottomNavigation/bottomNavigation";
import { useNavigate } from "react-router-dom";
import SavedBlogs from "../SavedBlogs/savedBlogs";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ClearIcon from "@mui/icons-material/Clear";
import AssistantOutlinedIcon from "@mui/icons-material/AssistantOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import {
  getAutoBioService,
  profileCheckingApi,
  profileUpdateApi,
  uploadProfileImage,
} from "../../providers/userProvider";

const UserProfile = (props) => {
  const [profile, setProfile] = useState({});
  const [designation, setDesignation] = useState(profile?.designation || "");
  const [gender, setGender] = useState(profile?.gender || "");
  const [name, setName] = useState(profile?.name || "");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState(profile?.email || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [profileImage, setProfileImage] = useState(profile?.profileImage || "");
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(false);
  const [tempImage, setTempImage] = useState("");
  const [editBio, setEditBio] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setTempImage(base64);
    setImage(file);
  };

  const handleGenerateBio = async () => {
    const payload = {
      name: profile?.name || name,
      gender: profile?.gender || gender,
      department: profile?.designation || designation,
      email: profile?.email,
    };
    const response = await getAutoBioService(payload);
    if (response) {
      getProfile();
    }
  };

  /* UPLOAD IMAGE */

  const handleImageUpload = async () => {
    setImageLoading(true);
    const file = image;
    const formData = new FormData();
    formData.append("image", file);
    const response = await uploadProfileImage(formData);
    console.log(response, "PROFILE UPLOAD RESPONSE");
    if (response) {
      setTempImage("");
      getProfile();
      setOpen(true);
      setImageLoading(false);
    }
    setImageLoading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);
    const response = await profileCheckingApi();
    if (response) {
      const profile = response.data.res;
      setProfile(profile);
      setName(profile?.name);
      setEmail(profile?.email);
      setGender(profile?.gender);
      setDesignation(profile?.designation);
      setProfileImage(profile?.profileImage);
      setBio(profile?.bio);
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    const profileDetails = {
      gender,
      designation,
      email,
      name: name,
      isProfileUpdated: true,
    };
    const response = await profileUpdateApi(profileDetails);
    if (response?.status === 200) {
      const profile = response?.data?.profile;
      Cookies.set("userEmail", profile?.email);
      Cookies.get("username", profile?.name);
      Cookies.get("userrole", profile?.designation);
      window.history.back();
    }
  };
  const handleSaveBio = async () => {
    const response = await profileUpdateApi({ bio });
    if (response) {
      getProfile();
    }
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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openImage = Boolean(anchorEl);

  return (
    <>
      <Header />
      <Box sx={{ padding: "0px 60px", boxSizing: "border-box" }}>
        {/* USER DETAILS AND BIO */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid
            xs={12}
            container
            spacing={4}
            sx={{ p: "24px 0px", boxSizing: "border-box" }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                "@media(max-width:480px)": {
                  width: "100%",
                },
                "@media(min-width:481px)": {
                  width: "50%",
                },
                gap: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "text.primary" }}
              >
                Profile Update
              </Typography>

              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div>
                  {/* Small Profile Image */}
                  <Avatar
                    variant="rounded"
                    src={tempImage || profileImage}
                    alt="Profile"
                    sx={(theme) => ({
                      width: 200,
                      height: 200,
                      cursor: "pointer",
                      border: `2px solid ${theme.palette.accent.main}`, // Correct way
                    })}
                    onClick={handleHover}
                    // onMouseLeave={handleClose}
                  />

                  {/* Expanded Image on Hover */}
                  <Popover
                    open={openImage}
                    anchorEl={anchorEl}
                    onClose={handleClose}
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
                      },
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
                      src={tempImage || profileImage}
                      variant="square"
                      alt="Expanded Profile"
                      sx={{
                        width: "50vw",
                        height: "90vh",
                        // border: "3px solid white",
                      }}
                    />
                  </Popover>
                </div>
                <input
                  accept="image/*"
                  id="uploadImage"
                  style={{ display: "none" }}
                  type="file"
                  alt="profile-image"
                  onChange={handleFileUpload}
                />
                <Stack direction={"column"} alignItems={"center"} spacing={2}>
                  <Button
                    component="label"
                    htmlFor="uploadImage"
                    fullWidth
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      color: "text.primary",
                      borderColor: "accent.main",
                      "&:hover": {
                        borderColor: "accent.main",
                        backgroundColor: "unset",
                      },
                    }}
                    startIcon={<AddPhotoAlternateIcon />}
                  >
                    Select Image
                  </Button>
                  <Button
                    disabled={imageLoading || !tempImage}
                    onClick={handleImageUpload}
                    fullWidth
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    startIcon={<UploadIcon />}
                  >
                    Upload
                  </Button>
                  <Button
                    disabled
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{ textTransform: "none" }}
                    startIcon={<DeleteSweepIcon />}
                  >
                    Remove Image
                  </Button>
                </Stack>
              </Box>

              {/* Name */}
              {profile?.name !== "" ? (
                <Typography>
                  <b>Name:</b> {name}
                </Typography>
              ) : (
                <TextField
                  fullWidth
                  required
                  size="small"
                  helperText="Update your user name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              {/* Designation */}
              {profile?.designation !== "" ? (
                <Typography>
                  <b>Designation:</b> {designation}
                </Typography>
              ) : (
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label">
                    Designation *
                  </InputLabel>
                  <Select
                    onChange={(e) => setDesignation(e.target.value)}
                    value={designation}
                    required
                    label="Designation"
                    fullWidth
                  >
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Devops">Devops</MenuItem>
                    <MenuItem value="QA">QA</MenuItem>
                    <MenuItem value="Data Science">Data Science</MenuItem>
                    <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                    <MenuItem value="Full Stack Developer">
                      Full Stack Developer
                    </MenuItem>
                    <MenuItem value="UI / UX">UI / UX</MenuItem>
                    <MenuItem value="Business Analyst">
                      Business Analyst
                    </MenuItem>
                    <MenuItem value="SAP ABAP Consultant">
                      SAP ABAP Consultant
                    </MenuItem>
                    <MenuItem value="SAP GRC Consultant">
                      SAP GRC Consultant
                    </MenuItem>
                  </Select>
                  <FormHelperText>Update your designation</FormHelperText>
                </FormControl>
              )}

              {/* Gender */}
              {profile?.gender !== "" ? (
                <Typography>
                  <b>Gender:</b> {gender}
                </Typography>
              ) : (
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-label">
                    Gender *
                  </InputLabel>
                  <Select
                    fullWidth
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  <FormHelperText>Update your gender</FormHelperText>
                </FormControl>
              )}
              {/* Email */}
              {profile?.email !== "" ? (
                <Typography>
                  <b>Email:</b> {email}
                </Typography>
              ) : (
                <TextField
                  fullWidth
                  disabled
                  helperText="Update your email"
                  rows={4}
                  label="Email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}

              <Button
                onClick={updateProfile}
                disabled={designation && gender && name && email}
                sx={{
                  alignSelf: "flex-start",
                  width: "25%",
                  textTransform: "none",
                  color: "text.primary",
                  borderColor: "accent.main",
                  fontWeight: "bold",
                  "&:hover": {
                    border: "1px solid accent.main",
                    backgroundColor: "accent.main",
                    color: "#ffffff",
                    fontWeight: "bold",
                  },
                }}
                variant="outlined"
              >
                Update
              </Button>
            </Grid>

            {/* USER BIO */}
            <Grid xs={12} md={6} item>
              {profile?.bio && !editBio ? (
                <Stack
                  direction={"column"}
                  spacing={2}
                  alignItems={"flex-start"}
                >
                  <Typography variant="p" fontWeight={"bold"}>
                    Your Bio :
                    <Button
                      startIcon={<EditNoteOutlinedIcon />}
                      sx={{ textTransform: "none", ml: 1 }}
                      onClick={() => setEditBio(true)} // Enables editing
                    >
                      Edit
                    </Button>
                  </Typography>
                  <Typography
                    variant="p"
                    fontWeight={400}
                    sx={{
                      border: "0.5px solid lightgrey",
                      p: 1,
                      boxSizing: "border-box",
                      borderRadius: 2,
                      width: "100%",
                      color: "grey",
                    }}
                  >
                    {profile?.bio}
                  </Typography>
                </Stack>
              ) : (
                <Stack direction={"column"} spacing={2}>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      gutterBottom
                      variant="p"
                      fontWeight={500}
                      sx={{ color: "text.primary" }}
                    >
                      <b>{profile?.bio ? "Edit Bio: " : "Add Bio: "}</b>
                      {profile?.bio
                        ? "Update your bio to keep your readers engaged."
                        : "Tell your readers a little about yourself! Add a short bio to share your thoughts, experiences, or anything you'd like them to know."}
                    </Typography>
                    {profile?.bio && (
                      <IconButton onClick={() => setEditBio(false)}>
                        <ClearIcon />
                      </IconButton>
                    )}
                  </Stack>
                  <TextField
                    variant="outlined"
                    multiline
                    value={bio}
                    rows={6}
                    placeholder="Enter here..."
                    defaultValue={profile?.bio}
                    fullWidth
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Tooltip title="Use AI to generate a bio automatically based on your blogs, interests, and past activity.">
                      <Button
                        sx={{
                          textTransform: "none",
                          color: "text.primary",
                          borderColor: "accent.main",
                          fontWeight: "bold",
                          "&:hover": {
                            border: "1px solid accent.main",
                            backgroundColor: "accent.main",
                            color: "#ffffff",
                            fontWeight: "bold",
                          },
                        }}
                        variant="outlined"
                        startIcon={<AssistantOutlinedIcon />}
                        onClick={handleGenerateBio}
                      >
                        Auto
                      </Button>
                    </Tooltip>

                    <Button
                      onClick={() => {
                        handleSaveBio();
                        setEditBio(false); // Disable editing after saving
                      }}
                      sx={{
                        width: "25%",
                        textTransform: "none",
                        color: "text.primary",
                        borderColor: "accent.main",
                        fontWeight: "bold",
                        "&:hover": {
                          border: "1px solid accent.main",
                          backgroundColor: "accent.main",
                          color: "#ffffff",
                          fontWeight: "bold",
                        },
                      }}
                      variant="outlined"
                    >
                      Save
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Grid>
          </Grid>
        )}
        <Divider flexItem sx={{ mb: 2 }} />

        {/* SAVED BLOGS */}
        <Grid container xs={12} mb={2}>
          <SavedBlogs />
        </Grid>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Profile image updated successfully!
        </Alert>
      </Snackbar>

      <BottomNavbar />
    </>
  );
};

export default UserProfile;
