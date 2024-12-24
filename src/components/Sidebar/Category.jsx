import { Box, Button, Chip, Stack } from "@mui/material";
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
            color={category === label ? "warning" : "primary"}
          />
        );
      case "Fitness":
        return (
          <FitnessCenterIcon
            color={category === label ? "warning" : "primary"}
          />
        );
      case "Technology":
        return (
          <PsychologyIcon color={category === label ? "warning" : "primary"} />
        );
      case "Arts":
        return (
          <PaletteIcon color={category === label ? "warning" : "primary"} />
        );
      case "Gaming":
        return (
          <SportsEsportsIcon
            color={category === label ? "warning" : "primary"}
          />
        );
      case "Sports":
        return (
          <SportsBaseballIcon
            color={category === label ? "warning" : "primary"}
          />
        );
      case "Fashion":
        return <WomanIcon color={category === label ? "warning" : "primary"} />;
      case "Food & Health":
        return (
          <FastfoodIcon color={category === label ? "warning" : "primary"} />
        );
      case "Entertainment":
        return (
          <LocalMoviesOutlinedIcon
            color={category === label ? "warning" : "primary"}
          />
        );
      case "Artificial Intelligence":
        return (
          <SmartToyOutlinedIcon
            color={category === label ? "warning" : "primary"}
          />
        );
      case "Science":
        return (
          <BiotechOutlinedIcon
            color={category === label ? "warning" : "primary"}
          />
        );
      case "Politics":
        return (
          <NewspaperOutlinedIcon
            color={category === label ? "warning" : "primary"}
          />
        );
      case "International":
        return (
          <AirplanemodeActiveIcon
            color={category === label ? "warning" : "primary"}
          />
        );
      case "Insights":
        return (
          <InsightsIcon color={category === label ? "warning" : "primary"} />
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
          width: "30px",
          zIndex: 10,
          marginRight: "-15px",
          boxShadow: `-2px 0px 4px 0px ${
            category === label ? "#d32f2f50" : "#2196f350"
          } inset`,
          backgroundColor: "#ffffff",
          display: "grid",
          placeItems: "center",
          borderLeft: `1px solid ${
            category === label ? "#d32f2f" : "#2196f3"
          }`,
        }}
      >
        {renderIcon()}
      </Box>
      <Button
        // size="medium"
        // startIcon={renderIcon()}
        value={label}
        variant={category === label ? "contained" : "outlined"}
        onClick={(e) => setCategory(e.target.value)}
        sx={{
          border: `1px solid ${category === label ? "#d32f2f" : "#2196f3"}`,

          borderRadius: 2,
          textTransform: "none",
          backgroundColor: category === label ? "#d32f2f20" : "#fff",
          color: category === label ? "#d32f2f" : "#000",
          p: "6px 6px 6px 24px",
          "&:hover": {
            backgroundColor: "unset",
            borderColor: "#2196f3",
          },
          boxShadow: "2px 0px 4px 0px #bfbfbf",
        }}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default Category;
