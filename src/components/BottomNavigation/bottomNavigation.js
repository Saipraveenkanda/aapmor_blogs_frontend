import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import Cookies from "js-cookie";

const BottomNavbar = (props) => {
  const tab = Cookies.get("selectedTab");
  const token = Cookies.get("jwtToken");
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(tab || "home");

  const handleChange = (path) => {
    Cookies.set("selectedTab", path);
    setSelectedTab(path);
    navigate(
      path === "createblog"
        ? "/createblog"
        : path === "home"
        ? "/"
        : `/user/${path}`
    );
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
      <BottomNavigation value={selectedTab}>
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeOutlinedIcon />}
          onClick={(e) => handleChange("home")}
        />
        {token && (
          <BottomNavigationAction
            label="Create"
            value="createblog"
            icon={<CreateOutlinedIcon />}
            onClick={(e) => handleChange("createblog")}
          />
        )}
        <BottomNavigationAction
          label="Saved"
          value="saved"
          icon={<BookmarkBorderOutlinedIcon />}
          onClick={(e) => handleChange("saved")}
        />
        <BottomNavigationAction
          label="Settings"
          value="profile"
          icon={<SettingsOutlinedIcon />}
          onClick={(e) => handleChange("profile")}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavbar;
