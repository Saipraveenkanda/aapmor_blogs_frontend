import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Typography } from "@mui/material";

const AnalyzeAnimation = ({ timeLeft }) => {
  return (
    <div>
      <Typography
        sx={{ position: "fixed", bottom: 0 }}
        variant="caption"
        fontWeight={"bold"}
        color={"error"}
      >
        {timeLeft}
      </Typography>
      <DotLottieReact
        src="https://lottie.host/1b018a22-3e0f-4e7c-976a-4af179db75d0/BbesQlrzbQ.lottie"
        background="transparent"
        speed={2}
        style={{ width: 200, height: 200 }}
        loop
        autoplay
      />
    </div>
  );
};

export default AnalyzeAnimation;
