
import React from "react";
import { Box, Stack } from "@mui/material";
import Category from "./Category";
import { useTheme } from "@mui/material/styles";

const categories = ["All", "Fitness", "Technology", "Arts", "Artificial Intelligence","Sports","International","Insights"];


const CategoryTabs = ({ category, setCategory }) => {
  const theme = useTheme();
const isDarkMode = theme.palette.mode === "dark";



  return (
    <Box
     sx={{
    width: {
      xs: "100%",
      lg: "calc(100% - 28.5%)" 
    },
    overflowX: "auto",
    py: 2,
    px: 2,
    position: "fixed",
    zIndex: 1000,
    left: {
      xs: 0,
      lg: "40px", 
    },
    marginTop: "90px",
   backgroundColor: isDarkMode ? "#121212" : "#f4f6f8",
color: isDarkMode ? "#fff" : "#000",
    boxSizing: "border-box",
  }}
    >
      <Stack direction="row" spacing={1} sx={{ width: "max-content" }}>
        {categories.map((label) => (
          <Category key={label} label={label} category={category} setCategory={setCategory} />
        ))}
      </Stack>
    </Box>
  );
};

export default CategoryTabs;
