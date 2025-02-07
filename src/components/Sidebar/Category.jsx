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

const Category = ({ category, setCategory, label }) => {
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
      <Box
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
      </Box>
      <Button
        size="small"
        // startIcon={renderIcon()}
        value={label}
        variant={category === label ? "contained" : "outlined"}
        onClick={(e) => setCategory(e.target.value)}
        sx={{
          border: `1px solid ${category === label ? "#016A70" : "lightgrey"}`,
          height: "40px",
          width: "100%",
          borderRadius: 2,
          textTransform: "none",
          backgroundColor: "#fff",
          color: category === label ? "#016A70" : "#000",
          fontWeight: category === label ? "bold" : "",
          p: "6px 6px 6px 24px",
          mr: 0.5,
          "&:hover": {
            backgroundColor: "unset",
            borderColor: "#016A70",
          },
          // boxShadow: "2px 0px 4px 0px #bfbfbf",
        }}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default Category;
