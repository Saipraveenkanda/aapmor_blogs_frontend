import React, { useState } from "react";
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
import LoginIcon from "@mui/icons-material/Login";
import BookIcon from "@mui/icons-material/Book";
import aapmorlogo from "../../assets/Aapmorlogo.png";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("username");
    Cookies.remove("userrole");
    navigate("/login");
  };

  return (
    <AppBar position="sticky" top={0}>
      <Toolbar
        bgcolor={"background.default"}
        color={"text.primary"}
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
          onClick={() => navigate("/")}
        >
          <img width={"160px"} src={aapmorlogo} alt="logoAapmor" />
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
            color={"#ffffff"}
            fontFamily={"Playwrite CO Guides, serif"}
          >
            Blogs
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            width: "30%",
            backgroundColor: "#ffffff95",
            pl: 1,
            pr: 1,
            borderRadius: 2,
          }}
        >
          <InputBase type="search" placeholder="Search..." fullWidth disabled />
          <SearchOutlined color="primary" sx={{ cursor: "not-allowed" }} />
        </Box>

        {/* WEB NAVIGATION AFTER LOGIN */}

        {token !== undefined ? (
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <Button
              variant="text"
              color="inherit"
              disableElevation
              onClick={() => navigate("/user/profile")}
            >
              Profile
            </Button>
            {/* <Divider orientation="vertical" flexItem color="#fff" /> */}
            <Button
              variant="text"
              color="inherit"
              disableElevation
              onClick={() => navigate("/user/saved")}
            >
              Saved
            </Button>
            {/* <Divider orientation="vertical" flexItem color="#fff" /> */}
            <Button
              variant="text"
              color="inherit"
              disableElevation
              href="/user/blogs"
              disabled
            >
              Your blogs
            </Button>
            {/* <Divider orientation="vertical" flexItem color="#fff" /> */}
            <Tooltip title="logout">
              <Button
                variant="text"
                color="inherit"
                disableElevation
                sx={{ gap: 1 }}
                onClick={handleLogout}
              >
                <Stack direction={"column"} alignItems={"center"}>
                  <LogoutIcon />
                  <Typography variant="caption" fontSize={10}>
                    Logout
                  </Typography>
                </Stack>
              </Button>
            </Tooltip>
          </Box>
        ) : (
          <Tooltip
            title="Login to access more features"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Button
              xs={1}
              variant="text"
              color="inherit"
              onClick={() => navigate("/login")}
              sx={{ alignItems: "center", gap: 1 }}
            >
              <Stack direction={"column"} alignItems={"center"}>
                <LoginIcon />

                <Typography variant="caption" fontSize={10}>
                  Login
                </Typography>
              </Stack>
            </Button>
          </Tooltip>
        )}

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
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
