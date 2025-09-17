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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
      }}
    >
      <Box
        className="login-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
          width: "95vw",
          boxSizing: "border-box",
          background: " rgba(43, 43, 43, 1)",
          overflow: "hidden",
          position: "relative",
          borderRadius: 2,
        }}
      >
        {/* Gradient Circles 1 */}
        <Box
          sx={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(38.58% 38.58% at 50% 50%, rgba(116, 116, 116, 0.82) 0%, rgba(43, 43, 43, 1) 100%)",
            filter: "blur(10px)",
            zIndex: 0,
          }}
        />
        {/* Gradient Circles 2 */}
        <Box
          sx={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(38.58% 38.58% at 50% 50%, rgba(116, 116, 116, 0.82) 0%, rgba(43, 43, 43, 1) 100%)",
            filter: "blur(10px)",
            zIndex: 0,
          }}
        />

        <Box
          sx={(theme) => ({
            // position: "relative",
            // borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // padding: "20px",
            gap: 2,
            width: { xs: "80%", md: "50%" },
          })}
        >
          <Stack
            direction={{ md: "row", xs: "column" }}
            spacing={1}
            alignItems="center"
            justifyContent={"center"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <img
                src={aapmorlogo}
                alt="logoAapmor"
                style={{ width: "80px", height: "50px" }}
              />

              {!mode && (
                <img
                  src={aapmorlighttext}
                  alt="aapmortext"
                  style={{
                    width: "150px",
                  }}
                />
              )}
            </Stack>
            <Divider
              orientation={"vertical"}
              flexItem
              sx={{
                borderRightWidth: 2,
                display: { xs: "none", md: "block" },
                borderColor: "1px solid #767676",
                height: "60px",
                alignSelf: "center",
                // borderRadius: "50%",
                width: "10px",
              }}
            />
            <Typography
              color="#E8E8E8"
              fontWeight={250}
              fontSize={{ xs: "25px", md: "40px" }}
              // variant={{ xs: "h3", md: "h4" }}
              fontFamily={"san-serif"}
            >
              Blogs
            </Typography>
          </Stack>
          <Typography
            color="#E8E8E8"
            variant="h5"
            gutterBottom
            fontFamily={"Source sans pro"}
          >
            Login to Continue
          </Typography>
          {/* email Input */}
          {/* <Typography
            color="#E8E8E8"
            sx={{ mt: 0, display: "flex", justifyContent: "center" }}
          >
            Email*
          </Typography> */}
          {showEmailView && (
            <TextField
              variant="outlined"
              required
              label="Email"
              id="email"
              error={emailError}
              helperText={emailError === true && "Invalid email id"}
              placeholder="Enter your email"
              onChange={handleEmailChange}
              value={email}
              sx={{
                color: "#E8E8E8 !important",
                height: "52px",
                width: { xs: "90%", lg: "60%" },
                marginBottom: { xs: "30px", md: "12px" },
                animation: emailError ? "shake 0.3s" : "",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  color: "#ffffff !important",
                },
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
              // disabled={isButtonDisable}
              sx={(theme) => ({
                width: { xs: "60%", sm: "60%" },
                height: "44px",
                fontWeight: 500,
                backgroundColor: "#ffffff",
                color: "#000000",
                borderRadius: "12px",
                // "&:hover": {
                //   backgroundColor: `${theme.palette.accent.main}`,
                // },
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
                width: { xs: "60%", sm: "60%" },
                height: "44px",
                marginBottom: { xs: "30px", lg: "0px" },
                // backgroundColor: `${theme.palette.accent.main}`,
                // "&:hover": {
                //   backgroundColor: "#016A70",
                // },
                textTransform: "none",
                backgroundColor: "#ffffff",
                color: "#000000",
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
    </Box>
  );
};

export default Login;
