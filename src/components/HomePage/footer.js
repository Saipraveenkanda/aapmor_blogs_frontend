import { Grid, IconButton, Paper, Typography } from "@mui/material";

import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Paper
      elevation={5}
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ position: "relative", bottom: "0px", maxWidth: "100vw" }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          flexWrap: "wrap",
          paddingTop: "20px",
          paddingBottom: "10px",
          bottom: "100px",
        }}
      >
        <Grid item p={1} m={1}>
          <img
            src="https://aapmor.com/assets/img/aapmore-logo-.jpg"
            alt="aapmor-logo"
            style={{ width: "200px" }}
          />
          <Grid item gap={2}>
            <IconButton component="a" href="#">
              <TwitterIcon
                sx={{ color: "#00acee", height: "30px", width: "30px" }}
              />
            </IconButton>
            <IconButton component="a" href="#">
              <FacebookIcon
                color="primary"
                sx={{ color: "#1877F2", height: "30px", width: "30px" }}
              />
            </IconButton>
            <IconButton component="a" href="_blank">
              <InstagramIcon
                sx={{ color: "#ed2147", height: "30px", width: "30px" }}
              />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/company/aapmor-technologies/"
              target="_blank"
            >
              <LinkedInIcon
                sx={{ color: " #0072b1 ", height: "30px", width: "30px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item p={1} m={1}>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Footer;
