import React from "react";
import { Avatar, Box, Typography, Button, Stack, Tooltip } from "@mui/material";
import { EmailOutlined, ArticleOutlined } from "@mui/icons-material";

const AboutAuthor = ({ author }) => {
  return (
    <>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        sx={{
          // color: "#016A70",
          color: "text.secondary",
          borderRadius: 6,
          padding: 0.5,
          paddingRight: 2,
          boxSizing: "border-box",
          //   position: "relative",
          //   "&::after": {
          //     content: '""',
          //     position: "absolute",
          //     right: 0,
          //     bottom: 0,
          //     width: "20px",
          //     height: "100%",
          //     background: "rgba(1, 106, 112, 0.2)",
          //     filter: "blur(10px)",
          //   },
        }}
      >
        About Author
      </Typography>

      <Box
        sx={{
          borderRadius: 1,
          backgroundColor: "background.default",
          // width: "80%",
          maxWidth: "80%",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          backdropFilter: "blur(10px)",
          // boxShadow: "0px 2px 4px #bfbfbf",
        }}
      >
        {/* Author Image */}
        <Avatar
          src={author?.image}
          alt={author?.name}
          // variant="circular"
          sx={(theme) => ({
            // borderRadius: 4,
            width: "120px",
            height: "120px",
            fontSize: 32,
            fontWeight: "bold",
            bgcolor: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
            border: `4px solid ${theme.palette.accent.main}`,
            boxSizing: "border-box",
          })}
        >
          {author?.name?.charAt(0)}
        </Avatar>

        {/* Author Info */}
        <Stack spacing={0.5} flex={1}>
          <Typography variant="h6" fontWeight="bold">
            {author?.name}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {author?.bio ||
              "This author loves sharing insightful thoughts through blogs."}
          </Typography>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={1}>
            <Tooltip title="Published Articles">
              <Button
                startIcon={<ArticleOutlined />}
                disabled
                sx={{
                  textTransform: "none",
                  color: "accent.main",
                  fontWeight: "bold",
                  "&:disabled": {
                    color: "accent.main",
                  },
                }}
              >
                {author?.articles} Articles
              </Button>
            </Tooltip>
            <Tooltip title="Contact">
              <Button
                startIcon={<EmailOutlined />}
                sx={{
                  textTransform: "none",
                  color: "accent.main",
                  fontWeight: "bold",
                }}
                href={`mailto:${author.email}?subject=Regarding Your Blog on Aapmor`}
              >
                Contact
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default AboutAuthor;
