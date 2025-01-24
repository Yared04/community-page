import mockData from "../data/mockData.json";
import { Comment } from "./postsApi";

export const fetchCommentsForPost = async (postId: number) => {
  return new Promise((resolve) => {
    const post = mockData.find((p) => p.id === postId);
    setTimeout(() => resolve(post?.comments || []), 500); // Simulate API delay
  });
};

export const addCommentToPost = async (
  comment: string,
  postId: number,
  commentId?: number
): Promise<Comment | null> => {
  return new Promise((resolve) => {
    const newComment = {
      id: Math.floor(Math.random() * 1000),
      content: comment,
      replies: [],
    };
    const post = mockData.find((p) => p.id === postId);
    if (!post) {
      return resolve(null);
    }
    if (!commentId) {
      post.comments.push(newComment);
      console.log(post);
    } else {
      const findComment: any = (comments: Comment[]) => {
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
    setTimeout(() => resolve(newComment), 500); // Simulate API delay
    return resolve(newComment);
  });
};
