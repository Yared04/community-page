import { Comment } from "../api/postsApi";
export const countThreads = (comments: Comment[]): number => {
  if (!comments || comments.length === 0) {
    return 0;
  }
  let count = comments.length;
  // Recursively count threads in replies
  comments.forEach((comment) => {
    if (comment.replies.length > 0) {
      count += countThreads(comment.replies);
    }
  });

  return count;
};
