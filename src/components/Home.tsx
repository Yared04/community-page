import React, { useEffect, useState } from "react";
import { getPosts, Post } from "../api/postsApi";
import PostList from "./PostsList";
import PostForm from "./PostForm";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Community Page
      </Typography>
      <Button onClick={() => navigate("/create")} variant="outlined">
        Create Post
      </Button>
      <PostList posts={posts} />
    </Container>
  );
};

export default Home;
