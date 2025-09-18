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
  Badge,
  List,
  ListItem,
  ListItemText,
  Popover,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import BookIcon from "@mui/icons-material/Book";
import aapmorlogo from "../../assets/AAPMOR LOGO.svg";
import aapmortext from "../../assets/aapmortext.svg";
import aapmorLightText from "../../assets/aapmorwhitetext.svg";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { setAppTheme } from "../../store/slices/blogSlice";
import { useDispatch } from "react-redux";
import { listenToNotifications } from "../../socket";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { timeAgo } from "../../utilities/timerFunction";
// import notificationAudio from "../../assets/sounds/notification-pluck-off.mp3";
import { toast } from "react-toastify";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import {
  deleteNotifications,
  getNotifications,
} from "../../providers/dashboardProvider";
import { profileCheckingApi } from "../../providers/userProvider";
import Admin from "../../assets/Admin.svg";
import Icon from "../../assets/Icon.svg";
import Face6OutlinedIcon from "@mui/icons-material/Face6Outlined";
import Face3OutlinedIcon from "@mui/icons-material/Face3Outlined";

const Header = ({ setSearchInput = () => {}, setProfile }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [placeholder, setPlaceholder] = useState("Search by User...");
  const [isAdmin, setIsAdmin] = useState(false);
  const [mode, setMode] = useState(JSON.parse(localStorage.getItem("theme")));
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const handleToggle = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  const [user, setUser] = useState({});
  const open = Boolean(anchorEl);
  const openNotifications = Boolean(notificationAnchorEl);
  const id = open ? "notifications-popper" : undefined;
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState("");
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

  useEffect(() => {
    getNotificationsData();
    listenToNotifications((data) => {
      setNotifications((prev) => [data, ...prev]);
    });
  }, []);

  const getNotificationsData = async () => {
    const response = await getNotifications();
    if (response) {
      setNotifications(response?.data?.notifications);
    }
  };
  const getUserDetail = async () => {
    const response = await profileCheckingApi();
    if (response) {
      if (response.status === 202) {
        setProfile(true);
      }
      setIsAdmin(
        response?.data?.res?.admin ? response?.data?.res?.admin : false
      );
      setUserId(response?.data?.res?._id);
      setUser(response?.data?.res);
    }
  };

  const handleClearNotifications = async () => {
    try {
      const response = await deleteNotifications(userId);
      if (response) {
        setNotifications([]);
      }
      // toast.success("All notifications cleared!");
    } catch (err) {
      console.error("Clear notifications error:", err);
      toast.error("Failed to clear notifications");
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
    "Search Author",
    "Search Blog Title",
    "Search Month",
    "Search Category",
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
        // borderBottom: "0.5px solid lightgrey",
        color: "#000",
        // zIndex: 10,
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
          {mode && (
            <img src={aapmortext} alt="aapmortext" style={{ width: "120px" }} />
          )}
          {!mode && (
            <img
              src={aapmorLightText}
              alt="aapmortext"
              style={{ width: "120px" }}
            />
          )}
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
            color={"white"}
            fontFamily={"san-serif"}
            fontWeight={500}
            fontSize={30}
            sx={{
              color: mode ? "#767676" : "#ffffff",
              transition: "color 0.3s ease-in-out",
            }}
          >
            Blogs
          </Typography>
        </Box>
        {/* <Box
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
        </Box> */}

        {/* WEB NAVIGATION AFTER LOGIN */}
        <Stack spacing={1} alignItems={"center"} direction={"row"}>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              width: "50%",
              backgroundColor: "#transparent",
              border: "1px solid #767676",
              borderRadius: 8,
              pr: 2,
            }}
          >
            {" "}
            <SearchOutlined
              color="action"
              sx={{
                cursor: "pointer",
                color: mode ? "#666666" : "#ddcdcdff",
                ml: 2,
              }}
            />
            <InputBase
              sx={{
                p: 0.5,
                pl: 1,
                color: mode ? "#666666" : "#cccccc",
                boxSizing: "border-box",
                "& input::placeholder": {
                  color: mode ? "#666666" : "#cccccc",
                  opacity: 1,
                  transition: "color 0.3s ease-in-out",
                  animation: "slideUp 2s ease-in-out infinite",
                },
              }}
              type="search"
              placeholder={placeholder}
              fullWidth
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Box>
          {/* Profile Icon */}
          {token !== undefined && (
            <IconButton
              size="small"
              onClick={() => navigate("/user/profile")}
              title={user?.name || "Profile"}
            >
              {user?.gender === "Male" ? (
                <Face6OutlinedIcon />
              ) : (
                <Face3OutlinedIcon />
              )}
            </IconButton>
          )}
          <IconButton
            size="small"
            // sx={(theme) => ({
            //   border: `1px solid ${theme.palette.accent.main}`,
            // })}
            onClick={() => setMode(!mode)}
            title={mode ? "Light Mode" : "Dark Mode"}
          >
            {mode ? <LightModeIcon /> : <NightsStayIcon />}
          </IconButton>
          {token !== undefined && (
            <IconButton
              size="small"
              // sx={(theme) => ({
              //   border: `1px solid ${theme.palette.accent.main}`,
              // })}
              onClick={handleToggle}
              title={"Notifications"}
            >
              <Badge badgeContent={notifications?.length} color="primary">
                <img
                  src={Icon}
                  alt="Notifications"
                  style={{
                    width: 24,
                    height: 24,
                    filter: mode
                      ? "invert(70%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(85%)" // Light gray for dark mode
                      : "invert(30%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(90%)",
                  }}
                />
              </Badge>
            </IconButton>
          )}
          {token !== undefined ? (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
                color: "grey",
              }}
            >
              {/* ADMIN ICON */}

              {isAdmin && (
                <IconButton
                  title="Admin"
                  onClick={() => navigate("/admin")}
                  size="small"
                  // sx={(theme) => ({
                  //   border: `1px solid ${theme.palette.accent.main}`,
                  // })}
                >
                  <img
                    src={Admin}
                    alt="Admin"
                    style={{
                      width: 24,
                      height: 24,
                      filter: mode
                        ? "invert(70%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(85%)" // Light gray for dark mode
                        : "invert(30%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(90%)",
                    }}
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
                  border: " 1px solid #767676",
                  textTransform: "none",
                  color: "text.secondary",
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
      <Popover
        id={id}
        open={openNotifications}
        anchorEl={notificationAnchorEl}
        onClose={() => setNotificationAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 360,
            // maxHeight: 400,
            // overflowY: "auto",
            p: 2,
            borderRadius: 4,
            background:
              "linear-gradient(-135deg, transparent 10%, transparent)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "text.primary",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zindex: 1,
            backgroundColor: "transparent",
            backdropFilter: "blur(50px)",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 1,
              textAlign: "left",
              letterSpacing: 0.5,
            }}
          >
            🔔 Notifications
          </Typography>
          <Button
            disabled={notifications?.length === 0}
            variant="ghost"
            startIcon={<DeleteSweepOutlinedIcon size={16} />}
            onClick={handleClearNotifications}
            sx={{ textTransform: "none" }}
          >
            Clear
          </Button>
        </Box>

        {notifications?.length === 0 ? (
          <Typography
            variant="body2"
            // color="#fff"
            sx={{ textAlign: "center", mt: 2 }}
          >
            You're all caught up 👌
          </Typography>
        ) : (
          <List
            dense
            sx={{ height: "500px", overflowY: "auto", scrollbarWidth: "none" }}
          >
            {notifications?.map((n, idx) => (
              <Box key={idx}>
                <ListItem
                  alignItems="flex-start"
                  sx={(theme) => ({
                    background: "rgba(255, 255, 255, 0.15)",
                    borderRadius: 3,
                    border: `0.5px solid ${theme.palette.accent.main}`,
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(10px)",
                    px: 2,
                    py: 1.5,
                    mb: 1.5,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    transition: "0.3s ease",
                    "&:hover": {
                      background: `${theme.palette.accent.main}20`,
                      backdropFilter: "blur(40px)",
                    },
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                  })}
                  component="a"
                  href={`/blogs/${n.blogId}`}
                  // onClick={() => navigate(`/blogs/${n.blogId}`)}
                >
                  <Avatar
                    src={n?.sender?.profileImage}
                    sx={{ width: 24, height: 24 }}
                  />
                  <ListItemText
                    primary={n.message}
                    secondary={timeAgo(n.timestamp)}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 500,
                      marginTop: -1,
                      color: "text.primary",
                    }}
                    secondaryTypographyProps={{
                      fontSize: 12,
                      color: "text.secondary",
                    }}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        )}
      </Popover>
    </AppBar>
  );
};

export default Header;
