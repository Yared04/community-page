import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import Toolbar from "@mui/material/Toolbar";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "../styles/components/_sideNav.scss";
import { useNavigate } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import Title from "./Title";

interface DrawerProps {
  drawerWidth: number;
  children: React.ReactNode;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SideNav: React.FC<DrawerProps> = ({
  drawerWidth,
  children,
  search,
  setSearch,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (setSearch) setSearch(e.target.value);
  };

  const path_component_map: { [key: string]: JSX.Element } = {
    "/": (
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => handleSearch(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e as never);
          }
        }}
        sx={{
          display: { xs: "none", md: "block", marginLeft: 24 },
          borderRadius: "120px",
        }}
        className="form-input"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    ),
    "/forums": <Title title="Forums" />,
    default: <Title title="Post Detail" />,
  };

  const drawer = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <List sx={{ paddingX: 1 }}>
        {[
          { name: "Home", route: "/" },
          { name: "Forums", route: "/forums" },
        ].map((item, index) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.route)}
              selected={item.route === window.location.pathname}
              className="nav-item"
            >
              <ListItemIcon sx={{ minWidth: "fit-content", marginRight: 1.5 }}>
                {index % 2 === 0 ? <HomeRoundedIcon /> : <ForumRoundedIcon />}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginX: 2 }} />
    </div>
  );

  return (
    <Box className="side-nav">
      <CssBaseline />
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="app-bar"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {path_component_map[window.location.pathname] ||
            path_component_map.default}
          {children}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default SideNav;
