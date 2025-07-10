import { useState, useEffect } from "react";
import { Box, Avatar, Typography, Fade } from "@mui/material";

const BlogCardSlider = ({ topBlogs, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (topBlogs.length > 1) {
      const timer = setInterval(() => {
        setVisible(false); // Start fade-out
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % topBlogs.length);
          setVisible(true); // Start fade-in
        }, 500); // Delay between fade-out and next card
      }, interval);

      return () => clearInterval(timer);
    }
  }, [topBlogs, interval]);

  return (
    <Fade in={visible} timeout={topBlogs.length > 1 ? 500 : 0}>
      {topBlogs.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            boxSizing: "border-box",
            alignItems: "center",
          }}
        >
          <Avatar
            variant="rounded"
            sx={{ width: 40, height: 40 }}
            src={topBlogs[currentIndex]?.blogImage}
          />
          <Box>
            <Typography variant="body2">
              {topBlogs[currentIndex].title.slice(0, 30)}...
            </Typography>
            <Typography variant="caption">
              {/* {topBlogs[currentIndex].likes.length} likes |{" "} */}
              {topBlogs[currentIndex].username} |{" "}
              {/* {topBlogs[currentIndex].date} */}
              {topBlogs[currentIndex].comments.length} comments
            </Typography>
          </Box>
        </Box>
      )}
    </Fade>
  );
};

export default BlogCardSlider;
