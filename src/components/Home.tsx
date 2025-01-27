import React, { useEffect, useState } from "react";
import { getPosts, Post } from "../api/postsApi";
import PostList from "./PostsList";
import "../styles/_global.scss";

interface HomeProps {
  search: string;
}

const Home: React.FC<HomeProps> = ({ search }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="home">
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default Home;
