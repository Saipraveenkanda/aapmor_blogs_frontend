import { useState } from "react";
import {
  Stack,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Cookies from "js-cookie";
import { FaStar } from "react-icons/fa";

const CommentSection = ({
  comments,
  handleLike,
  handleReply,
  user,
  getTimeAgo,
}) => {
  const token = Cookies.get("jwtToken");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  return (
    <Stack direction={"column"} spacing={0}>
      {comments.map((eachComment, index) => {
        const {
          comment,
          name,
          dateObject,
          likes = [],
          replies = [],
        } = eachComment;
        const time = getTimeAgo(dateObject);
        const hasLiked = likes.includes(user); // Check if the user has liked
        return (
          <Stack
            key={index}
            direction={"column"}
            spacing={1}
            sx={{ padding: 1 }}
          >
            <svg width="0" height="0">
              <defs>
                <linearGradient id="starGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FE8B76" />
                  <stop offset="100%" stopColor="#6360BE" />
                </linearGradient>
              </defs>
            </svg>
            {/* Main Comment */}
            <Stack direction={"row"} spacing={2}>
              <Avatar>{name?.[0]?.toUpperCase()}</Avatar>
              <Stack direction={"column"} spacing={1} flex={1}>
                <Typography variant="inherit" fontWeight={600}>
                  {name}{" "}
                  <text style={{ color: "grey", fontSize: "10px" }}>
                    {"\u25CF"}
                  </text>
                  <span
                    style={{
                      fontWeight: "lighter",
                      color: "lightslategray",
                      fontSize: "12px",
                    }}
                  >
                    {" "}
                    {time}
                  </span>
                </Typography>

                <Typography variant="body2">
                  {comment?.trim() || "(Empty Comment)"}
                </Typography>

                {/* Like & Reply Buttons */}
                {token !== undefined && (
                  <Stack direction={"row"} spacing={1} alignItems="center">
                    <IconButton
                      size="small"
                      onClick={() => handleLike(index)}
                      color={hasLiked ? "accent.main" : "default"}
                    >
                      {hasLiked ? (
                        <ThumbUpAltIcon sx={{ color: "accent.main" }} />
                      ) : (
                        <ThumbUpOffAltIcon />
                      )}
                    </IconButton>
                    <Typography variant="caption">{likes.length}</Typography>

                    <Button
                      size="small"
                      startIcon={<ReplyIcon />}
                      onClick={() =>
                        setReplyingTo(replyingTo === index ? null : index)
                      }
                      sx={{ textTransform: "none" }}
                    >
                      Reply
                    </Button>
                  </Stack>
                )}
                {/* Reply Input Field */}
                {replyingTo === index && (
                  <Stack direction={"row"} spacing={1} mt={1}>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      sx={{
                        border: "1px solid #bfbfbf",
                        outline: "none",
                        "& fieldset": { border: "none" }, // Removes border in outlined variant
                        "&:hover fieldset": { border: "none" }, // Prevents border on hover
                        "&.Mui-focused fieldset": { border: "none" }, // Prevents border on focus
                        backgroundColor: "#bfbfbf20",
                        borderRadius: "16px",
                        // padding: "8px",
                      }}
                    />
                    <IconButton
                      title="Reply"
                      disabled={replyText?.trim() === ""}
                      disableFocusRipple
                      disableRipple
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        handleReply(index, replyText);
                        setReplyingTo(null);
                        setReplyText("");
                      }}
                      sx={{
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <SendIcon
                        fontSize="medium"
                        className="winner-icon gradient-icon"
                        style={{
                          fill:
                            replyText?.trim() !== "" && "url(#starGradient)",
                        }}
                      />
                    </IconButton>
                  </Stack>
                )}

                {/* Render Replies */}
                {replies.length > 0 && (
                  <Stack spacing={1} mt={1} ml={5}>
                    {replies.map((reply) => (
                      <Stack key={reply.index} direction="row" spacing={2}>
                        <Avatar sx={{ width: 30, height: 30 }}>
                          {reply.name[0].toUpperCase()}
                        </Avatar>
                        <Stack direction="column">
                          <Typography variant="caption" fontWeight={600}>
                            {reply.name}
                          </Typography>
                          <Typography variant="body2">
                            {reply.comment}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Divider />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default CommentSection;
