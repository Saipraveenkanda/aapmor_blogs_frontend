import React from "react";
import Lottie from "lottie-react";
import { Typography } from "@mui/material";
import animation from "./analyzeAnimation.json";
import animation2 from "./analyzenewanimation.json";

const AnalyzeAnimation = ({ timeLeft }) => {
  return (
    <div
      style={{
        position: "absolute",
        overflow: "hidden",
        bottom: -10,
        zIndex: 1000,
        width: "90%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Lottie
        animationData={animation2}
        // speed={2}
        style={{ width: 200, height: 200, zIndex: 1000 }}
        loop
        autoplay
        rendererSettings={{
          preserveAspectRatio: "xMidYMid meet",
        }}
      />
      <Typography
        sx={{ position: "fixed", bottom: 0, right: "60px" }}
        variant="caption"
        fontWeight={"bold"}
        color={"error"}
        textAlign={"center"}
      >
        {timeLeft}
      </Typography>
    </div>
  );
};

export default AnalyzeAnimation;
