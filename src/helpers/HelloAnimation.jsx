import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const HelloAnimation = ({ username }) => {
  const text = `Hello ${username}`; // The text to animate
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 60); // Adjust speed of typing here
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#016A70",
          textShadow: "0px 0px 10px rgba(1, 106, 112, 0.5)",
          borderRight: "2px solid #016A70", // Cursor effect
          paddingRight: "5px",
          // animation: "blinkCursor 0.8s  fadeIn 1s ease-out",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {displayedText}
      </Typography>

      <Box
        sx={{
          display: "inline-block",
          fontSize: "20px",
          marginLeft: "10px",
          animation: "waveHand 1.5s infinite ease-in-out",
        }}
      >
        👋
      </Box>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes blinkCursor {
            50% { border-color: transparent; }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes waveHand {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(-10deg) scale(1.1); }
            50% { transform: rotate(10deg) scale(1.05); }
            75% { transform: rotate(-5deg) scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default HelloAnimation;
