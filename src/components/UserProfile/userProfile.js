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
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/header";
import { profileCheckingApi } from "../ApiCalls/apiCalls";

const UserProfile = (props) => {
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState({});

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  useEffect(() => {
    const getProfile = async () => {
      const response = await profileCheckingApi();
      if (response) {
        setProfile(response.data.res);
      }
    };
    getProfile();
  }, []);

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
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Card
          sx={{
            width: "50%",
            height: "auto",
            p: 2,
            display: "flex",
            flexDirection: "row",

            backgroundColor: "transparent",
            backdropFilter: "blur(20px)",
            boxShadow: "2px 2px 16px 3px #2196f3",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              maxWidth: "50%",
              gap: 1.5,
            }}
          >
            <Typography variant="h5">Profile Update</Typography>
            <TextField
              required
              size="small"
              value={profile.name}
              // label="Full Name"
              disabled={profile.name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">
                Designation *
              </InputLabel>
              <Select
                onChange={(e) => setDesignation(e.target.value)}
                value={profile.designation}
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
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel id="demo-simple-select-label">Gender *</InputLabel>
              <Select
                value={profile.gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              multiline
              placeholder="Few lines about you"
              rows={4}
              label="Bio"
            />
            <TextField
              size="small"
              value={name}
              label="Location"
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="outlined">Save</Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              gap: 2,
            }}
          >
            <Avatar
              component="label"
              htmlFor="uploadImage"
              src={image}
              alt="profile picture"
              sx={{
                height: "200px",
                width: "200px",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "1px 1px 8px 0px red",
                },
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
            <Button
              variant="text"
              sx={{ cursor: "pointer", color: "red" }}
              disableFocusRipple
              onClick={() => setImage("")}
            >
              Remove image
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default UserProfile;
