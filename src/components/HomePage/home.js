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
import RecentBlogs from "../RecentBlogs/recentBlogs";
import HomeLoading from "../../helpers/homeLoading";
import ProfilePopup from "./ProfilePopup";
import noBlogsImage from "../../assets/noblogs.png";
import { useNavigate } from "react-router-dom";
import writeIcon from "../../assets/pencil-simple-line.svg";
import WinnerAnnouncement from "../BlogWinner";
import AnalyzeAnimation from "../../helpers/AnalyzeBlogsAnimation";
import HelloAnimation from "../../helpers/HelloAnimation";

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
  const [alertMessage, setAlertMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [winnerDetails, setWinnerDetails] = useState([]);
  const user = Cookies.get("username");
  const userName = user !== undefined ? user : "User";
  const token = Cookies.get("jwtToken");
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  console.log(isEnabled, timeLeft, "TIME LEFT");

  useEffect(() => {
    const updateButtonState = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDate();

      const startOfEnable = new Date(year, month, 8, 0, 0, 0); // 8th of the month
      const endOfEnable = new Date(year, month, 27, 23, 59, 59); // 27th of the month

      if (now >= startOfEnable && now <= endOfEnable) {
        setIsEnabled(true);
        setTimeLeft("");
      } else {
        setIsEnabled(false);
        const nextEnableDate =
          now < startOfEnable ? startOfEnable : new Date(year, month + 1, 8);
        const timeDifference = nextEnableDate - now;

        // Convert to days, hours, minutes
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

        setTimeLeft(
          `Analyzing entries... Writing unlocks in ${days}d ${hours}h ${minutes}m`
        );
      }
    };

    updateButtonState();
    const timer = setInterval(updateButtonState, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      const checkProfileDetails = async () => {
        const response = await profileCheckingApi();
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
        checkProfileDetails();
      }, 5000);
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
        {/* <CircularProgress sx={{ color: "#016A70" }} /> */}
        {/* <img src={loadingHand} alt="loading hand" style={{ height: "200px" }} /> */}
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
          height: "91vh",
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
            >
              <HelloAnimation username={userName} />
            </Typography>
            {/* {isEnabled && (
              <Alert variant="outlined" severity="warning">
                <span style={{ fontSize: "12px", color: "red" }}>
                  {timeLeft}
                </span>
              </Alert>
            )} */}
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
        sx={{ "@media(min-width:480px)": { pl: "40px", pr: "40px" } }}
      >
        <Header setSearchInput={setSearchInput} />
        <Grid item sx={{ flexBasis: { xs: "100%", sm: "100%" } }} container>
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

      {token &&
        (!isEnabled ? (
          <Box sx={{ position: "fixed", bottom: -10, right: 10 }}>
            <AnalyzeAnimation timeLeft={timeLeft} />
          </Box>
        ) : (
          <Fab
            variant="extended"
            // color="inherit"
            disabled={!isEnabled}
            size="medium"
            onClick={() => navigate("/createblog")}
            sx={{
              backgroundColor: "#016A70",
              boxShadow: "2px 2px 4px 0px grey ",
              borderRadius: 2,
              position: "fixed",
              bottom: 60,
              right: 30,
              width: "180px",
              height: "52px",
              textTransform: "none",
              fontSize: "16px",
              border: "4px solid #fff",
              "&:hover": {
                border: "4px solid #016A70",
                boxShadow: "1px 0px 4px 0px #ffffff inset",
                backgroundColor: "#016A70",
              },
              color: "#ffffff",
            }}
          >
            {/* <CreateIcon sx={{ mr: 1 }} /> */}
            <img
              src={writeIcon}
              alt="write_icon"
              style={{ height: "30px", paddingRight: "8px" }}
            />
            Write
          </Fab>
        ))}
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
