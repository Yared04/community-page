import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, Post } from "../api/postsApi";
import { Typography } from "@mui/material";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { addCommentToPost } from "../api/commentsApi";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      const id = parseInt(postId!);
      const data = await getPostById(id);
      setPost(data);
    };

    if (postId) fetchPost();
  }, [postId]);

  const handleCreateComment = async (text: string) => {
    await addCommentToPost(text, parseInt(postId!));
    const updatedPost = await getPostById(parseInt(postId!));
    if (updatedPost) setPost({ ...updatedPost }); // Create a new reference for the state
  };

  if (!post) {
    return <p>No Post Found</p>;
  }

  return (
    <>
      <Typography variant="h5" component="div" className="title">
        {post.title}
      </Typography>

      <Typography variant="body1">{post.content}</Typography>
      <CommentForm onSubmit={handleCreateComment} />

      {post.comments.map((comment) => (
        <CommentCard
          key={comment.id}
          postId={parseInt(postId!)}
          comment={comment}
          level={0}
          createdAt={comment.createdAt}
        />
      ))}
    </>
  );
};

export default PostDetail;
