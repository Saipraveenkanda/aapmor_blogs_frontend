import {
  List,
  Stack,
  Typography,
  Popover,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import PublicIcon from "@mui/icons-material/Public";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BlogListItemComponent from "./BlogListItemComponent";

const RecentBlogs = ({ blogs = [], publishedBlogs = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [likes, setLikes] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const popoverid = open ? "simple-popover" : undefined;
  return (
    <>
      {blogs?.length > 0 &&
        blogs?.map((eachMonth) => (
          // <Grid item xs={4}>
          <Accordion sx={{ mb: 2 }} key={eachMonth._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <ThumbUpOutlinedIcon sx={{ color: "accent.main" }} /> Most liked
                blogs of{" "}
                {new Date(eachMonth?.year, eachMonth?.month - 1).toLocaleString(
                  "default",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ borderRadius: 2 }}>
              {eachMonth?.topBlogs?.length > 0 ? (
                <List
                  sx={{
                    bgcolor: "background.default",
                    maxWidth: "100%",
                    overflowY: "auto",
                    maxHeight: "70vh",
                    scrollbarWidth: "thin",
                    scrollbarWidth: "none",
                    p: 1,
                    borderRadius: 2,
                  }}
                >
                  {eachMonth?.topBlogs?.map((blog, index) => (
                    /* BLOG LIST ITEM COMPONENT */
                    <BlogListItemComponent
                      length={eachMonth?.topBlogs.length}
                      blog={blog}
                      index={index}
                      handleClick={handleClick}
                      setLikes={setLikes}
                    />
                  ))}
                </List>
              ) : (
                eachMonth?.topBlogs?.length === 0 && (
                  /* !loading &&  */ <Typography>
                    No blogs this month!
                  </Typography>
                )
              )}
            </AccordionDetails>
          </Accordion>
          // </Grid>
        ))}
      {/* Likes popover */}

      {publishedBlogs?.length > 0 && (
        <List
          sx={{
            bgcolor: "background.paper",
            maxWidth: "100%",
            overflowY: "auto",
            maxHeight: "70vh",
            scrollbarWidth: "thin",
            p: 2,
            pt: 1,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PublicIcon sx={{ color: "accent.main" }} /> Blogs Published to
            Website
          </Typography>
          {publishedBlogs?.map((blog, index) => (
            /* BLOG LIST ITEM COMPONENT */
            <BlogListItemComponent
              length={publishedBlogs.length}
              blog={blog}
              index={index}
              handleClick={handleClick}
              setLikes={setLikes}
            />
          ))}
        </List>
      )}

      <Popover
        id={popoverid}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"flex-start"}
          spacing={1}
          sx={{
            borderRadius: 1,
            // border: "0.5px solid accent.main",
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
        >
          {likes?.length > 0 ? (
            likes?.map((eachUser) => {
              return (
                <Stack direction={"row"} spacing={1.5} sx={{ p: 1 }}>
                  <PersonOutlineTwoToneIcon sx={{ color: "accent.main" }} />
                  <Typography variant="p" fontWeight={"500"}>
                    {eachUser.name}
                  </Typography>
                </Stack>
              );
            })
          ) : (
            <Stack direction={"row"} spacing={1.5} sx={{ p: 1 }}>
              <SentimentDissatisfiedOutlinedIcon sx={{ color: "#016A70" }} />
              <Typography variant="p" fontWeight={"500"}>
                No likes
              </Typography>
            </Stack>
          )}
        </Stack>
      </Popover>
    </>
  );
};

export default RecentBlogs;
