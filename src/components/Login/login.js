//IMPORTS
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import aapmorlogo from "../../assets/AAPMOR LOGO.svg";
import loginVector from "../../assets/Login vector.png";
import LoginAnimation from "../../helpers/LoginAnimation";
import aapmortext from "../../assets/aapmortext.svg";
import aapmorlighttext from "../../assets/aapmorwhitetext.svg";
import { useDispatch, useSelector } from "react-redux";
import { loginValidation, sendOtpApi } from "../../providers/userProvider";
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../../store/slices/authSlice";

//MAIN FUNCTION
const Login = () => {
  const dispatch = useDispatch();
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
  const mode = useSelector((state) => state.blogs.appTheme);
  //CHECKING FOR ALREADY REGISTERED USER AND NAVIGATING TO HOME
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token !== undefined) {
      navigate("/");
    }
  }, []);

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
      if (jwtToken) {
        const decoded = jwtDecode(jwtToken);
        Cookies.set("jwtToken", jwtToken, { expires: 10 });
        dispatch(setCredentials({ jwtToken, user: decoded }));
        navigate("/");
      }
    } else {
      setButtonText("Submit OTP");
      handleOnSubmitError(data?.message);
    }
  };

  const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z]\w{3,50}@([a-zA-Z]+\.)+[a-zA-Z]+$/;
    return pattern.test(email);
  };
  const handleEmailChange = (e) => {
    const mail = e.target.value;
    setEmailError(false);
    setEmail(mail.toLowerCase());
  };

  const handleOtpChange = (e) => {
    setButtonText("Submit OTP");
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
        setButtonText("Submit OTP");
        setShowEmailView(false);
        setShowOtpView(true);
      } else {
        handleOnSubmitError(data.message);
      }
    } else {
      setEmailError(true);
    }
  };

  const handleIncorrectEmail = () => {
    setShowOtpView(false);
    setShowEmailView(true);
    setSuccessMsg("");
  };

  //RETURN
  return (
    <Box
      className="login-container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      {/* <Box>{<LoginAnimation />}</Box> */}
      <Box
        sx={(theme) => ({
          position: "relative",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          gap: 3,
          // width: "fit-content",
          width: { xs: "80%", md: "50%" },
          borderTop: `6px double ${theme.palette.accent.main}`,
          borderLeft: `6px double ${theme.palette.accent.main}`,
          backdropFilter: "blur(10px)",
          boxShadow: "6px 6px 16px 0px #bfbfbf",
        })}
      >
        {/* <img
          src={loginVector}
          alt={"login vector logo"}
          style={{
            display: { xs: "none", md: "block" },
            height: "60%",
            position: "absolute",
            left: { md: "-150px", xs: "-40px" },
            marginBottom: "-60px",
          }}
        /> */}
        <Stack
          direction={{ md: "row", xs: "column" }}
          spacing={2}
          alignItems="center"
          justifyContent={"center"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <img
              src={aapmorlogo}
              alt="logoAapmor"
              style={{ width: "80px", height: "50px" }}
            />

            {/* {mode && (
              <img
                src={aapmorlighttext}
                alt="aapmortext"
                style={{
                  height: { xs: "20px", md: "60px" },
                  width: { xs: "40%", md: "60%" },
                }}
              />
            )} */}
            {!mode && (
              <img
                src={aapmortext}
                alt="aapmortext"
                style={
                  {
                    // height: { xs: "20px", md: "80px" },
                    // width: { xs: "50px", md: "100px" },
                  }
                }
              />
            )}
          </Stack>
          <Divider
            orientation={"vertical"}
            flexItem
            sx={{
              borderRightWidth: 4,
              display: { xs: "none", md: "block" },
              borderColor: "accent.main",
              height: "80px",
              alignSelf: "center",
              borderRadius: "50%",
              width: "10px",
            }}
          />
          <Typography
            color="accent.main"
            fontWeight={500}
            fontSize={{ xs: "32px", md: "40px" }}
            // variant={{ xs: "h3", md: "h4" }}
            fontFamily={"Playwrite CO Guides, serif"}
          >
            Blogs
          </Typography>
        </Stack>
        <Typography
          // mt={-3}
          variant="p"
          textAlign={"center"}
          maxWidth={"500px"}
          sx={{ whiteSpace: "break-spaces" }}
          color={"grey"}
          gutterBottom
          fontSize={"24px"}
          fontFamily={"Source sans pro"}
        >
          Explore, engage, and be inspired. Dive into a world of captivating
          content. Let's get started!
        </Typography>
        <Typography variant="h5" gutterBottom fontFamily={"Source sans pro"}>
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
              height: "52px",
              width: { xs: "90%", lg: "60%" },
              marginBottom: { xs: "30px", lg: "8px" },
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
            onClick={onSubmitEmail}
            data-testid="email input"
            variant="contained"
            disabled={isButtonDisable}
            sx={(theme) => ({
              width: { xs: "90%", lg: "60%" },
              height: "52px",
              fontWeight: 500,
              backgroundColor: `${theme.palette.accent.main}`,
              "&:hover": {
                backgroundColor: `${theme.palette.accent.main}`,
              },
              mb: 2,
            })}
          >
            {buttonText}
          </Button>
        )}
        {/*  OTP BUTTON */}
        {showOtpView && (
          <Button
            variant="contained"
            sx={(theme) => ({
              width: { xs: "90%", lg: "60%" },
              height: "48px",
              marginBottom: { xs: "30px", lg: "0px" },
              backgroundColor: `${theme.palette.accent.main}`,
              "&:hover": {
                backgroundColor: "#016A70",
              },
            })}
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
          <Box sx={{ textAlign: "center", maxWidth: 400 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "green", marginTop: 2 }}
            >
              {successMsg}
            </Typography>
            <Typography variant="caption" fontSize={12}>
              incorrect email ?{" "}
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={handleIncorrectEmail}
              >
                click here
              </span>{" "}
              to update your Email{" "}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Login;
