import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<PostForm />} />
      <Route path="/post/:postId" element={<PostDetail />} />
    </Routes>
  );
};

export default App;
