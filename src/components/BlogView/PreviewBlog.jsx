import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

const BlogPreview = ({ htmlContent, showPreview, setShowPreview }) => {
  return (
    <>
      {showPreview && (
        <Box>
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
      )}
    </>
  );
};

export default BlogPreview;
