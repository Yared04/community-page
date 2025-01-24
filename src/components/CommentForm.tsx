import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface CommentFormProps {
  onSubmit: (text: string) => void;
}
const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      <TextField
        label="Add a Comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={2}
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CommentForm;
