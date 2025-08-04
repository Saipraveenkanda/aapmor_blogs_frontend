import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Skeleton,
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

const DashboardContainer = styled("div")({
  position: "fixed",
  right: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
  boxSizing: "border-box",
  borderRadius: "12px",
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",
  maxHeight: "calc(100vh - 64px)",
  height: "calc(100vh - 64px)",
  width: "370px",
});

const GlassCard = styled(Card)(({ theme }) => ({
  flexGrow: 1,
  cursor: "pointer",
  elevation: 0,
  // backdropFilter: "blur(10px)",
  borderRadius: "12px",
  // borderLeft: `2px solid ${theme.palette.accent.main}`,
  // boxShadow: "2px 2px 8px 0px rgba(0, 0, 0, 0.08)",
 background: "rgba(43, 43, 43, 1)",
  padding: "8px !important",
  boxSizing: "border-box",
  // transition: "transform 0.3s ease-in-out",
  // "&:hover": {
  //   transform: "scale(1.05)",
  // },
  // background: "linear-gradient(to right, #ffffff 5 0%, #016A7090 25%)",
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

  return (
    <>
    <DashboardContainer sx={{mt:3}}>
  {/* User Profile */}
  {/* <GlassCard sx={{ height: "max-content !important" }}>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        padding: "8px !important",
      }}
      onClick={() => navigate("/user/profile")}
    >
      <Avatar
        sx={(theme) => ({
          width: 60,
          height: 60,
          marginBottom: 1,
          border: `2px solid ${theme.palette.accent.main}`,
          backgroundColor: "transparent",
          backdropFilter: "blur(10px)",
          color: "text.primary",
        })}
        src={user?.profileImage}
      >
        {user?.name?.slice(0, 1)}
      </Avatar>
      <Box>
        <Typography variant="h6" fontWeight={"bold"}>
          Welcome {user?.name}!
        </Typography>
        <Typography variant="body2">Profile | Saved Blogs</Typography>
      </Box>
    </CardContent>
  </GlassCard> */}

  {/* --- COMMENTED OUT: Last Read Blog --- */}
  {/*
  <GlassCard>
    <CardContent
      onClick={() => {
        navigate(`/blogs/${lastReadBlog._id}`);
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "8px !important",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={"bold"}
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <InterestsIcon color="primary" />
        Based on your interest
      </Typography>
      {loading && <Skeleton variant="rounded" height={46} width={"100%"} />}
      {lastReadBlog && !loading && (
        <>
          <BlogCardSlider topBlogs={[lastReadBlog]} />
        </>
      )}
      {lastReadBlog === undefined && (
        <Typography variant="caption">
          No blog read yet. Click any blog to add it here.
        </Typography>
      )}
    </CardContent>
  </GlassCard>
  */}

  {/* --- COMMENTED OUT: Trending Blogs --- */}
  {/*
  <GlassCard>
    <CardContent sx={{ padding: "8px !important" }}>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <WhatshotOutlinedIcon color="error" /> Trending blogs for you
      </Typography>
      {loading && <Skeleton variant="rounded" height={40} width={"100%"} />}
      {topBlogs.length > 0 ? (
        <BlogCardSlider topBlogs={topBlogs} interval={3000} />
      ) : (
        <Typography variant="p">No trending blogs at the moment</Typography>
      )}
    </CardContent>
  </GlassCard>
  */}

  {/* --- COMMENTED OUT: Recent Activity --- */}
  
 
<GlassCard sx={{ maxHeight: "500px" ,mt:5}}>
  <CardContent sx={{ padding: "5px" }}>
    <Typography
      variant="h6"
      fontWeight="bold"
      gutterBottom
      sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
    >
      Activities
    </Typography>
    <Typography mb={2}>John liked “state management in React”</Typography>
    <Typography mb={2}>Ganesh just posted a new blog - Testing with automation tools</Typography>
    <Typography mb={2}>Top 10 things to do in 2025 by Joseph is trending</Typography>

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

   {!loading && winners.length > 0 && (
  <Box
    key={winners[currentWinnerIndex]?._id || currentWinnerIndex}
    onClick={() => window.open(winners[currentWinnerIndex]?.blogLink, "_blank")}
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
    <Box sx={{ width: "90%", height: 100, overflow: "hidden",}}>
      <img
        src={aiImage}
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
)}
  </CardContent>
</GlassCard>
</DashboardContainer>

<WriteButton />
</>
  );
};

export default Dashboard;
