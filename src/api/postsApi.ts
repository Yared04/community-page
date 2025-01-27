import { Comment } from "@mui/icons-material";
import mockData from "../data/mockData.json";
import { simulateApiDelay } from "../utils/fetchHelper";

export interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: number;
  content: string;
  replies: Comment[];
  createdAt: string;
}

const data: Post[] = mockData; // Cast mockData to the Post[] type

export const getPosts = async (): Promise<Post[]> => {
  return simulateApiDelay<Post[]>(data); // Simulating API delay
};

export const getPostById = async (postId: number): Promise<Post | null> => {
  const post = data.find((p) => p.id === postId) || null;
  return simulateApiDelay<Post | null>(post); // Simulating API delay
};

export const addPost = async (title: string, content: string) => {
  const newPost: Post = {
    id: Math.floor(Math.random() * 1000),
    title,
    content,
    comments: [],
    createdAt: new Date().toISOString(),
  };
  data.push(newPost);
  return simulateApiDelay<Post>(newPost); // Simulating API delay
};
