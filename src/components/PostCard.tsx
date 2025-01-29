import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/components/_postCard.scss";
import { timeAgo } from "../utils/dateUtility";

interface PostCardProps {
  postId: number;
  title: string;
  body: string;
  createdAt: string;
  threads: number;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  body,
  postId,
  createdAt,
  threads,
}) => {
  const navigate = useNavigate();
  const [timeAgoText, setTimeAgoText] = useState(timeAgo(createdAt));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgoText(timeAgo(createdAt));
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [createdAt]);

  return (
    <Card
      elevation={1}
      onClick={() => navigate(`/post/${postId}`)}
      className="post-card"
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {body}
        </Typography>
        <div className="post-card-footer">
          <span>{timeAgoText}</span>
          <span>{threads} Threads</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
