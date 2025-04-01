import React from "react";
import { Avatar, Box, Typography, Button, Stack, Tooltip } from "@mui/material";
import {
  EmailOutlined,
  PeopleAltOutlined,
  ArticleOutlined,
} from "@mui/icons-material";

const AboutAuthor = ({ author }) => {
  return (
    <>
      <Typography
        variant="h6"
        fontWeight={"bold"}
        sx={{
          color: "#016A70",
          background:
            "linear-gradient(270deg, #016A70 -10%, rgba(1, 106, 112, 0) 80%)",
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
          maxWidth: "80%",
          p: 2,
          //   pl: 0,
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          //   background: "rgba(255, 255, 255, 0.1)",
          background:
            "linear-gradient(270deg, #016A70 -80%, rgba(1, 106, 112, 0) 80%)",

          backdropFilter: "blur(10px)",
          boxShadow: "0px 2px 4px #bfbfbf",
          //   border: "1px solid rgba(255, 0, 0, 0.3)",
          borderLeft: "5px solid #016A70",
        }}
      >
        {/* Author Image */}
        <Avatar
          src={author?.image}
          alt={author?.name}
          variant="rounded"
          sx={{
            borderRadius: 4,
            width: "120px",
            height: "120px",
            fontSize: 32,
            fontWeight: "bold",
            bgcolor: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
          }}
        >
          {author?.name.charAt(0)}
        </Avatar>

        {/* Author Info */}
        <Stack spacing={0.5} flex={1}>
          <Typography variant="h6" fontWeight="bold">
            {author?.name}
          </Typography>
          <Typography variant="body2" color="#2C3E50">
            {author?.bio ||
              "This author loves sharing insightful thoughts through blogs."}
          </Typography>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} mt={1}>
            {/* <Tooltip title="Followers">
            <Button
              startIcon={<PeopleAltOutlined />}
              sx={{
                textTransform: "none",
                color: "#016A70",
                fontWeight: "bold",
              }}
            >
              {author.followers} Followers
            </Button>
          </Tooltip> */}
            <Tooltip title="Published Articles">
              <Button
                startIcon={<ArticleOutlined />}
                sx={{
                  textTransform: "none",
                  color: "#016A70",
                  fontWeight: "bold",
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
                  color: "#016A70",
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
