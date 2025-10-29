import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const BlogPreview = ({
  htmlContent,
  showPreview,
  setShowPreview,
  category,
  title,
}) => {
  const formattedDate = new Date().toDateString();
  const userObj = useSelector((state) => state.user);
  const profileDetails = userObj?.userDetails;
  console.log(profileDetails);
  const { profileImage, designation, name } = profileDetails;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "85vw" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "space-around",
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: { md: "100%", xs: "100%", sm: "90%" },
            boxSizing: "border-box",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              pb: 1,
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              position: "sticky",
              top: "64px",
              backgroundColor: "transparent",
              backdropFilter: "blur(10px)",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, pb: 1, alignItems: "center" }}>
              <Avatar
                src={profileImage}
                sx={(theme) => ({
                  backgroundColor: "accent.main",
                  width: 40,
                  height: 40,
                  border: `2px solid ${theme.palette.accent.main}`,
                  backdropFilter: "blur(40px)",
                })}
              >
                <Typography color={"text.primary"}>
                  {name ? name?.split("")[0] : "U"}
                </Typography>
              </Avatar>
              <Stack direction={"column"} spacing={0}>
                <Typography variant="p">{name}</Typography>
                <Stack direction={"row"} spacing={2}>
                  <Typography variant="caption" color={"darkgray"}>
                    Created on {formattedDate}
                  </Typography>
                </Stack>
              </Stack>
              <Chip
                label={category || "Category"}
                sx={{
                  color: "#ffffff",
                  backgroundColor: "accent.main",
                }}
              />
            </Box>
            <Box sx={{ position: "sticky", top: "70px" }}>
              <Button
                title="Preview your blog before posting"
                onClick={() => setShowPreview(!showPreview)}
                sx={{
                  textTransform: "none",
                }}
                variant="outlined"
                endIcon={
                  showPreview ? (
                    <EditOutlinedIcon />
                  ) : (
                    <VisibilityIcon fontSize="small" color="warning" />
                  )
                }
              >
                {showPreview ? "Edit" : "Preview"}
              </Button>
            </Box>
          </Box>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            fontFamily={"Source sans pro"}
          >
            {title}
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <Box>
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "8rem",
                fontWeight: "bold",
                // color: "#00000014", // light transparent
                color: "text.watermark", // light transparent
                pointerEvents: "none", // so it won’t block clicks
                userSelect: "none",
                zIndex: 0,
                whiteSpace: "nowrap",
              }}
            >
              PREVIEW
            </Box>
            <div
              style={{
                whiteSpace: "pre-wrap", // preserve line breaks & spaces
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogPreview;
