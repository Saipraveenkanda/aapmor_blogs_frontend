import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const WinnerItem = ({ winners }) => {
  if (!winners || winners.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        No winners available.
      </Typography>
    );
  }
  return (
    <Box sx={{}}>
      <Typography
        sx={{ mt: 2, pl: 2 }}
        variant="h5"
        fontWeight={"bold"}
        gutterBottom
      >
        Monthly Spotlight: Winning Blogs
      </Typography>
      <Grid
        xs={12}
        container
        spacing={2}
        sx={{ ml: 2, mt: 1, flexDirection: "column" }}
      >
        {winners.map((winner) => (
          <Grid
            item
            xs={12}
            md={6}
            key={winner._id}
            sx={{
              borderRadius: 2,
              bgcolor: "background.paper",
              mt: 1,
              boxSizing: "border-box",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <EmojiEventsIcon color="warning" />
                <Typography variant="subtitle2" color="text.secondary">
                  {winner.month} Winner
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<OpenInNewIcon />}
                  href={winner.blogLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ alignSelf: "flex-end", ml: "auto" }}
                >
                  Read Blog
                </Button>
              </Box>

              <Typography variant="h6" fontWeight="bold" mt={1}>
                {winner.blogTitle}
              </Typography>

              <Typography variant="p" color="text.secondary" mt={0.5}>
                by {winner.winnerName}
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WinnerItem;
