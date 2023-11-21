import React, { useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Blog from "../Blog/blogCard";
import SideBar from "../Sidebar/sideBar";
import BottomNavbar from "../BottomNavigation/bottomNavigation";
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Box,
  Alert,
  Backdrop,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogsApi,
  profileCheckingApi,
  profileUpdateApi,
} from "../ApiCalls/apiCalls";
import { setBlogsData } from "../Slices/blogSlice";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Cookies from "js-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "350px",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 2,
};

const Home = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const [category, setCategory] = useState("All");
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const blogObj = useSelector((state) => state.blogs);
  const blogs = blogObj.blogs;

  const [designation, setDesignation] = useState("Select");
  const [gender, setGender] = useState("Select");
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const email = Cookies.get("userEmail");
  const user = Cookies.get("username");

  const userName = user !== undefined ? user : "User";

  const handleProfileUpdate = async () => {
    const profileDetails = {
      gender,
      designation,
      email,
      name: name,
      isProfileUpdated: true,
    };
    const response = await profileUpdateApi(profileDetails);
    console.log(response);
    if (response.status === 200) {
      Cookies.set("username", name, { expires: 30 });
      Cookies.set("userrole", designation, { expires: 30 });
      setAlertMessage(response.data.message);
      setProfile(false);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      const checkProfileDetails = async () => {
        const emailObj = { email };
        const response = await profileCheckingApi(emailObj);
        if (response.status === 202) {
          setProfile(true);
        } else if (response.status === 200) {
          setProfile(false);
        }
      };
      checkProfileDetails();
    } else {
      setProfile(false);
    }
  }, [email]);

  //GET BLOGS API CALL
  const getBlogsData = async () => {
    const response = await getBlogsApi(category);
    if (response.status === 200) {
      setApiStatus("SUCCESS");
      dispatch(setBlogsData(response.data));
    } else {
      setApiStatus("FAILURE");
    }
  };

  useEffect(() => {
    document.title = "AAPMOR | Blogs";
    setApiStatus("INITIAL");
    getBlogsData();
  }, [category]);

  const renderLoadingView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          width: "80vw",
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  const renderBlogsView = () =>
    blogs.map((blogItem) => {
      return <Blog blogDetails={blogItem} key={blogItem._id} />;
    });

  const renderNoBlogsView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color={"GrayText"}
          sx={{ textAlign: "center", maxWidth: "40%" }}
        >
          There are no blogs in this category, please select other categories or{" "}
          <a
            style={{
              fontStyle: "italic",
              fontWeight: "700",
              cursor: "pointer",
              color: "Highlight",
            }}
            href="/"
          >
            load
          </a>{" "}
          all blogs
        </Typography>
      </Box>
    );
  };

  const renderSuccessView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row", md: "row" },
          width: { sm: "100vw" },
          flexWrap: "wrap",
          minHeight: "90vh",
          padding: "20px",
          boxSizing: "border-box",
        }}
        gap={2}
      >
        <Typography sx={{ display: { xs: "block", md: "none" } }} variant="h6">
          Hello {userName}, Good Day!
        </Typography>
        {blogs.length > 0 ? renderBlogsView() : renderNoBlogsView()}
      </Box>
    );
  };

  const renderFailureView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Typography variant="h6">
          Unable to load blogs... please try after some time
        </Typography>
      </Box>
    );
  };

  const renderBlogsApi = () => {
    switch (apiStatus) {
      case "INITIAL":
        return renderLoadingView();
      case "SUCCESS":
        return renderSuccessView();
      case "FAILURE":
        return renderFailureView();
      default:
        return null;
    }
  };
  const handleClose = () => {
    setProfile(false);
  };

  const showPopupProfile = () => {
    return (
      <Modal open={profile} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="p" fontSize={16} fontWeight={600}>
              Profile Update
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider orientation="horizontal" />

          <Typography variant="subtitle1" fontWeight={600} textAlign={"center"}>
            Hey User! tell us a little more about you
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">Name *</Typography>

            <TextField
              required
              fullWidth
              size="small"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />

            <Typography variant="body2">Designation *</Typography>
            <FormControl sx={{ mt: 1 }} fullWidth size="small">
              <Select
                onChange={(e) => setDesignation(e.target.value)}
                value={designation}
              >
                <MenuItem value="Select" disabled>
                  Select
                </MenuItem>

                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Devops">Devops</MenuItem>
                <MenuItem value="QA">QA</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                <MenuItem value="Full Stack Developer">
                  Full Stack Developer
                </MenuItem>
                <MenuItem value="UI / UX">UI / UX</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2">Gender *</Typography>
            <FormControl sx={{ mt: 1 }} fullWidth size="small">
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Select" disabled>
                  Select
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <Button
              color="primary"
              onClick={handleProfileUpdate}
              startIcon={<SaveIcon />}
              variant="contained"
              fullWidth
              sx={{ mt: 4 }}
            >
              <span>Save</span>
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Header />

      <Box sx={{ display: "flex" }}>
        <SideBar setCategory={setCategory} category={category} />
        {renderBlogsApi()}
      </Box>

      <Footer />

      {profile && showPopupProfile()}

      <BottomNavbar />

      <Backdrop open={showAlert} onClick={() => setShowAlert(false)}>
        <Box sx={{ display: "fixed", top: "100px", bottom: "100px" }}>
          <Alert severity="success">{alertMessage}</Alert>
        </Box>
      </Backdrop>
    </>
  );
};

export default Home;
