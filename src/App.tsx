import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import { Box, Button, IconButton } from "@mui/material";
import SideNav from "./components/SideNav";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

interface AppProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const App: React.FC<AppProps> = ({ darkMode, setDarkMode }) => {
  const drawerWidth = 180;

  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(savedTheme === "true");
    }
  }, [setDarkMode]);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  return (
    <>
      <Box sx={{ display: "flex", position: "relative" }}>
        <SideNav
          search={search}
          setSearch={setSearch}
          drawerWidth={drawerWidth}
          children={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "20rem",
                marginLeft: "auto",
              }}
            >
              {window.location.pathname === "/" && (
                <Button
                  onClick={() => navigate("/create")}
                  variant="contained"
                  className="large-btn"
                >
                  <ControlPointRoundedIcon
                    sx={{ marginRight: "0.5rem", color: "#fff" }}
                  />

                  <span>Create Post</span>
                </Button>
              )}
              <IconButton
                sx={{ marginLeft: "auto" }}
                disableRipple
                onClick={toggleTheme}
                color="inherit"
              >
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </div>
          }
        />
        <Box component="main" className="main-content">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/create" element={<PostForm />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default App;
