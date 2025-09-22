import { Box, Button, Stack } from "@mui/material";
import React from "react";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PaletteIcon from "@mui/icons-material/Palette";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import WomanIcon from "@mui/icons-material/Woman";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import InsightsIcon from "@mui/icons-material/Insights";
import { useTheme } from "@mui/material/styles";

const Category = ({ category, setCategory, label }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isSelected = category === label;

  const renderIcon = () => {
    switch (label) {
      case "All":
        return (
          <AllInclusiveIcon
            // color={category === label ? "#016A70" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Fitness":
        return (
          <FitnessCenterIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Technology":
        return (
          <PsychologyIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Arts":
        return (
          <PaletteIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Gaming":
        return (
          <SportsEsportsIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Sports":
        return (
          <SportsBaseballIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Fashion":
        return (
          <WomanIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Food & Health":
        return (
          <FastfoodIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Entertainment":
        return (
          <LocalMoviesOutlinedIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Artificial Intelligence":
        return (
          <SmartToyOutlinedIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Science":
        return (
          <BiotechOutlinedIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Politics":
        return (
          <NewspaperOutlinedIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "International":
        return (
          <AirplanemodeActiveIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      case "Insights":
        return (
          <InsightsIcon
            // color={category === label ? "primary" : "disabled"}
            sx={{ color: category === label ? "#016A70" : "lightgrey" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Stack direction={"row"} alignItems={"center"}>
      {/* <Box
        sx={{
          borderRadius: "50%",
          height: "30px",
          width: "34px",
          zIndex: 10,
          marginRight: "-15px",
          boxShadow: `-2px 0px 4px 0px ${
            category === label ? "#016A7050" : "lightgrey"
          } inset`,
          backgroundColor: "#ffffff",
          display: "grid",
          placeItems: "center",
          borderLeft: `1px solid ${
            category === label ? "#016A70" : "lightgrey"
          }`,
        }}
      >
        {renderIcon()}
      </Box> */}
      <Button
        size="small"
        // startIcon={renderIcon()}
        value={label}
        variant={category === label ? "contained" : "outlined"}
        onClick={(e) => setCategory(label)}
        sx={{
          border: `1px solid ${
            isSelected ? "#F1F1F1" : isDarkMode ? "#444" : "#ccc"
          }`,
          height: "30px",
          width: "100%",
          borderRadius: 2,
          textTransform: "none",
          // backgroundColor: isSelected
          //   ? "#F1F1F1"
          //   : isDarkMode
          //   ? "#F1F1F1"
          //   : "#f5f5f5",
          color: isSelected ? "#222121" : isDarkMode ? "#e0e0e0" : "#333333",
          fontWeight: isSelected ? "bold" : "",
          p: "6px",
          // background: isSelected
          //   ? "#F1F1F1"
          //   : isDarkMode
          //   ? "linear-gradient(343.58deg, rgba(30, 30, 30, 0.2) -21.05%, rgba(60, 60, 60, 0.5) 24.15%, #292929 77.91%)"
          //   : "linear-gradient(343.58deg, rgba(240, 240, 240, 0.5) -21.05%, rgba(230, 230, 230, 0.5) 24.15%, #f2f2f2 77.91%)",
          mr: 0.5,
          background: isSelected
            ? isDarkMode
              ? "#F1F1F1"
              : ""
            : isDarkMode
            ? "linear-gradient(322.49deg, #121212 -10.4%, #1e1e1e80 32.3%, #292929 83.09%)"
            : "linear-gradient(343.58deg, #f0f0f080 -21.05%, #e6e6e680 24.15%, #f2f2f2 77.91%)",
          // borderImage: isDarkMode
          //   ? "linear-gradient(180deg, #363636 0%, rgba(50, 50, 50, 0.5) 100%)"
          //   : "linear-gradient(180deg, #ccc 0%, rgba(200, 200, 200, 0.5) 100%)",
          "&:hover": {
            borderColor: "#F1F1F1",
            backgroundColor: isSelected
              ? "#363636"
              : isDarkMode
              ? "#3a3a3a"
              : "#eaeaea",
            color: isSelected ? "#222121" : isDarkMode ? "#e0e0e0" : "#333333",
          },
        }}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default Category;
