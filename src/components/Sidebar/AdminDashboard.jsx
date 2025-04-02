import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import BlogCardSlider from "./BlogCardSlider";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import InterestsIcon from "@mui/icons-material/Interests";
import { useNavigate } from "react-router-dom";
import AnalyzeAnimation from "../../helpers/AnalyzeBlogsAnimation";

const DashboardContainer = styled("div")({
  position: "fixed",
  right: 0,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
  boxSizing: "border-box",
  // background: "linear-gradient(to left, #016A70 0.5%, #ffffff)",
  // background: "linear-gradient(to right, #ffffff 80%, #016A7090 95%)",
  borderRadius: "12px",
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",
  maxHeight: "calc(100vh - 64px)",
  height: "calc(100vh - 64px)",
});

const GlassCard = styled(Card)(({ theme }) => ({
  flexGrow: 1,
  cursor: "pointer",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  borderLeft: `2px solid ${theme.palette.accent.main}`,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  color: theme.palette.text.secondary,
  padding: "8px !important",
  boxSizing: "border-box",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  background: "linear-gradient(to right, #ffffff 5 0%, #016A7090 25%)",
}));

const Dashboard = ({ username, profileDetails }) => {
  const navigate = useNavigate();
  const blogObj = useSelector((state) => state.blogs);
  const recentBlogsList = blogObj.blogs;
  const currentDate = new Date();
  const [loading, setLoading] = useState(true);
  const currentMonth = currentDate.getMonth() - 1; // 0-based index (0 = January, 11 = December)
  const currentYear = currentDate.getFullYear();
  const [topBlogs, setTopBlogs] = useState([]);
  const [lastReadBlog, setLastReadBlog] = useState({});

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

  return (
    <DashboardContainer>
      {/* User Profile */}
      <GlassCard sx={{ height: "max-content !important" }}>
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
            src={profileDetails?.profileImage}
          >
            {username?.slice(0, 1)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={"bold"}>
              Welcome {username}!
            </Typography>
            <Typography variant="body2">Profile | Saved Blogs</Typography>
          </Box>
        </CardContent>
      </GlassCard>
      {/* Last Read Blog */}
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
              {/* <Typography variant="caption" sx={{ alignSelf: "flex-end" }}>
                continue...
              </Typography> */}
            </>
          )}
          {lastReadBlog === undefined && (
            <Typography variant="caption">
              No blog read yet. Click any blog to add it here.
            </Typography>
          )}
        </CardContent>
      </GlassCard>

      {/* Trending Blogs */}
      <GlassCard>
        <CardContent sx={{ padding: "8px !important" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <WhatshotOutlinedIcon color="error" /> Trending blogs{" "}
            {/* {monthName} */} for you
          </Typography>
          {loading && <Skeleton variant="rounded" height={40} width={"100%"} />}
          {topBlogs.length > 0 ? (
            <BlogCardSlider topBlogs={topBlogs} interval={3000} />
          ) : (
            <Typography variant="p">No trending blogs at the moment</Typography>
          )}
        </CardContent>
      </GlassCard>

      {/* Recent Activity */}
      <GlassCard>
        <CardContent sx={{ padding: "8px !important" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <ScheduleOutlinedIcon color="warning" />
            Recent Activity
          </Typography>
          <Typography variant="body2">
            John liked "State Management in React"
          </Typography>
        </CardContent>
      </GlassCard>

      {/* Write Button */}
      <GlassCard>
        <CardContent sx={{ padding: "8px !important", height: "60px" }}>
          {/* <Box
            sx={{
              position: "absolute",
              overflow: "hidden",
              bottom: -10,
              zIndex: 1000,
              width: "90%",
              display: "flex",
              justifyContent: "center",
            }}
          > */}
          <AnalyzeAnimation />
          {/* </Box> */}
        </CardContent>
      </GlassCard>
    </DashboardContainer>
  );
};

export default Dashboard;
