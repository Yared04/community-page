import React, { useState } from "react";
import { TextField, Box, InputAdornment, IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

interface CommentFormProps {
  label?: string;
  onSubmit: (text: string) => void;
}
const CommentForm: React.FC<CommentFormProps> = ({
  label = "Add a comment",
  onSubmit,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ marginBottom: 3, marginTop: 1 }}
    >
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        multiline
        rows={1}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SendRoundedIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        className="form-input large"
      />
    </Box>
  );
};

export default CommentForm;
