import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import AnalyzeAnimation from "./AnalyzeBlogsAnimation";
import writeIcon from "../assets/pencil-simple-line.svg";
import { Fab } from "@mui/material";
import {
  checkIsWritingEnabled,
  getWritingUnlockTimeLeft,
} from "../utilities/timerFunction";

const WriteButton = (props) => {
  const token = Cookies.get("jwtToken");
  const navigate = useNavigate();
  const [isEnabled, setIsEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateButtonState = () => {
      const enabled = checkIsWritingEnabled();
      setIsEnabled(enabled);
      setTimeLeft(enabled ? "" : getWritingUnlockTimeLeft());
    };
    updateButtonState();
    const timer = setInterval(updateButtonState, 60000); // Refresh every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {token && (
        <Fab
          variant="extended"
          disabled={!isEnabled}
          size="medium"
          onClick={() => navigate("/createblog")}
          sx={{
            backgroundColor: "accent.main",
            boxShadow: "2px 2px 4px 0px grey ",
            borderRadius: 2,
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
