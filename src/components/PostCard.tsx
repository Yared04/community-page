import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  postId: number;
  title: string;
  body: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, body, postId }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ marginBottom: "20px" }}
      onClick={() => navigate(`/post/${postId}`)}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>

        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
