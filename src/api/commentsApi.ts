import mockData from "../data/mockData.json";
import { Comment, Post } from "./postsApi";
import { simulateApiDelay } from "../utils/fetchHelper";

export const addCommentToPost = async (
  comment: string,
  postId: number,
  commentId?: number
) => {
  const newComment = {
    id: Math.floor(Math.random() * 1000),
    content: comment,
    replies: [],
    createdAt: new Date().toISOString(),
  };
  const post = mockData.find((p) => p.id === postId);
  if (!post) {
    return null;
  }
  if (!commentId) {
    post.comments.push(newComment);
  } else {
    const findComment = (comments: Comment[]): Comment | undefined => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === commentId) {
          return comments[i];
        }
        if (comments[i].replies) {
          const foundComment = findComment(comments[i].replies);
          if (foundComment) {
            return foundComment;
          }
        }
      }
    };
    const parentComment = findComment(post.comments);
    if (parentComment) {
      parentComment.replies.push(newComment);
    }
  }
  return simulateApiDelay<Post>(post);
};
