import {
  Box,
  Card,
  TextField,
  FormControl,
  InputLabel,
  Button,
  Select,
  Typography,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/header";
import { profileCheckingApi, profileUpdateApi } from "../ApiCalls/apiCalls";
import Cookies from "js-cookie";
import BottomNavbar from "../BottomNavigation/bottomNavigation";

const UserProfile = (props) => {
  const [designation, setDesignation] = useState("");
  const [profile, setProfile] = useState({});
  const [gender, setGender] = useState(profile?.gender || "");
  const [name, setName] = useState(profile?.name || "");
  // const [image, setImage] = useState("");
  const [email, setEmail] = useState(profile?.email || "");
  console.log(profile, "PROFILE");

  // const handleFileUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file);
  //   setImage(base64);
  // };

  useEffect(() => {
    const getProfile = async () => {
      const response = await profileCheckingApi();
      if (response) {
        const profile = response.data.res;
        setProfile(profile);
        setName(profile?.name);
        setEmail(profile?.email);
        setGender(profile?.gender);
        setDesignation(profile.designation);
      }
    };
    getProfile();
  }, []);

  const updateProfile = async () => {
    const profileDetails = {
      gender,
      designation,
      email,
      name: name,
      isProfileUpdated: true,
    };
    const response = await profileUpdateApi(profileDetails);
    console.log(response, "UPDATED PROFILE");
    if (response?.status === 200) {
      const profile = response?.data?.profile;
      Cookies.set("userEmail", profile?.email);
      Cookies.get("username", profile?.name);
      Cookies.get("userrole", profile?.designation);
      window.history.back();
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          // alignItems: "center",
          height: "85vh",
          // paddingLeft: 2,
        }}
      >
        <Card
          sx={{
            // width: "50%",
            "@media(max-width:480px)": {
              width: "100%",
            },
            "@media(min-width:481px)": {
              width: "50%",
            },
            height: "auto",
            p: 2,
            display: "flex",
            flexDirection: "row",

            backgroundColor: "transparent",
            backdropFilter: "blur(20px)",
            // boxShadow: "2px 2px 16px 3px #2196f3",
          }}
          elevation={0}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // width: "50%",
              // maxWidth: "50%",
              "@media(max-width:480px)": {
                width: "100%",
              },
              "@media(min-width:481px)": {
                width: "50%",
              },
              gap: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#016A70" }}
            >
              Profile Update
            </Typography>
            {/* Image */}
            {/* <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Avatar
                component="label"
                htmlFor="uploadImage"
                src={image}
                alt="profile picture"
                sx={{
                  height: "60px",
                  width: "60px",
                  cursor: "pointer",
                }}
              />
              <input
                accept="image/*"
                id="uploadImage"
                style={{ display: "none" }}
                type="file"
                alt="profile-image"
                onChange={handleFileUpload}
              />
            </Stack> */}
            {/* Name */}
            <TextField
              required
              size="small"
              helperText="Update your user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Designation */}
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">
                Designation *
              </InputLabel>
              <Select
                onChange={(e) => setDesignation(e.target.value)}
                value={designation}
                required
                label="Designation"
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Devops">Devops</MenuItem>
                <MenuItem value="QA">QA</MenuItem>
                <MenuItem value="Data Science">Data Science</MenuItem>
                <MenuItem value="Data Analyst">Data Analyst</MenuItem>
                <MenuItem value="Full Stack Developer">
                  Full Stack Developer
                </MenuItem>
                <MenuItem value="UI / UX">UI / UX</MenuItem>
                <MenuItem value="Business Analyst">Business Analyst</MenuItem>
                <MenuItem value="SAP ABAP Consultant">
                  SAP ABAP Consultant
                </MenuItem>
                <MenuItem value="SAP GRC Consultant">
                  SAP GRC Consultant
                </MenuItem>
              </Select>
              <FormHelperText>Update your designation</FormHelperText>
            </FormControl>
            {/* Gender */}
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Gender *</InputLabel>
              <Select
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <FormHelperText>Update your gender</FormHelperText>
            </FormControl>
            {/* Email */}
            <TextField
              helperText="Update your email"
              rows={4}
              label="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              onClick={updateProfile}
              sx={{
                boxShadow: "-4px 4px 4px 0px #016A7050",
                textTransform: "none",
                color: "#016A70",
                borderColor: "#016A70",
                "&:hover": {
                  borderColor: "#016A70",
                  backgroundColor: "unset",
                },
              }}
              variant="outlined"
            >
              Update
            </Button>
          </Box>
        </Card>
      </Box>
      <BottomNavbar />
    </>
  );
};

export default UserProfile;
