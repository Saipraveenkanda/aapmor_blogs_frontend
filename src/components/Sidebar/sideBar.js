import { Box, Typography, Fab, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Category from "./Category";
import writeIcon from "../../assets/pencil-simple-line.svg";

const categories = [
  { label: "All" },
  { label: "Fitness" },
  { label: "Technology" },
  { label: "Arts" },
  { label: "Gaming" },
  { label: "Sports" },
  { label: "Fashion" },
  { label: "Food & Health" },
  { label: "Entertainment" },
  { label: "Artificial Intelligence" },
  { label: "Science" },
  { label: "Politics" },
  { label: "International" },
  { label: "Insights" },
];
const SideBar = ({ category, setCategory }) => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "max-content",
        maxWidth: "100%",
        paddingLeft: 1,
        boxSizing: "border-box",
        position: "sticky",
        top: "10vh",
        zIndex: 100,
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight={600} marginTop={2}>
        Categories
      </Typography>
      {/* Category chips */}
      <Box
        sx={{
          display: "flex",
          // flexWrap: "wrap",
          flexDirection: "column",
          gap: 1,
          marginBottom: 1,
          maxHeight: "80vh",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {categories.map(({ label }, index) => (
          <Category
            key={index}
            setCategory={setCategory}
            label={label}
            category={category}
          />
        ))}
      </Box>
      {/* <Divider orientation="horizontal" flexItem sx={{ mb: 1 }} /> */}
      {jwtToken && (
        <Tooltip title="Create new blog " arrow placement="left" sx={{ mt: 1 }}>
          <Fab
            variant="extended"
            // color="inherit"
            size="medium"
            onClick={() => navigate("/createblog")}
            sx={{
              backgroundColor: "#016A70",
              boxShadow: "2px 2px 4px 0px grey ",
              borderRadius: 2,
              position: "fixed",
              bottom: 30,
              right: 30,
              width: "180px",
              height: "48px",
              textTransform: "none",
              fontSize: "16px",
              border: "4px solid #fff",
              "&:hover": {
                border: "4px solid #016A70",
                boxShadow: "1px 0px 4px 0px #ffffff inset",
                backgroundColor: "#016A70",
              },
              color: "#ffffff",
            }}
          >
            {/* <CreateIcon sx={{ mr: 1 }} /> */}
            <img
              src={writeIcon}
              alt="write_icon"
              style={{ height: "30px", paddingRight: "8px" }}
            />
            Write
          </Fab>
        </Tooltip>
      )}
      {/* <Divider orientation="horizontal" flexItem sx={{ mt: 1 }} /> */}
      {/* <RecentBlogs /> */}
      {/* <Grid item p={1} m={1}> */}
      {/* <img src={aapmorlogo} alt="aapmor-logo" style={{ width: "200px" }} /> */}
      {/* Social media icons */}
      {/* <Grid item gap={2}>
          <IconButton component="a" href="#">
            <TwitterIcon
              sx={{ color: "#00acee", height: "30px", width: "30px" }}
            />
          </IconButton>
          <IconButton component="a" href="#">
            <FacebookIcon
              color="primary"
              sx={{ color: "#1877F2", height: "30px", width: "30px" }}
            />
          </IconButton>
          <IconButton component="a" href="_blank">
            <InstagramIcon
              sx={{ color: "#ed2147", height: "30px", width: "30px" }}
            />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/company/aapmor-technologies/"
            target="_blank"
          >
            <LinkedInIcon
              sx={{ color: " #0072b1 ", height: "30px", width: "30px" }}
            />
          </IconButton>
        </Grid> */}
      {/* </Grid> */}
    </Box>
  );
};

export default SideBar;
