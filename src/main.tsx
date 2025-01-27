import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App.tsx";
import "./styles/main.scss";

interface CustomCSSProperties extends React.CSSProperties {
  "--nav-bg-light"?: string;
  "--nav-bg-dark"?: string;
  "--nav-text-light"?: string;
  "--nav-text-dark"?: string;
}

const AppWrapper = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: darkMode ? undefined : "#1976d2",
          },
        },
      },
    },
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      style={
        {
          "--nav-bg-light": "rgba(25, 118, 210, 0.1)",
          "--nav-bg-dark": "#1976d2",
        } as CustomCSSProperties
      }
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App darkMode={darkMode} setDarkMode={setDarkMode} />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
