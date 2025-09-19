import React from "react";
import { CardContent, Typography, Button, Box, Grid } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const WinnerItem = ({ winners = [] }) => {
  if (!winners || winners.length === 0 || winners.message) {
    return (
      <Grid item xs={12} md={6}>
        <Typography variant="body1" color="textSecondary">
          No winners available.
        </Typography>
      </Grid>
    );
  }
  return (
    // <Box>
    winners?.map((winner) => (
      <Grid item xs={12} md={6} key={winner._id}>
        <Box
          sx={{
            borderRadius: 2,
            bgcolor: "background.dark",
            // mt: 1,
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
                sx={{
                  alignSelf: "flex-end",
                  ml: "auto",
                  border: "none",
                  textTransform: "none",
                  "&:hover": {
                    border: "none",
                  },
                }}
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
        </Box>
      </Grid>
    ))
    // </Box>
  );
};

export default WinnerItem;
