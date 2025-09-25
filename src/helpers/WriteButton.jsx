import React from "react";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import { ReactComponent as PencilIcon } from "../assets/pencilSimpleLine.svg";
import Box from "@mui/material/Box";
import { token } from "../utilities/authUtils";

const WriteButton = () => {
  const navigate = useNavigate();
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
            onClick={() => navigate("/createblog")}
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: 13,
              width: "180px",
              height: "52px",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: "bold",
              border: "4px solid #fff",
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
