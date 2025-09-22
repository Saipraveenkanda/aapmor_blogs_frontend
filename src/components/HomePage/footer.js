import { Grid, Paper, Typography } from "@mui/material";

import React from "react";
import aapmorlogo from "../../assets/AAPMOR LOGO.svg";
import aapmorlighttext from "../../assets/aapmorwhitetext.svg";
import aapmortext from "../../assets/aapmortext.svg";

const Footer = () => {
  const mode = JSON.parse(localStorage.getItem("theme"));
  return (
    <Paper elevation={0} bgcolor={"background.default"} color={"text.primary"}>
      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          bottom: 0,
          left: 0,
          borderRadius: "none",
          padding: "0px 24px",
          background: "linear-gradient( to top, #00000020 , #ffffff10)",
        }}
      >
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <img src={aapmorlogo} alt="logoAapmor" />
          {mode && (
            <img src={aapmortext} alt="aapmortext" style={{ width: "120px" }} />
          )}
          {!mode && (
            <img
              src={aapmorlighttext}
              alt="aapmortext"
              style={{ width: "120px" }}
            />
          )}
        </Grid>
        <Grid item>
          <Typography>© {new Date().getFullYear()} Aapmor Inc. V3.0</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Footer;
