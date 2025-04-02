import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Box,
  Divider,
  Typography,
  InputBase,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Stack,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import BookIcon from "@mui/icons-material/Book";
import aapmorlogo from "../../assets/AAPMOR LOGO.svg";
import aapmortext from "../../assets/aapmortext.svg";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"; // import "./SearchBar.css";
import { profileCheckingApi } from "../ApiCalls/apiCalls";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { setAppTheme } from "../Slices/blogSlice";
import { useDispatch } from "react-redux";

const Header = ({ setSearchInput = () => {} }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [placeholder, setPlaceholder] = useState("Search by User...");
  const [isAdmin, setIsAdmin] = useState(false);
  const [mode, setMode] = useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    localStorage.setItem("theme", mode);
    dispatch(setAppTheme(mode));
  }, [mode]);

  useEffect(() => {
    getUserDetail();
  }, []);
  const getUserDetail = async () => {
    const response = await profileCheckingApi();
    if (response) {
      setIsAdmin(
        response?.data?.res?.admin ? response?.data?.res?.admin : false
      );
    }
  };

  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");
  const name = Cookies.get("username");

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("username");
    Cookies.remove("userrole");
    navigate("/login");
  };
  const placeholderMessages = [
    "Search by User Name...",
    "Search by Blog Title...",
    "Search by Month...",
    "Search by Category...",
    // "Search by Keywords...",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholderMessages[index]);
      index = (index + 1) % placeholderMessages.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar
      position="sticky"
      top={0}
      sx={{
        background: "transparent",
        backdropFilter: "blur(24px)",
        borderBottom: "0.5px solid lightgrey",
        color: "#000",
        zIndex: 10,
      }}
      elevation={0}
    >
      <Toolbar
        // bgcolor={"transparent"}
        color={"#000"}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => {
            Cookies.set("selectedTab", "home");
            navigate("/");
          }}
        >
          <img src={aapmorlogo} alt="logoAapmor" />
          <img src={aapmortext} alt="aapmortext" style={{ fill: "#fff" }} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderRightWidth: 2,
              backgroundColor: "#FFFFFF",
              height: "30px",
              alignSelf: "center",
            }}
          />
          <Typography
            variant="h6"
            color={"accent.main"}
            fontFamily={"Playwrite CO Guides, serif"}
            fontWeight={500}
          >
            Blogs
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            width: "30%",
            backgroundColor: "#transparent",
            border: "0.5px solid lightgrey",
            borderRadius: 8,
            pr: 2,
          }}
        >
          <InputBase
            // className="animated-placeholder"
            sx={{
              p: 0.5,
              pl: 2,
              color: "text.secondary",
              boxSizing: "border-box",
              "&::placeholder": {
                color: "grey",
                opacity: 1,
                animation: "slideUp 2s ease-in-out infinite",
              },
            }}
            type="search"
            placeholder={placeholder}
            fullWidth
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchOutlined
            color="action"
            sx={{ cursor: "pointer", color: "accent.main" }}
          />
        </Box>

        {/* WEB NAVIGATION AFTER LOGIN */}
        <Stack spacing={2} alignItems={"center"} direction={"row"}>
          <IconButton
            sx={(theme) => ({
              border: `1px solid ${theme.palette.accent.main}`,
            })}
            onClick={() => setMode(!mode)}
            title={mode ? "Light Mode" : "Dark Mode"}
          >
            {mode ? <LightModeIcon /> : <NightsStayIcon />}
          </IconButton>
          {token !== undefined ? (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
                color: "grey",
              }}
            >
              {/* <Button
              variant="text"
              color="inherit"
              disableElevation
              onClick={() => navigate("/user/profile")}
              sx={{ textTransform: "none", borderRadius: 4 }}
            >
              Profile
            </Button> */}
              {/* <Divider orientation="vertical" flexItem color="#fff" /> */}
              {/* <Button
              variant="text"
              color="inherit"
              disableElevation
              onClick={() => navigate("/user/saved")}
              sx={{ textTransform: "none", borderRadius: 4 }}
            >
              Saved
            </Button> */}
              {/* <Divider orientation="vertical" flexItem color="#fff" /> */}
              {/* <Button
              variant="text"
              color="inherit"
              disableElevation
              href="/user/blogs"
              sx={{ textTransform: "none", borderRadius: 4 }}
              // disabled
            >
              Your blogs
            </Button> */}
              {/* <Divider orientation="vertical" flexItem color="#fff" /> */}
              {/* <Tooltip title="logout"> */}
              {/* ADMIN ICON */}

              {isAdmin && (
                <IconButton onClick={() => navigate("/admin")}>
                  <AdminPanelSettingsOutlinedIcon
                    sx={{ color: "accent.main" }}
                    fontSize="medium"
                  />
                </IconButton>
              )}
              <Button
                size="small"
                variant="text"
                color="inherit"
                disableElevation
                sx={(theme) => ({
                  borderRadius: 4,
                  border: `0.5px solid ${theme.palette.accent.main}`,
                  textTransform: "none",
                  color: "text.primary",
                })}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Tooltip
              title="Login to access more features"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Button
                size="small"
                variant="text"
                color="inherit"
                disableElevation
                sx={(theme) => ({
                  borderRadius: 4,
                  border: `0.5px solid ${theme.palette.accent.main}`,
                  textTransform: "none",
                  color: "text.primary",
                })}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Tooltip>
          )}
        </Stack>

        {/* MOBILE MENU ITEM */}

        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {name?.split("")[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <BookIcon fontSize="small" />
              </ListItemIcon>
              Your Blogs
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
