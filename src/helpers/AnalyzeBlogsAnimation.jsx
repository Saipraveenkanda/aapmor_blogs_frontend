import React from "react";
import Lottie from "lottie-react";
import { Typography } from "@mui/material";
// import animation from "./Animation - 1742927284272.json";
// import animation from "./6p5NgXUsmh.lottie";
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
        // src="https://lottie.host/1b018a22-3e0f-4e7c-976a-4af179db75d0/BbesQlrzbQ.lottie"
        // src={animation}
        animationData={animation2}
        // renderer="svg"
        // background="transparent"
        // speed={2}
        style={{ width: 200, height: 200, zIndex: 1000 }}
        loop
        autoplay
        // style={{ width: "100%", height: "auto", maxWidth: "500px" }}
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
