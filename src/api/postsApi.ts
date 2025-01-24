import { Comment } from "@mui/icons-material";
import mockData from "../data/mockData.json";
import { simulateApiDelay } from "../utils/fetchHelper";

export interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  replies: Comment[];
}

export const getPosts = async (): Promise<Post[]> => {
  return simulateApiDelay<Post[]>(mockData, 500); // Simulating API delay
};

export const getPostById = async (postId: number): Promise<Post | null> => {
  const post = mockData.find((p) => p.id === postId) || null;
  return simulateApiDelay<Post | null>(post, 500); // Simulating API delay
};

export const addPost = async (
  title: string,
  content: string
): Promise<Post> => {
  const newPost: Post = {
    id: Math.floor(Math.random() * 1000),
    title,
    content,
    comments: [],
  };
  //@ts-ignore
  mockData.push(newPost);
  return simulateApiDelay<Post>(newPost, 500); // Simulating API delay
};
