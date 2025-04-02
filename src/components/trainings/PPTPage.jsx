import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import { slides } from "../../helpers/PPTContent";
import aapmorLogo from "../../assets/Aapmorlogodark.png";

const PPTPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const handleAnswerChange = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
  };

  const calculateScore = () => {
    let correctCount = 0;
    slides.forEach((slide) => {
      if (
        slide.type === "quiz" &&
        answers[slide.question] === slide.correctAnswer
      ) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "80vw",
          height: "80vh",
          padding: "24px",
          borderRadius: "10px",
          position: "relative",
          background: `radial-gradient(circle at 0% 50%, rgba(55, 87, 174, 0.6), transparent 23%),
  radial-gradient(circle at 100% 50%, rgba(255, 146, 5, 0.6), transparent 23%)
  `,
        }}
      >
        <div
          class="custom-shape-divider-top-1743596140"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            overflow: "hidden",
            lineHeight: 0,
          }}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1100 600"
            preserveAspectRatio="none"
            style={{
              position: "relative",
              display: "block",
              width: "calc(100% + 1.3px)",
              height: "314px",
            }}
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
              style={{ fill: "#F5A623" }}
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
              style={{ fill: "#F5A623" }}
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
              style={{ fill: "#F5A623" }}
            ></path>
          </svg>
        </div>
        <img
          src={aapmorLogo}
          alt="AapmorLogo"
          style={{ position: "absolute", height: "30px", top: 5, left: 5 }}
        />
        {score === null ? (
          <>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              {slides[currentSlide].title}
            </Typography>
            {slides[currentSlide].type === "content" && (
              <div
                dangerouslySetInnerHTML={{ __html: slides[currentSlide].text }}
              />
            )}
            {slides[currentSlide].type === "quiz" && (
              <>
                <Typography variant="h6">
                  {slides[currentSlide].question}
                </Typography>
                <RadioGroup
                  value={answers[slides[currentSlide].question] || ""}
                  onChange={(e) =>
                    handleAnswerChange(
                      slides[currentSlide].question,
                      e.target.value
                    )
                  }
                >
                  {slides[currentSlide].options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </>
            )}
            <Box sx={{ marginTop: "20px" }}>
              {currentSlide > 0 && (
                <Button
                  onClick={handlePrevious}
                  variant="contained"
                  sx={{
                    marginRight: "10px",
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                  }}
                >
                  Previous
                </Button>
              )}
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{ position: "absolute", bottom: 20, right: 20 }}
              >
                {currentSlide === slides.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
            Your Score: {score} /{" "}
            {slides.filter((s) => s.type === "quiz").length}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default PPTPage;
