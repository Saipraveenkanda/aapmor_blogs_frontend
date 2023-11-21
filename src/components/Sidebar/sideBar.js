import { Box, Typography, Chip, Divider, Fab, Tooltip } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PaletteIcon from "@mui/icons-material/Palette";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import WomanIcon from "@mui/icons-material/Woman";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CreateIcon from "@mui/icons-material/Create";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SideBar = ({ category, setCategory }) => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");
  return (
    <Box
      sx={{
        width: "max-content",
        maxWidth: "13%",
        paddingLeft: 1,
        boxSizing: "border-box",
        display: { xs: "none", md: "flex", flexDirection: "column" },
      }}
    >
      <Typography variant="body1" gutterBottom fontWeight={600} marginTop={2}>
        Categories
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          marginBottom: 1,
        }}
      >
        <Chip
          size="small"
          icon={<AllInclusiveIcon />}
          label="All"
          variant={category === "All" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<FitnessCenterIcon />}
          label="Fitness"
          variant={category === "Fitness" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<PsychologyIcon />}
          label="Technology"
          variant={category === "Technology" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<PaletteIcon />}
          label="Arts"
          variant={category === "Arts" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<SportsEsportsIcon />}
          label="Gaming"
          variant={category === "Gaming" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<SportsBaseballIcon />}
          label="Sports"
          variant={category === "Sports" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<WomanIcon />}
          label="Fashion"
          variant={category === "Fashion" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<FastfoodIcon />}
          label="Food & Health"
          variant={category === "Food & Health" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />

        <Chip
          size="small"
          icon={<LocalMoviesOutlinedIcon />}
          label="Entertainment"
          variant={category === "Entertainment" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<SmartToyOutlinedIcon />}
          label="Artificial Intelligence"
          variant={
            category === "Artificial Intelligence" ? "filled" : "outlined"
          }
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<BiotechOutlinedIcon />}
          label="Science"
          variant={category === "Science" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<NewspaperOutlinedIcon />}
          label="News"
          variant={category === "News" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<GavelOutlinedIcon />}
          label="Politics"
          color="default"
          variant={category === "Politics" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
      </Box>
      <Divider orientation="horizontal" flexItem />
      {jwtToken ? (
        <Tooltip
          title="Create new blog "
          arrow
          placement="left"
          sx={{ marginTop: 1, position: "sticky", top: 80 }}
        >
          <Fab
            variant="extended"
            color="error"
            size="small"
            onClick={() => navigate("/createblog")}
          >
            <CreateIcon sx={{ mr: 1 }} />
            Create
          </Fab>
        </Tooltip>
      ) : (
        <Typography variant="caption" color={"GrayText"}>
          <a href="/login">Login</a> to create blog
        </Typography>
      )}
    </Box>
  );
};

export default SideBar;
