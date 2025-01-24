import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment, getPostById, Post } from "../api/postsApi";
import { Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { addCommentToPost } from "../api/commentsApi";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  if (!postId) {
    return <p>No Post Found</p>;
  }
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      const id = parseInt(postId);
      const data = await getPostById(id);
      setPost(data);
    };

    fetchPost();
  }, []);

  const handleCreateComment = async (text: string) => {
    await addCommentToPost(text, parseInt(postId));
    console.log(post);
  };

  if (!post) {
    return <p>No Post Found</p>;
  }

  return (
    <>
      <Typography variant="h5" component="div">
        {post.title}
      </Typography>

      <Typography variant="body1">{post.content}</Typography>
      <CommentForm onSubmit={handleCreateComment} />

      {post.comments.map((comment) => (
        <CommentCard
          key={comment.id}
          postId={parseInt(postId)}
          comment={comment}
          level={0}
        />
      ))}
    </>
  );
};

export default PostDetail;
