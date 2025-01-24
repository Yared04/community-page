import { Stack } from "@mui/material";
import PostCard from "./PostCard";
import { Post } from "../api/postsApi";

interface PostListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostListProps) => {
  return (
    <Stack spacing={2}>
      {posts.map((post, index) => (
        <PostCard
          key={index}
          postId={post.id}
          title={post.title}
          body={post.content}
        />
      ))}
    </Stack>
  );
};

export default PostsList;
