import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Box,
  Alert,
  Stack,
} from "@mui/material";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { profileUpdateApi } from "../../providers/userProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 2,
};

const ProfilePopup = ({ profile, handleClose, setProfile }) => {
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [profileSaveButtonDisabled, setProfileSaveButtonDisabled] =
    useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const email = Cookies.get("userEmail");

  /* To check all fields are populated for profile updating */
  useEffect(() => {
    if (!!name && !!gender && !!designation) {
      setProfileSaveButtonDisabled(false);
    } else {
      setProfileSaveButtonDisabled(true);
    }
  }, [name, gender, designation]);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }, [showAlert]);
  const handleProfileUpdate = async () => {
    const profileDetails = {
      gender,
      designation,
      email,
      name: name,
      isProfileUpdated: true,
    };
    const response = await profileUpdateApi(profileDetails);
    if (response.status === 200) {
      Cookies.set("username", name, { expires: 30 });
      Cookies.set("userrole", designation, { expires: 30 });
      setAlertMessage(response.data.message);
      setProfile(false);
      setShowAlert(true);
      handleClose();
    }
  };
  return (
    <>
      <Modal open={profile} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="p" fontSize={16} fontWeight={600}>
              Profile Update
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider orientation="horizontal" />

          <Typography variant="subtitle1" fontWeight={600} textAlign={"center"}>
            Hey User! tell us a little more about you
          </Typography>
          <Stack direction={"column"} spacing={2}>
            <Box>
              <Typography variant="body2">Name *</Typography>
              <TextField
                required
                fullWidth
                size="small"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <Typography variant="body2">Designation *</Typography>
              <FormControl fullWidth size="small">
                <Select
                  onChange={(e) => setDesignation(e.target.value)}
                  value={designation}
                  required
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
                  <MenuItem value="Programming manager">
                    Programming manager
                  </MenuItem>
                  <MenuItem value="Project manager">Project manager</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography variant="body2">Gender *</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              color="primary"
              onClick={handleProfileUpdate}
              startIcon={<SaveIcon />}
              variant="contained"
              fullWidth
              disabled={profileSaveButtonDisabled}
              sx={{ mt: 4 }}
            >
              <span>Save</span>
            </Button>
          </Stack>
        </Box>
      </Modal>
      {showAlert && <Alert severity="success">{alertMessage}</Alert>}
    </>
  );
};

export default ProfilePopup;
