import React, { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline, Box, Typography, Container } from "@mui/material";
import { getTheme } from "./theme";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LusionEffects from "./components/LusionEffects";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("AUTH_USER");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [mode, setMode] = useState(() => localStorage.getItem("APP_THEME") || "light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const handleToggleColorMode = () => {
    const nextMode = mode === "light" ? "dark" : "light";
    setMode(nextMode);
    localStorage.setItem("APP_THEME", nextMode);
  };

  const handleLogin = (authenticatedUser) => {
    const studentUser = { ...authenticatedUser, role: "student" };
    setUser(studentUser);
    localStorage.setItem("AUTH_USER", JSON.stringify(studentUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("AUTH_USER");
  };

  // If not logged in, show the Login Page
  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginPage onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LusionEffects />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          bgcolor: "background.default",
          backgroundImage: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(at 10% 12%, rgba(46, 94, 153, 0.22) 0px, transparent 50%), radial-gradient(at 90% 88%, rgba(123, 164, 208, 0.14) 0px, transparent 50%)"
              : "radial-gradient(at 10% 12%, rgba(46, 94, 153, 0.08) 0px, transparent 50%), radial-gradient(at 90% 88%, rgba(123, 164, 208, 0.08) 0px, transparent 50%)",
          color: "text.primary",
        }}
      >
        {/* All Features Unified Directly inside Dashboard */}
        <Box component="main" sx={{ flex: 1, width: "100%" }}>
          <DashboardPage
            user={user}
            colorMode={mode}
            onToggleColorMode={handleToggleColorMode}
            onLogout={handleLogout}
          />
        </Box>

        {/* Minimal Global Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: "auto",
            bgcolor: "background.paper",
            borderTop: "1px solid",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Container maxWidth="xl">
            <Typography variant="body2" color="text.secondary">
              <strong>YouCan Student Learning Portal</strong> &bull; AI Powered &bull; Single Hub Dashboard
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
