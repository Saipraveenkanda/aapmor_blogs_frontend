import React, { useEffect, useState } from "react";
import Header from "./header";
import Blog from "../Blog/blogCard";
import BottomNavbar from "../BottomNavigation/bottomNavigation";
import {
  Typography,
  Box,
  Alert,
  Backdrop,
  Grid,
  Tooltip,
  Fab,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogsApi,
  getWinnerOfTheMonth,
  profileCheckingApi,
} from "../ApiCalls/apiCalls";
import { setBlogsData } from "../Slices/blogSlice";
import Cookies from "js-cookie";
import HomeLoading from "../../helpers/homeLoading";
import ProfilePopup from "./ProfilePopup";
import noBlogsImage from "../../assets/noblogs.png";
import WinnerAnnouncement from "../BlogWinner";
import AdminDashboard from "../Sidebar/AdminDashboard";
import WriteButton from "../../helpers/WriteButton";
import { registerUser } from "../../socket";

const Home = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const [category, setCategory] = useState("All");
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const blogObj = useSelector((state) => state.blogs);
  const blogs = blogObj.blogs;
  const [updatedBlogs, setUpdatedBlogs] = useState(blogs);
  const [showAlert, setShowAlert] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [winnerDetails, setWinnerDetails] = useState([]);
  const user = Cookies.get("username");
  const userName = user !== undefined ? user : "User";

  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      const checkProfileDetails = async () => {
        const response = await profileCheckingApi();
        if (response.status === 202) {
          setProfile(true);
        } else if (response.status === 200) {
          setProfile(false);
          setProfileDetails(response.data.res);
          Cookies.set("username", response.data.res.name);
          Cookies.set("userrole", response.data.res.designation);
          if (response) {
            // Register user to socket with their _id
            registerUser(response.data.res._id);
          }
        }
      };
      checkProfileDetails();
    } else {
      setProfile(false);
    }
  }, []);

  useEffect(() => {
    const showFirstTime = localStorage.getItem("showAnnouncement");
    if (
      (showFirstTime === null || showFirstTime === "true") &&
      apiStatus === "SUCCESS"
    ) {
      setShowAnnouncement(true);
    }
  }, [apiStatus]);

  const handleAnnouncementClose = () => {
    setShowAnnouncement(false);
    localStorage.setItem("showAnnouncement", "false");
  };

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, [showAlert]);

  useEffect(() => {
    setUpdatedBlogs(blogs);
  }, [blogs]);

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

  const getWinnerDetails = async () => {
    const response = await getWinnerOfTheMonth();
    if (response) {
      setWinnerDetails(response?.data);
    }
  };

  useEffect(() => {
    document.title = "AAPMOR | Blogs";
    setApiStatus("INITIAL");
    getWinnerDetails();
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
        <HomeLoading />
      </Box>
    );
  };

  const renderBlogsView = () =>
    updatedBlogs.map((blogItem) => {
      return <Blog blogDetails={blogItem} key={blogItem._id} />;
    });

  const renderNoBlogsView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "60vh",
        }}
      >
        <img
          src={noBlogsImage}
          alt="no-blog-image"
          style={{
            width: "40%",
          }}
        />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color={"GrayText"}
          sx={{ textAlign: "center", maxWidth: { md: "40%" } }}
        >
          No matching blogs found. Please adjust your search criteria or{" "}
          <a
            style={{
              fontStyle: "italic",
              fontWeight: "700",
              cursor: "pointer",
              color: "Highlight",
            }}
            href="/"
          >
            reload
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
          height: "calc(100vh - 65px)",
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
            minHeight: "91vh",
            padding: "24px",
            boxSizing: "border-box",
            backdropFilter: "blur(10px)",
          }}
          gap={{ xs: 2, md: 4 }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h6"
              fontWeight={"bold"}
              textAlign={"left"}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            ></Typography>
          </Stack>
          {updatedBlogs.length > 0 ? renderBlogsView() : renderNoBlogsView()}
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

  useEffect(() => {
    if (!searchInput || searchInput === "") {
      setUpdatedBlogs(blogs);
      return;
    }
    const query = searchInput.toLowerCase();
    const filteredBlogs = blogs.filter((blog) => {
      const blogMonth = new Date(blog.date)
        .toLocaleString("default", { month: "long" })
        .toLowerCase();

      return (
        blog.username.toLowerCase().includes(query) ||
        blog.title.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blogMonth.includes(query)
      );
    });
    setUpdatedBlogs(filteredBlogs);
  }, [searchInput]);

  return (
    <>
      <Grid
        container
        xs={12}
        sx={{
          "@media(min-width:480px)": { pl: "40px", pr: "40px" },
        }}
      >
        <Header setSearchInput={setSearchInput} profile={profile} />
        <Grid item sx={{ flexBasis: { xs: "100%", sm: "100%" } }} container>
          <Grid item xs={12} lg={8.5} sx={{ mr: 1, boxSizing: "border-box" }}>
            {renderBlogsApi()}
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ "@media(max-width:480px)": { display: "none" } }}
          >
            <AdminDashboard
              username={userName}
              profileDetails={profileDetails}
            />
          </Grid>
        </Grid>
      </Grid>
      {profile && (
        <ProfilePopup
          profile={profile}
          handleClose={handleClose}
          setProfile={setProfile}
        />
      )}
      <BottomNavbar />
      {showAnnouncement && !winnerDetails?.message && (
        <WinnerAnnouncement
          isOpen={showAnnouncement}
          onClose={handleAnnouncementClose}
          winnerDetails={winnerDetails}
        />
      )}
    </>
  );
};

export default Home;
