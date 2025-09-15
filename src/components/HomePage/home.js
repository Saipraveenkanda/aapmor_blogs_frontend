import React, { useEffect, useState } from "react";
import Header from "./header";
import Blog from "../Blog/blogCard";
import BottomNavbar from "../BottomNavigation/bottomNavigation";
import { Typography, Box, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setBlogsData } from "../../store/slices/blogSlice";
import HomeLoading from "../../helpers/homeLoading";
import ProfilePopup from "./ProfilePopup";
import noBlogsImage from "../../assets/noblogs.png";
import WinnerAnnouncement from "../BlogWinner";
import AdminDashboard from "../Sidebar/AdminDashboard";
import { registerUser } from "../../socket";
import {
  getBlogsApi,
  getBlogsByCategoryApi,
} from "../../providers/blogProvider";
import { getWinnerOfTheMonth } from "../../providers/adminProvider";
import { profileCheckingApi } from "../../providers/userProvider";
import { token } from "../../utilities/authUtils";
import WinnerTicker from "../WinnerTicker";
import CategoryTabs from "../Sidebar/CategoryTabs";
import useTheme from "@mui/material/styles/useTheme";

const Home = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [apiStatus, setApiStatus] = useState("INITIAL");
  const blogObj = useSelector((state) => state.blogs);
  const blogs = blogObj.blogs;
  const [updatedBlogs, setUpdatedBlogs] = useState(blogs);
  const [showAlert, setShowAlert] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("All");
  const [winnerDetails, setWinnerDetails] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  console.log(profile, "PROFILE");
  const theme = useTheme();
  const mode = theme.palette.mode;

  useEffect(() => {
    document.title = "AAPMOR | Blogs";
    if (!token) {
      const checkProfileDetails = async () => {
        const response = await profileCheckingApi();
        console.log(response, "RESP");
        if (response.status === 202) {
          console.log("Profile not updated, opening profile");
          setProfile(true);
        } else if (response.status === 200) {
          setProfile(false);
          setProfileDetails(response.data.res);
          if (response) {
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
  // const getBlogsData = async () => {
  //   const response = await getBlogsByCategoryApi(category);
  //   if (response.status === 200) {
  //     setApiStatus("SUCCESS");
  //     dispatch(setBlogsData(response.data));
  //   } else {
  //     setApiStatus("FAILURE");
  //   }
  // };

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      setApiStatus("INITIAL");
      const response = await getBlogsByCategoryApi(category);
      if (response.status === 200) {
        setApiStatus("SUCCESS");
        dispatch(setBlogsData(response.data));
      } else {
        setApiStatus("FAILURE");
      }
    };

    // Only fetch if category is defined
    if (category) {
      fetchBlogsByCategory();
    }
  }, [category]);

  //   useEffect(() => {
  //   setApiStatus("INITIAL");
  //   getBlogsData();
  // }, [category]);

  const getWinnerDetails = async () => {
    const response = await getWinnerOfTheMonth();
    console.log(response, "RESP");

    if (response && !response?.data?.message) {
      setWinnerDetails(response?.data);
    } else {
      setWinnerDetails([]);
    }
  };

  useEffect(() => {
    setApiStatus("INITIAL");
    getWinnerDetails();
    // getBlogsData();
  }, []);

  const renderLoadingView = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 156px)",
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
          height: "calc(100vh - 156px)",
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
            paddingTop: 0,
            boxSizing: "border-box",
            backdropFilter: "blur(10px)",
            // marginTop: "65px",
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
        // xs={12}
        sx={{
          "@media(min-width:480px)": { pl: "40px", pr: "40px" },
        }}
      >
        <Header
          setSearchInput={setSearchInput}
          profile={profile}
          setProfile={setProfile}
        />
        {/* {winnerDetails?.length > 0 && ( */}
        <WinnerTicker winnerDetails={winnerDetails} mode={mode} />
        {/*  )} */}
        <Grid item sx={{ flexBasis: { xs: "100%", sm: "100%" } }} container>
          <Grid item xs={12} lg={8.5} sx={{ mr: 1, boxSizing: "border-box" }}>
            <CategoryTabs category={category} setCategory={setCategory} />
            {renderBlogsApi()}
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ "@media(max-width:480px)": { display: "none" } }}
          >
            <AdminDashboard />
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
