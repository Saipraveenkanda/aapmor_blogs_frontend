import { Grid, Paper, Typography } from "@mui/material";

import React from "react";
import aapmorlogo from "../../assets/Aapmorlogodark.png";

const Footer = () => {
  return (
    <Paper
      elevation={0}
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{
        position: "relative",
        bottom: "0px",
        borderRadius: "none",
        padding: "0px 24px",
        background: "linear-gradient( to top, #00000020 , #ffffff10)",
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid item>
          {/* <img
            src="https://aapmor.com/assets/img/aapmore-logo-.jpg"
            alt="aapmor-logo"
            style={{ width: "200px" }}
          /> */}
          <img width={"160px"} src={aapmorlogo} alt="logoAapmor" />
          {/* <Grid item gap={2}>
            <IconButton
              component="a"
              href="https://www.linkedin.com/company/aapmor-technologies/"
              target="_blank"
            >
              <LinkedInIcon
                sx={{ color: " #0072b1 ", height: "30px", width: "30px" }}
              />
            </IconButton>
          </Grid> */}
        </Grid>
        {/* <Grid item p={1} m={1}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "cambria Math", fontWeight: "bold" }}
          >
            Solutions
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "cambria Math" }}>
            Full Stack Development
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "cambria Math" }}>
            Testing Automation
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "cambria Math" }}>
            Data Analytics
          </Typography>
        </Grid>
        <Grid item p={1} m={1}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "cambria Math", fontWeight: "bold" }}
          >
            Quick Links
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "cambria Math" }}>
            Home
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "cambria Math" }}>
            About us
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "cambria Math" }}>
            Contact us
          </Typography>
        </Grid>
        <Grid item p={1} m={1}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "cambria Math", fontWeight: "bold" }}
          >
            Connect to us
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "cambria Math" }}>
            Phone : +19724138201
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "cambria Math" }}>
            Email : info@aapmor.com
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "cambria Math" }}
            component={"a"}
            href="https://www.aapmor.com"
            target="_blank"
          >
            www.aapmor.com
          </Typography>
        </Grid> */}
        <Grid item>
          <Typography>
            © {new Date().getFullYear()} Aapmor Technologies Inc.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Footer;
