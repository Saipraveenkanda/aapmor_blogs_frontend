import React from "react";
import { Box, Typography } from "@mui/material";

const BestBlogRibbon = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #016A70, #016A70)",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.5rem",
        padding: "8px 24px",
        borderRadius: "8px",
        border: "4px groove  #E6B800",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontWeight: "bold",
          fontSize: "1.1rem",
          filter: "drop-shadow(0px 4px 6px rgba(255, 223, 0, 0.5))",
          textShadow: "-1px -1px 2px black",
        }}
      >
        Blog of the Month
      </Typography>
      <Typography
        component="span"
        sx={{
          position: "absolute",
          top: "-20px",
          left: "42.5%",
          color: "#FFD700",
          fontSize: "1.5rem",
          filter: "drop-shadow(0px 4px 6px rgba(255, 223, 0, 0.5))",
          textShadow: "0px -1px 0 black",
        }}
      >
        ⭐
      </Typography>

      <Typography
        component="span"
        sx={{
          position: "absolute",
          top: "-25px",
          left: "25%",
          color: "#FFD700",
          fontSize: "1.5rem",
          filter: "drop-shadow(0px 4px 6px rgba(255, 223, 0, 0.5))",
          textShadow: "-1px -1px 0 black",
        }}
      >
        ⭐
      </Typography>
      <Typography
        component="span"
        sx={{
          position: "absolute",
          top: "-25px",
          right: "25%",
          color: "#FFD700",
          fontSize: "1.5rem",
          filter: "drop-shadow(0px 4px 6px rgba(255, 223, 0, 0.5))",
          textShadow: "1px -1px 0 black",
        }}
      >
        ⭐
      </Typography>
      {/* Main Ribbon Text */}
    </Box>
  );
};

export default BestBlogRibbon;
