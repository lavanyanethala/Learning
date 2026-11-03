import React, { useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginIcon from "@mui/icons-material/Login";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { api } from "../services/api";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("student");
  const [password, setPassword] = useState("student123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleQuickFill = () => {
    setErrorMsg("");
    setUsername("student");
    setPassword("student123");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {
      const user = await api.login(username, password);
      // Ensure student role
      onLogin({ ...user, role: "student" });
    } catch (err) {
      const u = username.trim().toLowerCase();
      const p = password.trim();

      if ((u === "student" || u === "student@youcan.com" || u === "student@notebook.com") && p === "student123") {
        onLogin({
          id: "student-1",
          username: "student",
          name: "Student Learner",
          role: "student",
          email: "student@youcan.com",
        });
      } else {
        // Allow any login as student for seamless demo experience
        onLogin({
          id: "student-1",
          username: username.trim(),
          name: username.trim(),
          role: "student",
          email: `${username.trim()}@youcan.com`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) => (theme.palette.mode === "dark" ? "#0D2440" : "#E7F0FA"),
        backgroundImage: (theme) =>
          theme.palette.mode === "dark"
            ? "radial-gradient(at 15% 20%, rgba(46, 94, 153, 0.22) 0px, transparent 50%), radial-gradient(at 85% 80%, rgba(123, 164, 208, 0.14) 0px, transparent 50%), radial-gradient(at 50% 10%, rgba(13, 36, 64, 0.6) 0px, transparent 80%)"
            : "radial-gradient(at 15% 20%, rgba(46, 94, 153, 0.1) 0px, transparent 50%), radial-gradient(at 85% 80%, rgba(123, 164, 208, 0.08) 0px, transparent 50%)",
        p: 2,
        position: "relative",
      }}
    >
      <Container maxWidth="sm" className="animate-fade-in-up">
        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 25px 60px rgba(5,14,26,0.8)"
                : "0 20px 50px rgba(46, 94, 153, 0.12)",
            overflow: "hidden",
            bgcolor: "background.paper",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Card Header */}
          <Box
            sx={{
              p: 3.5,
              pb: 3,
              textAlign: "center",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #132F52 0%, #0D2440 100%)"
                  : "linear-gradient(135deg, #E7F0FA 0%, #FFFFFF 100%)",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                mx: "auto",
                mb: 1.5,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #2E5E99 0%, #7BA4D0 100%)",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(46, 94, 153, 0.35)",
              }}
            >
              <SchoolIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h5" fontWeight={850} letterSpacing="-0.02em" gutterBottom>
              YouCan Learning Portal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your Zenith Studio workspace to resume roadmaps, exams, and labs
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Student Username / Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="student or student@youcan.com"
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                  sx={{
                    py: 1.3,
                    borderRadius: 2.5,
                    fontWeight: 800,
                    fontSize: "1rem",
                    textTransform: "none",
                    bgcolor: "#2E5E99",
                    boxShadow: "0 4px 14px rgba(46, 94, 153, 0.35)",
                    "&:hover": { bgcolor: "#1D406E" },
                  }}
                >
                  {loading ? "Signing in..." : "Enter Learning Workspace"}
                </Button>
              </Stack>
            </form>

            <Divider sx={{ my: 3 }} />

            {/* Quick Demo Credentials Helper */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1.2, fontWeight: 600 }}>
                Demo Account:
              </Typography>
              <Chip
                icon={<PersonIcon fontSize="small" />}
                label="Click to fill: student / student123"
                clickable
                variant="outlined"
                color="primary"
                onClick={handleQuickFill}
                sx={{ fontWeight: 700, py: 1.8, px: 1 }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Feature Highlights Pills */}
        <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 3 }} flexWrap="wrap">
          <Chip
            icon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            size="small"
            label="AI Knowledge Checker"
            sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider", fontWeight: 600, py: 1.5 }}
          />
          <Chip
            size="small"
            label="🚀 AI JD Interview Copilot"
            sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider", fontWeight: 600, py: 1.5 }}
          />
          <Chip
            size="small"
            label="💻 Live Frontend Sandbox"
            sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider", fontWeight: 600, py: 1.5 }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
