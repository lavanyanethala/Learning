import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  Chip,
  Tooltip,
  useTheme,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DownloadIcon from "@mui/icons-material/Download";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CodeIcon from "@mui/icons-material/Code";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
  { id: "roadmap", label: "Roadmap", icon: <AltRouteIcon fontSize="small" /> },
  { id: "exam", label: "AI Exam", icon: <QuizIcon fontSize="small" />, badge: "AI" },
  { id: "jd-prep", label: "JD Copilot", icon: <AutoAwesomeIcon fontSize="small" />, badge: "AI" },
  { id: "practice", label: "Sandbox", icon: <CodeIcon fontSize="small" /> },
  { id: "documents", label: "Documents", icon: <DriveFolderUploadIcon fontSize="small" /> },
  { id: "softwares", label: "Dev Tools", icon: <DownloadIcon fontSize="small" /> },
];

export default function Navbar({
  currentTab,
  onTabChange,
  user,
  onLogout,
  colorMode,
  onToggleColorMode,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleSelectTab = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
    setMobileDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: isDark ? "rgba(8, 12, 20, 0.88)" : "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 0.5,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 3.5 } }}>
          {/* Left: Brand Emblem & Portal Name */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "center", cursor: "pointer", flexShrink: 0 }}
            onClick={() => handleSelectTab("dashboard")}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #2E5E99 0%, #7BA4D0 100%)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(46, 94, 153, 0.35)",
              }}
            >
              <SchoolIcon fontSize="small" />
            </Box>

            <Box>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={850}
                  sx={{
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                    background: isDark
                      ? "linear-gradient(135deg, #ffffff 0%, #7BA4D0 100%)"
                      : "linear-gradient(135deg, #0D2440 0%, #2E5E99 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  YouCan Portal
                </Typography>
                <Chip
                  label="STUDIO"
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.58rem",
                    fontWeight: 800,
                    bgcolor: isDark ? "rgba(79, 70, 229, 0.25)" : "rgba(79, 70, 229, 0.12)",
                    color: "primary.main",
                    border: "1px solid",
                    borderColor: isDark ? "rgba(79, 70, 229, 0.4)" : "rgba(79, 70, 229, 0.2)",
                    borderRadius: 9999,
                    display: { xs: "none", sm: "inline-flex" },
                  }}
                />
              </Stack>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: { xs: "none", md: "block" }, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}
              >
                Fullstack Engineering Cockpit
              </Typography>
            </Box>
          </Stack>

          {/* Center: Top Navigation Tabs (Desktop / Tablet) */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 0.6,
              px: 1,
              py: 0.5,
              borderRadius: 9999,
              bgcolor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.03)",
              border: "1px solid",
              borderColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(15, 23, 42, 0.06)",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = currentTab === item.id;
              const isAi = item.badge === "AI";

              return (
                <Button
                  key={item.id}
                  size="small"
                  onClick={() => handleSelectTab(item.id)}
                  startIcon={item.icon}
                  sx={{
                    borderRadius: 9999,
                    py: 0.65,
                    px: 1.6,
                    fontSize: "0.8rem",
                    fontWeight: active ? 800 : 650,
                    color: active
                      ? isDark ? "#ffffff" : "#2E5E99"
                      : "text.secondary",
                    bgcolor: active
                      ? isDark
                        ? "linear-gradient(135deg, rgba(46, 94, 153, 0.45) 0%, rgba(123, 164, 208, 0.25) 100%)"
                        : "#ffffff"
                      : "transparent",
                    boxShadow: active
                      ? isDark
                        ? "0 2px 10px rgba(0, 0, 0, 0.4)"
                        : "0 2px 10px rgba(15, 23, 42, 0.06)"
                      : "none",
                    border: active
                      ? "1px solid"
                      : "1px solid transparent",
                    borderColor: active
                      ? isDark ? "rgba(79, 70, 229, 0.4)" : "rgba(79, 70, 229, 0.2)"
                      : "transparent",
                    transition: "all 0.18s ease",
                    "&:hover": {
                      bgcolor: active
                        ? undefined
                        : isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(15, 23, 42, 0.05)",
                      color: "text.primary",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  {item.label}
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        ml: 0.6,
                        height: 16,
                        fontSize: "0.58rem",
                        fontWeight: 800,
                        borderRadius: 9999,
                        bgcolor: active ? "rgba(0, 197, 224, 0.25)" : "rgba(79, 70, 229, 0.15)",
                        color: active ? (isDark ? "#38BDF8" : "#0284C7") : "primary.main",
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Box>

          {/* Right: User Capsule, Theme Toggle & Controls */}
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            {/* User Profile Capsule */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
                px: 1.2,
                py: 0.5,
                borderRadius: 9999,
                bgcolor: isDark ? "rgba(255, 255, 255, 0.04)" : "#F8FAFC",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #2E5E99 0%, #7BA4D0 100%)",
                }}
              >
                {user?.username ? user.username.charAt(0).toUpperCase() : "S"}
              </Avatar>
              <Typography variant="caption" fontWeight={750} sx={{ pr: 0.6, color: "text.primary" }}>
                {user?.username || "Student"}
              </Typography>
            </Box>

            {/* Dark / Light Mode Toggle */}
            <Tooltip title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              <IconButton onClick={onToggleColorMode} color="inherit" size="small" sx={{ p: 0.9 }}>
                {isDark ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Logout Button */}
            <Tooltip title="Sign Out">
              <IconButton size="small" color="error" onClick={onLogout} sx={{ p: 0.9 }}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Mobile Hamburger Button */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setMobileDrawerOpen(true)}
              sx={{ display: { xs: "inline-flex", lg: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile / Tablet Drawer Menu */}
      <Drawer
        anchor="top"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        PaperProps={{
          sx: {
            p: 2.5,
            bgcolor: isDark ? "#0D2440" : "#FFFFFF",
            backgroundImage: "none",
            borderBottom: "1px solid",
            borderColor: "divider",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          },
        }}
      >
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #2E5E99 0%, #7BA4D0 100%)",
                color: "#fff",
              }}
            >
              <SchoolIcon fontSize="small" />
            </Box>
            <Typography variant="subtitle1" fontWeight={800}>
              Navigation Menu
            </Typography>
          </Stack>
          <IconButton size="small" onClick={() => setMobileDrawerOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 1.5 }} />

        <List disablePadding>
          {NAV_ITEMS.map((item) => {
            const active = currentTab === item.id;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.6 }}>
                <ListItemButton
                  selected={active}
                  onClick={() => handleSelectTab(item.id)}
                  sx={{
                    borderRadius: 2.5,
                    py: 1,
                    px: 1.8,
                    bgcolor: active
                      ? isDark ? "rgba(79, 70, 229, 0.22)" : "rgba(79, 70, 229, 0.1)"
                      : "transparent",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: active ? "primary.main" : "text.secondary" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        fontWeight: active ? 800 : 600,
                        fontSize: "0.88rem",
                        color: active ? "primary.main" : "text.primary",
                      },
                    }}
                  />
                  {item.badge && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        bgcolor: "rgba(0, 197, 224, 0.15)",
                        color: "#00C5E0",
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
