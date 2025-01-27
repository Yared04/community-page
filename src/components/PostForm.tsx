import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addPost } from "../api/postsApi";
import { useNavigate } from "react-router-dom";

const PostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost(title, body);
    setTitle("");
    setBody("");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <TextField
        label="Post Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Post Body"
        variant="outlined"
        fullWidth
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ marginBottom: "10px" }}
        multiline
        rows={4}
      />
      <Button
        disableElevation
        disableRipple
        sx={{ textTransform: "none", float: "right" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
};

export default PostForm;
