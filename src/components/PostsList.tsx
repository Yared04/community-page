import { Divider, Stack } from "@mui/material";
import PostCard from "./PostCard";
import { Post } from "../api/postsApi";
import { countThreads } from "../utils/countThreads";

interface PostListProps {
  posts: Post[];
}

const PostsList = ({ posts }: PostListProps) => {
  return (
    <Stack spacing={0}>
      {posts.map((post, index) => (
        <div key={index}>
          <PostCard
            postId={post.id}
            title={post.title}
            body={post.content}
            createdAt={post.createdAt}
            threads={countThreads(post.comments) || 0}
          />
          <Divider sx={{ marginX: 2 }} />
        </div>
      ))}
    </Stack>
  );
};

export default PostsList;
