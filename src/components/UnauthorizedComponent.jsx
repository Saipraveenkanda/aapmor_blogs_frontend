import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Lock } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 65px)",
        textAlign: "center",
        background: "linear-gradient(to bottom, #f8f9fa, #e9ecef)",
      }}
    >
      <Lock size={80} color="#D32F2F" />
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mt: 2, color: "#D32F2F" }}
      >
        Access Denied
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
        You don’t have authorization to view this page. Please contact
        administrator for admin rights.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3, backgroundColor: "#016A70" }}
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default UnauthorizedPage;
