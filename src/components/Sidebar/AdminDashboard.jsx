import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Skeleton,
  Stack,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
// import BlogCardSlider from "./BlogCardSlider";
// import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
// import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
// import InterestsIcon from "@mui/icons-material/Interests";
import { useNavigate } from "react-router-dom";
// import AnalyzeAnimation from "../../helpers/AnalyzeBlogsAnimation";
// import trophyanimation from "../../helpers/trophyanimation.json";
import WriteButton from "../../helpers/WriteButton";
// import Lottie from "lottie-react";
import { getUserFromToken } from "../../utilities/authUtils";
import aiImage from "../../assets/aiImage.jpg";
import { Divider } from "@mui/material";
import { getNotifications, getRecentActivity } from "../../socket";
import activityimage from "../../assets/noactivity.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

const DashboardContainer = styled("div")({
  position: "fixed",
  right: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
  paddingTop: "0px",
  boxSizing: "border-box",
  borderRadius: "12px",
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",
  maxHeight: "calc(100vh - 64px)",
  // height: "calc(100vh - 64px)",
  width: "370px",
  height: "auto",
  maxHeight: "80%",
  mt: 0,
});

const GlassCard = styled(Card)(({ theme }) => ({
  flexGrow: 1,
  elevation: 0,
  boxShadow: "none",
  borderRadius: "12px",
  background: "rgba(43, 43, 43, 1)",
  padding: "8px !important",
  boxSizing: "border-box",
  backgroundColor: "transparent",
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const blogObj = useSelector((state) => state.blogs);
  const recentBlogsList = blogObj.blogs;
  const currentDate = new Date();
  const [loading, setLoading] = useState(true);
  const currentMonth = currentDate.getMonth() - 1; // 0-based index (0 = January, 11 = December)
  const currentYear = currentDate.getFullYear();
  const [topBlogs, setTopBlogs] = useState([]);
  const [lastReadBlog, setLastReadBlog] = useState({});
  const user = getUserFromToken();
  const [winners, setWinners] = useState([]);
  const [showWinners, setShowWinners] = useState(false);
  const [activity, setActivity] = useState([]);
  console.log(activity, "ACTIVITY");

  useEffect(() => {
    setLoading(true);
    const lastReadBlogId = localStorage.getItem("lastReadBlog") || "";
    const blogs = blogObj.blogs;
    if (blogs.length > 0) {
      setTopBlogs(
        [...recentBlogsList]
          .filter((blog) => {
            const blogDate = new Date(blog.date);
            return (
              blogDate.getMonth() === currentMonth &&
              blogDate.getFullYear() === currentYear &&
              blog.likes.length > 0
            );
          })
          .sort((a, b) => b.likes.length - a.likes.length)
          .slice(0, 5)
      );
      setLoading(false);
    }
    const lastReadBlog = recentBlogsList.find((b) => b._id === lastReadBlogId);
    setLastReadBlog(lastReadBlog);
  }, [blogObj]);

  function timeAgo(dateInput) {
    const now = new Date();
    const date = new Date(dateInput);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  const monthName = new Date().toLocaleString("default", {
    month: "long",
  });

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/winners`);
        const data = await res.json();
        if (Array.isArray(data)) setWinners(data);
      } catch (err) {
        console.error("Error fetching winners:", err);
      }
    };
    fetchWinners();
    const showFlag = localStorage.getItem("showAnnouncement");
    if (showFlag === "true") {
      setShowWinners(true);
      localStorage.removeItem("showAnnouncement");
    }
  }, []);

  const handleCheckWinners = () => {
    localStorage.setItem("showAnnouncement", true);
    window.location.reload();
  };

  const [currentWinnerIndex, setCurrentWinnerIndex] = useState(0);

  // Cycle through winners every 4 seconds
  useEffect(() => {
    if (!winners || winners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentWinnerIndex((prevIndex) => (prevIndex + 1) % winners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [winners]);

  /* Recent Activity in Admin Page from Web socket */
  useEffect(() => {
    getRecentActivity((data) => {
      setActivity((prev) => [data, ...prev]);
    });
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "like":
        return <FavoriteBorderIcon color="error" fontSize="small" sx={{fontSize:"16px"}} />;
      case "comment":
        return <ChatBubbleOutlineIcon color="primary" fontSize="small" />;
      case "post":
        return <CreateOutlinedIcon color="success" fontSize="small" />;
      default:
        return <Avatar sx={{ width: 28, height: 28 }} />;
    }
  };

  return (
    <>
      <DashboardContainer>
        <GlassCard>
          <CardContent sx={{ p: 1 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
              Activities
            </Typography>
            <Box
              sx={{
                maxHeight: "35vh",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {activity.length > 0 ? (
                activity.map((a, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{ p: "0px 0px 12px 0px" }}
                    >
                      <ListItemAvatar
                        sx={{
                          minWidth: "38px",
                        }}
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            bgcolor: "grey.100",
                            display: "flex",
                            flexDirection:"row",
                            alignItems: "center",
                            justifyContent: "center",
                            boxSizing: "border-box",
                          }}
                        >
                          {getIcon(a.type)}
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="body1">{a.message}</Typography>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 0.5, display: "block" }}
                          >
                            {timeAgo(a.timestamp)}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {/* {idx < activity.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )} */}
                  </React.Fragment>
                ))
              ) : (
                /* (
                activity?.map((a, index) => {
                  return (
                    <Stack key={index} direction={"column"} spacing={1}>
                      <Typography key={index}>{a?.message}</Typography>

                      <Typography variant="caption">
                        {timeAgo(a.timestamp)}
                      </Typography>
                    </Stack>
                  );
                })
              ) */ <Stack direction={"column"} alignItems={"center"}>
                  <img
                    src={activityimage}
                    alt="no-activity-image"
                    style={{ height: "100px" }}
                  />
                  <Typography>No recent activity</Typography>
                </Stack>
              )}
            </Box>
            {!loading && winners.length > 0 && (
              <>
                <Divider
                  sx={{
                    my: 4,
                    height: "1px",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(0,0,0,0), #4E4E4E, rgba(0,0,0,0))",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  Best blogs of the month
                </Typography>

                <Box
                  key={winners[currentWinnerIndex]?._id || currentWinnerIndex}
                  onClick={() =>
                    window.open(winners[currentWinnerIndex]?.blogLink, "_blank")
                  }
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    // borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                    "&:hover": { boxShadow: "0 2px 6px rgba(0,0,0,0.2)" },
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <Box sx={{ width: "90%", height: 100, overflow: "hidden" }}>
                    <img
                      src={winners[currentWinnerIndex]?.blogImage || aiImage}
                      alt="Winner"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}
                    >
                      {winners[currentWinnerIndex]?.blogTitle}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      by {winners[currentWinnerIndex]?.winnerName}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </CardContent>
        </GlassCard>
      </DashboardContainer>

      <WriteButton />
    </>
  );
};

export default Dashboard;
