import React from "react";
import { Typography, Box, IconButton, Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CommentForm from "./CommentForm";
import { addCommentToPost } from "../api/commentsApi";
import { Comment } from "../api/postsApi";

interface CommentCardProps {
  comment: Comment;
  level: number;
  postId: number;
}

const CommentCard: React.FC<CommentCardProps> = ({
  postId,
  comment,
  level,
}) => {
  const [showReplies, setShowReplies] = React.useState(false);
  const [showReplyForm, setShowReplyForm] = React.useState(false);

  const onReplySubmit = (text: string) => {
    addCommentToPost(text, postId, comment.id);
    setShowReplyForm(false);
  };
  return (
    <>
      <Box
        sx={{
          marginLeft: level * 2 + "rem",
        }}
      >
        <Typography variant="body2">
          Comment ID: {comment.id} . Jan 2, 2024
        </Typography>
        <Typography
          sx={{
            borderLeft: "1px solid #ccc",
            padding: "0.5rem",
          }}
          variant="body1"
        >
          {comment.content}
        </Typography>
        <Box>
          {comment.replies && comment.replies.length > 0 && (
            <IconButton
              sx={{ padding: "0", marginLeft: "-0.7rem", marginTop: "-0.1rem" }}
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies ? (
                <RemoveCircleOutlineIcon />
              ) : (
                <AddCircleOutlineIcon />
              )}
            </IconButton>
          )}
          <Button onClick={() => setShowReplyForm(!showReplyForm)}>
            Reply
          </Button>
        </Box>
        {showReplyForm && <CommentForm onSubmit={onReplySubmit} />}
        {comment.replies &&
          showReplies &&
          comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              postId={postId}
              comment={reply}
              level={level + 1}
            />
          ))}
      </Box>
    </>
  );
};

export default CommentCard;
