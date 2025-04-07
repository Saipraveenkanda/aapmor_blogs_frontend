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
    <>
      <Typography variant="h5" fontWeight={"bold"} gutterBottom>
        Monthly Spotlight: Winning Blogs
      </Typography>
      <Grid container item spacing={1} sx={{ mt: 1 }}>
        {winners.map((winner) => (
          <Grid
            item
            xs={6}
            key={winner._id}
            sx={{ borderRadius: 3, bgcolor: "background.paper" }}
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
    </>
  );
};

export default WinnerItem;
