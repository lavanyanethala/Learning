import React from "react";
import {
  Box,
  Drawer,
  Typography,
  Stack,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
  Avatar,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DownloadIcon from "@mui/icons-material/Download";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CodeIcon from "@mui/icons-material/Code";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CloseIcon from "@mui/icons-material/Close";

export const SIDEBAR_WIDTH = 260;

const NAV_GROUPS = [
  {
    group: "OVERVIEW",
    items: [
      { id: "dashboard", label: "Dashboard Hub", icon: <DashboardIcon fontSize="small" />, badge: "Start" },
    ],
  },
  {
    group: "AI TOOLS",
    items: [
      { id: "exam", label: "AI Exam & Self Check", icon: <QuizIcon fontSize="small" />, badge: "AI" },
      { id: "jd-prep", label: "AI JD Copilot", icon: <AutoAwesomeIcon fontSize="small" />, badge: "AI" },
    ],
  },
  {
    group: "CURRICULUM & STUDY",
    items: [
      { id: "roadmap", label: "Syllabus Roadmap", icon: <AltRouteIcon fontSize="small" /> },
      { id: "documents", label: "Study Documents", icon: <DriveFolderUploadIcon fontSize="small" /> },
    ],
  },
  {
    group: "DEVELOPER LAB",
    items: [
      { id: "practice", label: "Frontend Sandbox", icon: <CodeIcon fontSize="small" /> },
      { id: "softwares", label: "Dev Softwares Hub", icon: <DownloadIcon fontSize="small" /> },
    ],
  },
];

export default function Sidebar({
  currentTab,
  onTabChange,
  user,
  onLogout,
  colorMode,
  onToggleColorMode,
  mobileOpen,
  onMobileClose,
}) {
  const theme = useTheme();

  const handleSelectTab = (tabId) => {
    onTabChange(tabId);
    if (mobileOpen && onMobileClose) {
      onMobileClose();
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "rgba(10, 14, 24, 0.96)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          p: 2.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack
          direction="row"
          spacing={1.4}
          alignItems="center"
          onClick={() => handleSelectTab("dashboard")}
          sx={{ cursor: "pointer", minWidth: 0 }}
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
              flexShrink: 0,
            }}
          >
            <SchoolIcon fontSize="small" />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight={850}
              noWrap
              sx={{
                lineHeight: 1.2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #ffffff 0%, #7BA4D0 100%)"
                    : "linear-gradient(135deg, #0D2440 0%, #2E5E99 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              YouCan Portal
            </Typography>
            <Stack direction="row" spacing={0.8} alignItems="center">
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={750}
                sx={{ fontSize: "0.68rem", letterSpacing: "0.04em", textTransform: "uppercase" }}
              >
                Studio Cockpit
              </Typography>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#10B981",
                  boxShadow: "0 0 8px #10B981",
                }}
                className="animate-pulse-green"
              />
            </Stack>
          </Box>
        </Stack>

        {/* Mobile close button */}
        <IconButton
          size="small"
          onClick={onMobileClose}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Navigation Groups List */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          py: 1.5,
          px: 1.4,
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "divider",
            borderRadius: 4,
          },
        }}
      >
        {NAV_GROUPS.map((group, groupIdx) => (
          <Box key={groupIdx} sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              fontWeight={800}
              color="text.secondary"
              sx={{
                display: "block",
                px: 1.2,
                mb: 0.6,
                letterSpacing: 0.6,
                fontSize: "0.68rem",
              }}
            >
              {group.group}
            </Typography>

            <List disablePadding>
              {group.items.map((item) => {
                const active = currentTab === item.id;
                const isAi = item.badge === "AI";

                return (
                  <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      selected={active}
                      onClick={() => handleSelectTab(item.id)}
                      sx={{
                        borderRadius: 2.8,
                        py: 0.9,
                        px: 1.5,
                        transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                        bgcolor: active
                          ? isAi
                            ? (theme) =>
                                theme.palette.mode === "dark"
                                  ? "linear-gradient(90deg, rgba(79, 70, 229, 0.28) 0%, rgba(0, 197, 224, 0.12) 100%)"
                                  : "linear-gradient(90deg, rgba(79, 70, 229, 0.14) 0%, rgba(0, 197, 224, 0.06) 100%)"
                            : (theme) =>
                                theme.palette.mode === "dark"
                                  ? "linear-gradient(90deg, rgba(79, 70, 229, 0.2) 0%, rgba(255, 255, 255, 0.03) 100%)"
                                  : "linear-gradient(90deg, rgba(79, 70, 229, 0.1) 0%, rgba(0, 0, 0, 0.01) 100%)"
                          : "transparent",
                        borderLeft: active
                          ? isAi
                            ? "3px solid #7BA4D0"
                            : "3px solid #2E5E99"
                          : "3px solid transparent",
                        boxShadow: active
                          ? isAi
                            ? "0 2px 10px rgba(123, 164, 208, 0.22)"
                            : "0 2px 10px rgba(46, 94, 153, 0.18)"
                          : "none",
                        "&:hover": {
                          bgcolor: active
                            ? undefined
                            : (theme) =>
                                theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.04)"
                                  : "rgba(15, 23, 42, 0.03)",
                          transform: "translateX(3px)",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 32,
                          color: active
                            ? isAi
                              ? "secondary.main"
                              : "primary.main"
                            : "text.secondary",
                          transition: "color 0.15s ease",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            fontSize: "0.83rem",
                            fontWeight: active ? 800 : 600,
                            color: active ? "text.primary" : "text.secondary",
                            noWrap: true,
                            letterSpacing: active ? "-0.01em" : "0",
                          },
                        }}
                      />

                      {item.badge && (
                        <Chip
                          label={item.badge}
                          size="small"
                          sx={{
                            height: 19,
                            fontSize: "0.62rem",
                            fontWeight: 800,
                            borderRadius: 9999,
                            bgcolor: active
                              ? "rgba(0, 197, 224, 0.18)"
                              : "rgba(79, 70, 229, 0.12)",
                            color: active ? "secondary.dark" : "primary.main",
                            border: "1px solid",
                            borderColor: active ? "rgba(0, 197, 224, 0.4)" : "rgba(79, 70, 229, 0.2)",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* Footer User Info & Controls */}
      <Box
        sx={{
          p: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(14, 20, 36, 0.7)"
              : "rgba(244, 247, 251, 0.8)",
        }}
      >
        <Box
          sx={{
            p: 1.2,
            borderRadius: 3,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.04)" : "#ffffff",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "none"
                : "0 2px 8px rgba(15, 23, 42, 0.03)",
          }}
        >
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", minWidth: 0 }}>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #2E5E99 0%, #7BA4D0 100%)",
                  boxShadow: "0 2px 8px rgba(46, 94, 153, 0.3)",
                }}
              >
                {user?.username ? user.username.charAt(0).toUpperCase() : "S"}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" fontWeight={800} noWrap sx={{ lineHeight: 1.2 }}>
                  {user?.username || "Student"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: "0.68rem", fontWeight: 650 }}
                >
                  Active Session
                </Typography>
              </Box>
            </Stack>

          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <Tooltip title={colorMode === "dark" ? "Light Mode" : "Dark Mode"}>
              <IconButton size="small" onClick={onToggleColorMode} color="inherit">
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton size="small" color="error" onClick={onLogout}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: "none", md: "block" },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer Sidebar */}
      <Drawer
        anchor="left"
        open={Boolean(mobileOpen)}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            border: "none",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}
