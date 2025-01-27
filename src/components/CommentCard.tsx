import React, { useState, useEffect } from "react";
import { Typography, Box, IconButton, Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CommentForm from "./CommentForm";
import { addCommentToPost } from "../api/commentsApi";
import { Comment } from "../api/postsApi";
import { timeAgo } from "../utils/dateUtility";

interface CommentCardProps {
  comment: Comment;
  level: number;
  postId: number;
  createdAt: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  postId,
  comment,
  level,
  createdAt,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [timeAgoText, setTimeAgoText] = useState(timeAgo(createdAt));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgoText(timeAgo(createdAt));
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [createdAt]);

  const onReplySubmit = (text: string) => {
    addCommentToPost(text, postId, comment.id);
    setShowReplyForm(false);
    setShowReplies(true);
  };
  return (
    <>
      <Box
        sx={{
          marginLeft: "2rem",
        }}
      >
        <Box
          sx={{
            borderLeft: "1px solid #ccc",
            borderRadius: "0.5rem",
            padding: "0.5rem",
            marginTop: "-0.5rem",
            marginBottom: "-0.5rem",
          }}
        >
          <Typography variant="body2">
            <span className="sub-text">{timeAgoText}</span>
          </Typography>
          <Typography variant="body1">{comment.content}</Typography>
        </Box>

        <Box>
          {comment.replies && comment.replies.length > 0 && (
            <IconButton
              sx={{
                padding: "0",
                marginLeft: "-0.5rem",
              }}
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <RemoveCircleOutlineIcon sx={{ fontSize: "medium" }} />
              ) : (
                <AddCircleOutlineIcon sx={{ fontSize: "medium" }} />
              )}
            </IconButton>
          )}
          <Button
            sx={{
              textTransform: "none",
              ":hover": { backgroundColor: "transparent" },
            }}
            onClick={() => setShowReplyForm(!showReplyForm)}
            disableRipple
          >
            <ChatBubbleOutlineRoundedIcon
              sx={{
                marginRight: "0.3rem",
                marginTop: "2px",
                fontSize: "medium",
              }}
            />
            <span style={{ color: "inherit" }} className="sub-text">
              Reply
            </span>
          </Button>
        </Box>
        {showReplyForm && (
          <CommentForm label="Add a reply" onSubmit={onReplySubmit} />
        )}
        {comment.replies &&
          showReplies &&
          comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              postId={postId}
              comment={reply}
              level={level + 1}
              createdAt={reply.createdAt}
            />
          ))}
      </Box>
    </>
  );
};

export default CommentCard;
