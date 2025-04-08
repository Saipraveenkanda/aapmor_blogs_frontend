import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AnalyzeAnimation from "./AnalyzeBlogsAnimation";
import writeIcon from "../assets/pencil-simple-line.svg";
import { Box, Fab } from "@mui/material";

const WriteButton = (props) => {
  const token = Cookies.get("jwtToken");
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const updateButtonState = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDate();

      const startOfEnable = new Date(year, month, 8, 0, 0, 0); // 8th of the month
      const endOfEnable = new Date(year, month, 27, 23, 59, 59); // 27th of the month

      if (now >= startOfEnable && now <= endOfEnable) {
        setIsEnabled(true);
        setTimeLeft("");
      } else {
        setIsEnabled(false);
        const nextEnableDate =
          now < startOfEnable ? startOfEnable : new Date(year, month + 1, 8);
        const timeDifference = nextEnableDate - now;

        // Convert to days, hours, minutes
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);

        setTimeLeft(
          `Analyzing entries... Writing unlocks in ${days}d ${hours}h ${minutes}m`
        );
      }
    };

    updateButtonState();
    const timer = setInterval(updateButtonState, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);
  return (
    <div>
      {token && (
        <Fab
          variant="extended"
          // color="inherit"
          disabled={!isEnabled}
          size="medium"
          onClick={() => navigate("/createblog")}
          sx={{
            backgroundColor: "accent.main",
            boxShadow: "2px 2px 4px 0px grey ",
            borderRadius: 2,
            // position: "fixed",
            // bottom: 30,
            // right: 30,
            width: "180px",
            height: "52px",
            textTransform: "none",
            fontSize: "16px",
            border: "4px solid #fff",
            "&:hover": {
              border: "4px solid text.primary",
              boxShadow: "1px 0px 4px 0px #ffffff inset",
              backgroundColor: "accent.main",
            },
            color: "#ffffff",
          }}
        >
          {/* <CreateIcon sx={{ mr: 1 }} /> */}
          <img
            src={writeIcon}
            alt="write_icon"
            style={{ height: "30px", paddingRight: "8px" }}
          />
          Write
        </Fab>
      )}
    </div>
  );
};

export default WriteButton;
