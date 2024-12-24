import {
  Box,
  Grid,
  IconButton,
  Typography,
  Chip,
  Divider,
  Fab,
  Tooltip,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";

import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import RecentBlogs from "../RecentBlogs/recentBlogs";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Category from "./Category";
import aapmorlogo from "../../assets/Aapmorlogodark.png";

const categories = [
  { label: "All" },
  { label: "Fitness" },
  { label: "Technology" },
  { label: "Arts" },
  { label: "Gaming" },
  { label: "Sports" },
  { label: "Fashion" },
  { label: "Food & Health" },
  { label: "Entertainment" },
  { label: "Artificial Intelligence" },
  { label: "Science" },
  { label: "Politics" },
  { label: "International" },
  { label: "Insights" },
];
const SideBar = ({ category, setCategory }) => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "max-content",
        maxWidth: "100%",
        paddingLeft: 1,
        boxSizing: "border-box",
        position: "sticky",
        top: "10vh",
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight={600} marginTop={2}>
        Categories
      </Typography>
      {/* Category chips */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          marginBottom: 1,
        }}
      >
        {categories.map(({ label }, index) => (
          <Category
            key={index}
            setCategory={setCategory}
            label={label}
            category={category}
          />
        ))}
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mb: 1 }} />
      {jwtToken ? (
        <Tooltip
          title="Create new blog "
          arrow
          placement="left"
          sx={{ mt: 1, position: "sticky", top: 80, mb: 1 }}
        >
          <Fab
            variant="extended"
            color="error"
            size="medium"
            onClick={() => navigate("/createblog")}
            sx={{ borderRadius: 2 }}
          >
            <CreateIcon sx={{ mr: 1 }} />
            Create
          </Fab>
        </Tooltip>
      ) : (
        <Box sx={{ p: 1 }}>
          <Typography variant="caption" color={"GrayText"}>
            <span
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>{" "}
            to create blog
          </Typography>
        </Box>
      )}
      <Divider orientation="horizontal" flexItem sx={{ mt: 1 }} />
      {/* <RecentBlogs /> */}
      <Grid item p={1} m={1}>
        <img src={aapmorlogo} alt="aapmor-logo" style={{ width: "200px" }} />
        <Grid item gap={2}>
          <IconButton component="a" href="#">
            <TwitterIcon
              sx={{ color: "#00acee", height: "30px", width: "30px" }}
            />
          </IconButton>
          <IconButton component="a" href="#">
            <FacebookIcon
              color="primary"
              sx={{ color: "#1877F2", height: "30px", width: "30px" }}
            />
          </IconButton>
          <IconButton component="a" href="_blank">
            <InstagramIcon
              sx={{ color: "#ed2147", height: "30px", width: "30px" }}
            />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/company/aapmor-technologies/"
            target="_blank"
          >
            <LinkedInIcon
              sx={{ color: " #0072b1 ", height: "30px", width: "30px" }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SideBar;
