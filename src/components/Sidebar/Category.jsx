import React from "react";
import { Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Category = ({ category, setCategory, label }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isSelected = category === label;

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Button
        size="small"
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
          color: isSelected ? "#333333" : isDarkMode ? "#e0e0e0" : "#333333",
          fontWeight: isSelected ? "bold" : "",
          p: "6px",
          mr: 0.5,
          background: isSelected
            ? isDarkMode
              ? "#F1F1F1"
              : "#33333350"
            : isDarkMode
            ? "linear-gradient(322.49deg, #121212 -10.4%, #1e1e1e80 32.3%, #292929 83.09%)"
            : "linear-gradient(343.58deg, #f0f0f080 -21.05%, #e6e6e680 24.15%, #f2f2f2 77.91%)",
          "&:hover": {
            borderColor: "#F1F1F1",
            backgroundColor: isSelected
              ? "#363636"
              : isDarkMode
              ? "#3a3a3a"
              : "#eaeaea",
            color: isSelected ? (isDarkMode ? "#e0e0e0" : "#e0e0e0") : "",
          },
        }}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default Category;
