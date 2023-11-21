//IMPORTS
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import { sendOtpApi, loginValidation } from "../ApiCalls/apiCalls";
import { useNavigate } from "react-router-dom";

//MAIN FUNCTION
const Login = () => {
  //STATE HOOKS
  const [buttonText, setButtonText] = useState("Get OTP");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [showOtpView, setShowOtpView] = useState(false);
  const [showEmailView, setShowEmailView] = useState(true);
  const [otp, setOtp] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isButtonDisable, setButtonDisable] = useState(true);
  const [isOtpButtonDisable, setOtpButtonDisable] = useState(true);

  //CHECKING FOR ALREADY REGISTERED USER AND NAVIGATING TO HOME
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      navigate("/");
    }
  });

  const handleOnSubmitError = (message) => {
    setShowErrMsg(true);
    setErrorMsg(message);
    setSuccessMsg("");
  };

  useEffect(() => {
    checkOtpValidation();
  });

  const checkOtpValidation = () => {
    if (otp.length === 6) {
      setOtpButtonDisable(false);
    } else {
      setOtpButtonDisable(true);
    }
  };

  // OTP ENTERED API CALL
  const handleOtpEntered = async () => {
    setButtonText("Validating...");
    const loginDetails = { email, otp };
    const response = await loginValidation(loginDetails);
    const data = response.data;
    if (response.status === 200) {
      setButtonText("Success");
      const jwtToken = data.jwt_token;
      Cookies.set("jwtToken", jwtToken, { expires: 10 });
      Cookies.set("userEmail", data.email, { expires: 10 });
      navigate("/");
    } else {
      setButtonText("Enter OTP");
      handleOnSubmitError(data.message);
    }
  };

  const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z]\w{3,12}@([a-zA-Z]+\.)+[a-zA-Z]+$/;
    return pattern.test(email);
  };
  const handleEmailChange = (e) => {
    setEmailError(false);
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setButtonText("Enter OTP");
    setShowErrMsg(false);
    setOtp(e.target.value);
  };

  useEffect(() => {
    checkEmailValidation();
  });

  const checkEmailValidation = () => {
    if (email.endsWith("@aapmor.com")) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  // EMAIL VALIDATION AND VERIFICATION API CALL
  const onSubmitEmail = async (event) => {
    event.preventDefault();
    const validEmail = isValidEmail(email);
    if (!validEmail) {
    }

    if (validEmail) {
      setButtonText("sending...");
      const response = await sendOtpApi(email);
      const data = response.data;
      setSuccessMsg(data.message);

      if (response.status === 200) {
        setButtonText("Enter OTP");
        setShowEmailView(false);
        setShowOtpView(true);
      } else {
        handleOnSubmitError(data.message);
      }
    } else {
      setEmailError(true);
    }
  };

  //RETURN
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E4F4FF",
        height: { xs: "100vh", md: "100vh" },
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={{ md: 5 }}
        component="form"
        onSubmit={onSubmitEmail}
        sx={{
          borderRadius: { md: "15px" },
          borderTopRightRadius: { md: "60px" },
          borderBottomLeftRadius: { md: "60px" },
          height: { xs: "100%", lg: "80%" },
          width: { xs: "100%", sm: "80%", md: "70%", lg: "40%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Stack direction={"row"} spacing={2} alignItems="center">
          <img
            src="https://res.cloudinary.com/ddahy4bbc/image/upload/v1698670236/1697545876900-removebg-preview_d7xrcu.png"
            alt="logoAapmor"
          />
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderRightWidth: 5,
              borderColor: "#000EE6",
              height: "80px",
              alignSelf: "center",
            }}
          />
          <Typography variant="h4" color={"#2C007E"}>
            BLOGS
          </Typography>
        </Stack>
        <Typography
          mt={-3}
          variant="body2"
          textAlign={"center"}
          width={400}
          color={"grey"}
          gutterBottom
        >
          Explore, engage, and be inspired. Dive into a world of captivating
          content. Let's get started!
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "cambria Math" }}
        >
          Login / Signup
        </Typography>
        {/* email Input */}
        {showEmailView && (
          <TextField
            variant="outlined"
            required
            label="Email"
            id="email"
            error={emailError}
            helperText={emailError === true && "Invalid email id"}
            placeholder="Enter Aapmor email id"
            onChange={handleEmailChange}
            value={email}
            sx={{
              width: { xs: "90%", lg: "60%" },
              marginBottom: { xs: "30px", lg: "24px" },
              animation: emailError ? "shake 0.3s" : "",
              "@keyframes shake": {
                "0%": { marginLeft: "0rem" },
                "25%": { marginLeft: "0.5rem" },
                "75%": {
                  marginLeft: "-0.5rem",
                },
                "100%": { marginLeft: "0rem" },
              },
            }}
          />
        )}
        {showOtpView && (
          <TextField
            variant="outlined"
            required
            label="OTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            sx={{
              width: { xs: "80%", lg: "60%" },
              marginBottom: { xs: "30px", lg: "24px" },
            }}
          />
        )}
        {/* EMAIL SEND BUTTON */}
        {showEmailView && (
          <Button
            type="submit"
            data-testid="email input"
            variant="contained"
            disabled={isButtonDisable}
            sx={{
              width: { xs: "90%", lg: "60%" },
              height: "48px",
              fontWeight: 500,
            }}
          >
            {buttonText}
          </Button>
        )}
        {/*  OTP BUTTON */}
        {showOtpView && (
          <Button
            variant="contained"
            sx={{
              width: { xs: "90%", lg: "60%" },
              height: "48px",
              marginBottom: { xs: "30px", lg: "0px" },
            }}
            onClick={handleOtpEntered}
            disabled={isOtpButtonDisable}
          >
            {buttonText}
          </Button>
        )}
        {showErrMsg && (
          <Typography variant="p" sx={{ color: "red", marginTop: 2 }}>
            *{errorMsg}
          </Typography>
        )}
        {successMsg !== "" && (
          <Typography variant="subtitle2" sx={{ color: "green", marginTop: 2 }}>
            {successMsg}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Login;

// <LoadingButton
// size="small"
// onClick={handleClick}
// endIcon={<SendIcon />}
// loading={loading}
// loadingPosition="end"
// variant="contained"
// >
// <span>Send</span>
// </LoadingButton>

// &.error
//     {
//       animation: shake 0.2s ease-in-out 0s 2;
//       box-shadow: 0 0 0.5em red;
//     }
//   }
// }

// @keyframes shake {
//   0% { margin-left: 0rem; }
//   25% { margin-left: 0.5rem; }
//   75% { margin-left: -0.5rem; }
//   100% { margin-left: 0rem; }
// }
