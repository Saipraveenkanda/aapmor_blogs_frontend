import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import AnalyzeAnimation from "./AnalyzeBlogsAnimation";
// import writeIcon from "../assets/pencil-simple-line.svg";
import { Fab } from "@mui/material";
import {
  checkIsWritingEnabled,
  getWritingUnlockTimeLeft,
} from "../utilities/timerFunction";
// import pencilSimpleLine from "../assets/pencilSimpleLine.svg";
import { ReactComponent as PencilIcon } from "../assets/pencilSimpleLine.svg";
import { Padding } from "@mui/icons-material";
import Box from "@mui/material/Box";

const WriteButton = ({ profileDetails }) => {
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
        <Box
          sx={{
            position: "fixed",
            bottom: 50,
            right: 24,
            zIndex: 1200,
          }}
        >
          <Fab
            variant="extended"
            // disabled={!isEnabled}
            size="medium"
            onClick={() =>
              navigate("/createblog", {
                state: { profileDetails: profileDetails },
              })
            }
            sx={{
              backgroundColor: "#ffffff",
              // boxShadow: "2px 2px 4px 0px grey ",
              borderRadius: 13,
              width: "180px",
              height: "52px",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: "bold",
              border: "4px solid #fff",
              // "&:hover": {
              //   border: "4px solid text.primary",
              //   boxShadow: "1px 0px 4px 0px #ffffff inset",
              //   backgroundColor: "accent.main",

              // },
              color: "#000000",
              marginRight: "60px",
              marginTop: "20px",
            }}
          >
            Write
            <PencilIcon
              style={{ height: "24px", width: "24px", fill: "currentColor" }}
            />
          </Fab>
        </Box>
      )}
    </div>
  );
};

export default WriteButton;
