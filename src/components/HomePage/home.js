import React, { useEffect, useState } from "react";
import Header from "./header";
import Blog from "../Blog/blogCard";
import SideBar from "../Sidebar/sideBar";
import BottomNavbar from "../BottomNavigation/bottomNavigation";
import {
  Button,
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
  Grid,
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
import RecentBlogs from "../RecentBlogs/recentBlogs";
import HomeLoading from "../../helpers/homeLoading";
import ProfilePopup from "./ProfilePopup";

const Home = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const [category, setCategory] = useState("All");
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const blogObj = useSelector((state) => state.blogs);
  const blogs = blogObj.blogs;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const user = Cookies.get("username");

  const userName = user !== undefined ? user : "User";

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      const checkProfileDetails = async () => {
        console.log("now checking profile status");
        const response = await profileCheckingApi();
        console.log(response);
        if (response.status === 202) {
          clearInterval(intervalId);
          setProfile(true);
        } else if (response.status === 200) {
          clearInterval(intervalId);
          setProfile(false);
          // if (Cookies.get("username") === undefined) {
          Cookies.set("username", response.data.res.name);
          // }
          // if (Cookies.get("userrole") === undefined) {
          Cookies.set("userrole", response.data.res.designation);
          // }
        }
        clearInterval(intervalId);
      };
      const intervalId = setInterval(() => {
        console.log("waiting 5 sec for checking profile");
        checkProfileDetails();
      }, 5000);
    } else {
      setProfile(false);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, [showAlert]);

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
          width: "100%",
        }}
      >
        {/* <CircularProgress sx={{ color: "#016A70" }} /> */}
        {/* <img src={loadingHand} alt="loading hand" style={{ height: "200px" }} /> */}
        <HomeLoading />
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
          height: "50vh",
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
          height: "91vh",
          // backgroundImage: `url(${blogsbackground})`,
          // backgroundSize: "cover",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            width: "10px",
            marginRight: 2,
            marginLeft: -2,
          },
          "&::-webkit-scrollbar-track": {
            // background: "#f1f1f1",
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#2196f350",
            borderRadius: 2,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#2196f3",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            // width: { sm: "80%" },
            // flexWrap: "wrap",
            minHeight: "91vh",
            padding: "24px",
            boxSizing: "border-box",
            // overflowY: "auto",
            // scrollbarWidth: "thin",
            backdropFilter: "blur(10px)",
            // backgroundPosition: "center",
            // scrollbarWidth: 0,
          }}
          gap={{ xs: 2, md: 4 }}
        >
          <Typography variant="h6" fontWeight={"bold"} textAlign={"left"}>
            Hello! Welcome {userName}
          </Typography>
          {blogs.length > 0 ? renderBlogsView() : renderNoBlogsView()}
        </Box>
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

  console.log(profile, "show profile");
  return (
    <>
      <Grid
        container
        xs={12}
        sx={{ "@media(min-width:480px)": { pl: "40px", pr: "40px" } }}
      >
        <Header />
        <Grid
          item
          xs={2}
          sx={{ "@media(max-width:480px)": { display: "none" } }}
        >
          <SideBar setCategory={setCategory} category={category} />
        </Grid>
        <Grid item sx={{ flexBasis: { xs: "100%", sm: "83.33%" } }} container>
          <Grid item xs={12} lg={8.5} sx={{ mr: 1, boxSizing: "border-box" }}>
            {renderBlogsApi()}
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ "@media(max-width:480px)": { display: "none" } }}
          >
            <RecentBlogs />
          </Grid>
        </Grid>
      </Grid>

      {/* <Footer /> */}

      {profile && (
        <ProfilePopup
          profile={profile}
          handleClose={handleClose}
          setProfile={setProfile}
        />
      )}

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
