import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

const BlogPreview = ({ htmlContent }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <IconButton
        title="Preview your blog before posting"
        onClick={() => setShowPreview(true)}
        sx={{
          position: "fixed",
          top: "66px",
          right: "40px",
          //   gap: 0.5,
          textTransform: "none",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
        // endIcon={}
      >
        {/* Preview */}
        <VisibilityIcon fontSize="medium" color="warning" />
        {/* <Typography fontWeight={"bold"} variant="caption">
          Preview
        </Typography> */}
      </IconButton>

      {showPreview && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "background.default",
            display: "flex",
            color: "text.primary",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowPreview(false)}
        >
          <div
            style={{
              backgroundColor: "background.default",
              color: "text.primary",
              padding: "0px 20px",
              borderRadius: "8px",
              maxWidth: "80vw",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              border: "1px solid #ffffff",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
          >
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "background.default",
              }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                Blog Preview
              </Typography>
              <IconButton onClick={() => setShowPreview(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <div
              style={{
                whiteSpace: "pre-wrap", // preserve line breaks & spaces
              }}
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </Box>
      )}
    </>
  );
};

export default BlogPreview;
