import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

const BottomNavbar = (props) => {
  const [value, setValue] = React.useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeOutlinedIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={<SearchOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Saved"
          value="saved"
          icon={<BookmarkBorderOutlinedIcon />}
          onClick={() => navigate("/user/saved")}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<SettingsOutlinedIcon />}
          onClick={() => navigate("/profile")}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
