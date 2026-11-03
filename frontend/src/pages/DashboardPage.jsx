import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Paper,
  Divider,
  useTheme,
  Avatar,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuizIcon from "@mui/icons-material/Quiz";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CodeIcon from "@mui/icons-material/Code";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TerminalIcon from "@mui/icons-material/Terminal";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

// Embedded Feature Pages
import KnowledgeCheckPage from "./KnowledgeCheckPage";
import JDInterviewCopilotPage from "./JDInterviewCopilotPage";
import FrontendPracticePage from "./FrontendPracticePage";
import { renderPlatformIcon } from "../components/BrandIcons";
import StudentDocumentsPage from "./StudentDocumentsPage";
import DevSoftwaresPage from "./DevSoftwaresPage";

// Essential Career, Coding & Design Platforms Data
const PLATFORMS_DATA = [
  // Design & Animation
  {
    id: "aos",
    name: "AOS - Animate On Scroll",
    category: "Design & Animation",
    url: "https://michalsnik.github.io/aos/",
    tag: "CSS Scroll Animations",
    color: "#00C5E0",
  },
  {
    id: "lusion",
    name: "Lusion",
    category: "Design & Animation",
    url: "https://lusion.co/about",
    tag: "3D & Creative Web",
    color: "#6366F1",
  },
  {
    id: "overleaf",
    name: "Overleaf",
    category: "Design & Animation",
    url: "https://www.overleaf.com/",
    tag: "LaTeX Cloud Editor",
    color: "#10B981",
  },
  {
    id: "google-fonts",
    name: "Google Fonts",
    category: "Design & Animation",
    url: "https://fonts.google.com/",
    tag: "Typography & Web Fonts",
    color: "#EA4335",
  },
  {
    id: "react-icons",
    name: "React Icons",
    category: "Design & Animation",
    url: "https://react-icons.github.io/react-icons/",
    tag: "Popular SVG Icon Kits",
    color: "#E11D48",
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design & Animation",
    url: "https://www.figma.com/",
    tag: "UI/UX & Prototyping",
    color: "#A855F7",
  },
  {
    id: "unsplash",
    name: "Unsplash",
    category: "Design & Animation",
    url: "https://unsplash.com/",
    tag: "Free HD Visual Assets",
    color: "#64748B",
  },

  // Coding & Problem Solving
  {
    id: "leetcode",
    name: "LeetCode",
    category: "Coding & Challenges",
    url: "https://leetcode.com/",
    tag: "Algorithms & Interview Prep",
    color: "#F59E0B",
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    category: "Coding & Challenges",
    url: "https://www.hackerrank.com/",
    tag: "Skill Tests & Certification",
    color: "#059669",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Coding & Challenges",
    url: "https://github.com/",
    tag: "Repositories & Git Projects",
    color: "#334155",
  },
  {
    id: "codepen",
    name: "CodePen",
    category: "Coding & Challenges",
    url: "https://codepen.io/",
    tag: "HTML/CSS/JS Playground",
    color: "#1E293B",
  },
  {
    id: "stackblitz",
    name: "StackBlitz",
    category: "Coding & Challenges",
    url: "https://stackblitz.com/",
    tag: "Online IDE & WebContainers",
    color: "#0284C7",
  },

  // Career & Portals
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Career & Jobs",
    url: "https://www.linkedin.com/",
    tag: "Professional Networking",
    color: "#0A66C2",
  },
  {
    id: "indeed",
    name: "Indeed",
    category: "Career & Jobs",
    url: "https://www.indeed.com/",
    tag: "Job Search & Listings",
    color: "#2164F3",
  },
  {
    id: "wellfound",
    name: "Wellfound (AngelList)",
    category: "Career & Jobs",
    url: "https://wellfound.com/",
    tag: "Startup Engineering Jobs",
    color: "#DC2626",
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    category: "Career & Jobs",
    url: "https://www.glassdoor.com/",
    tag: "Salaries & Company Reviews",
    color: "#0CAA41",
  },
  {
    id: "resume-io",
    name: "Resume.io",
    category: "Career & Jobs",
    url: "https://resume.io/",
    tag: "Tech Resume Builder",
    color: "#4F46E5",
  },
];

export default function DashboardPage({
  user,
  colorMode,
  onToggleColorMode,
  onLogout,
  onNavigate,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Feature navigation state within Dashboard
  const [activeFeature, setActiveFeature] = useState("overview"); // 'overview' | 'exam' | 'jd-prep' | 'practice' | 'documents' | 'softwares' | 'platforms'
  const [examConfig, setExamConfig] = useState({});

  // Platforms section filters
  const [platformCategory, setPlatformCategory] = useState("ALL");
  const [platformSearch, setPlatformSearch] = useState("");

  const filteredPlatforms = useMemo(() => {
    return PLATFORMS_DATA.filter((p) => {
      const matchCat =
        platformCategory === "ALL" || p.category === platformCategory;
      const matchSearch =
        platformSearch.trim() === "" ||
        p.name.toLowerCase().includes(platformSearch.toLowerCase()) ||
        p.tag.toLowerCase().includes(platformSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(platformSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [platformCategory, platformSearch]);

  const handleStartExamFromHero = (config) => {
    setExamConfig(config || {});
    setActiveFeature("exam");
  };

  return (
    <Box sx={{ py: { xs: 2, md: 3.5 }, px: { xs: 2, sm: 3 } }}>
      <Container maxWidth="xl" disableGutters>
        {/* ========================================================================= */}
        {/* 1. TOP COMMAND BAR                                                        */}
        {/* ========================================================================= */}
        <Paper
          elevation={0}
          className="lusion-reveal zenith-bento-hero"
          sx={{
            p: { xs: 2.5, md: 3 },
            mb: 3,
            borderRadius: 4.5,
            border: "1px solid",
            borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)",
            bgcolor: isDark ? "rgba(14, 20, 36, 0.85)" : "#FFFFFF",
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 20px 50px -10px rgba(0, 0, 0, 0.7)"
              : "0 10px 36px -6px rgba(15, 23, 42, 0.06)",
          }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            {/* Left: Cockpit status tags */}
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  px: 1.5,
                  py: 0.45,
                  borderRadius: 9999,
                  background: isDark
                    ? "linear-gradient(90deg, rgba(79, 70, 229, 0.28) 0%, rgba(0, 197, 224, 0.15) 100%)"
                    : "linear-gradient(90deg, rgba(79, 70, 229, 0.12) 0%, rgba(0, 197, 224, 0.08) 100%)",
                  border: "1px solid",
                  borderColor: isDark ? "rgba(79, 70, 229, 0.4)" : "rgba(79, 70, 229, 0.25)",
                }}
              >
                <BoltIcon sx={{ fontSize: 16, color: "#00C5E0" }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: "primary.main", letterSpacing: "0.04em" }}>
                  ZENITH STUDIO COCKPIT
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  px: 1.4,
                  py: 0.45,
                  borderRadius: 9999,
                  bgcolor: isDark ? "rgba(16, 185, 129, 0.12)" : "rgba(16, 185, 129, 0.08)",
                  border: "1px solid",
                  borderColor: isDark ? "rgba(16, 185, 129, 0.3)" : "rgba(16, 185, 129, 0.2)",
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: "#10B981",
                    boxShadow: "0 0 8px #10B981",
                  }}
                  className="animate-pulse-green"
                />
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#10B981" }}>
                  All Features Online
                </Typography>
              </Box>
            </Stack>

            {/* Right: User Profile Capsule + Theme Toggle + Logout */}
            <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
              {onToggleColorMode && (
                <Tooltip title={isDark ? "Light Mode" : "Dark Mode"}>
                  <IconButton
                    size="small"
                    onClick={onToggleColorMode}
                    sx={{
                      p: 0.9,
                      borderRadius: "50%",
                      border: "1px solid",
                      borderColor: isDark ? "rgba(123, 164, 208, 0.2)" : "rgba(46, 94, 153, 0.15)",
                      bgcolor: isDark ? "rgba(123, 164, 208, 0.06)" : "rgba(255, 255, 255, 0.8)",
                      color: isDark ? "#FCD34D" : "#2E5E99",
                      "&:hover": {
                        bgcolor: isDark ? "rgba(123, 164, 208, 0.12)" : "rgba(46, 94, 153, 0.08)",
                      },
                    }}
                  >
                    {isDark ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              )}

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1.2,
                  px: 1.4,
                  py: 0.6,
                  borderRadius: 9999,
                  border: "1px solid",
                  borderColor: isDark ? "rgba(123, 164, 208, 0.18)" : "rgba(46, 94, 153, 0.14)",
                  bgcolor: isDark ? "rgba(19, 47, 82, 0.6)" : "rgba(255, 255, 255, 0.7)",
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: "0.82rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #2E5E99 0%, #7BA4D0 100%)",
                  }}
                >
                  {(user?.name || user?.username || "S")[0].toUpperCase()}
                </Avatar>
                <Typography variant="caption" sx={{ fontWeight: 800, display: "block" }}>
                  {user?.name || user?.username || "Student"}
                </Typography>
              </Box>

              {onLogout && (
                <Tooltip title="Sign Out">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onLogout}
                    startIcon={<LogoutIcon fontSize="small" />}
                    sx={{
                      borderRadius: 9999,
                      px: 1.4,
                      py: 0.5,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "error.main",
                      borderColor: isDark ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.25)",
                      "&:hover": {
                        borderColor: "error.main",
                        bgcolor: "rgba(239, 68, 68, 0.08)",
                      },
                    }}
                  >
                    Sign Out
                  </Button>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Paper>

        {/* ========================================================================= */}
        {/* 2. SEGMENTED FEATURE NAVIGATION DOCK (Dashboard Only)                      */}
        {/* ========================================================================= */}
        <Paper
          elevation={0}
          sx={{
            p: 0.8,
            mb: 3.5,
            borderRadius: 9999,
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
            bgcolor: isDark ? "rgba(14, 20, 36, 0.85)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            overflowX: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {[
            { id: "overview", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
            { id: "exam", label: "AI Exam", icon: <QuizIcon fontSize="small" /> },
            { id: "jd-prep", label: "JD Copilot", icon: <AutoAwesomeIcon fontSize="small" /> },
            { id: "practice", label: "Sandbox", icon: <CodeIcon fontSize="small" /> },
            { id: "documents", label: "Vault", icon: <DriveFolderUploadIcon fontSize="small" /> },
            { id: "softwares", label: "Dev Softwares", icon: <DownloadIcon fontSize="small" /> },
            { id: "platforms", label: "Career & Design", icon: <OpenInNewIcon fontSize="small" /> },
          ].map((tab) => (
            <Button
              key={tab.id}
              size="small"
              onClick={() => setActiveFeature(tab.id)}
              startIcon={tab.icon}
              variant={activeFeature === tab.id ? "contained" : "text"}
              sx={{
                borderRadius: 9999,
                px: 2,
                py: 0.75,
                fontWeight: 750,
                fontSize: "0.82rem",
                whiteSpace: "nowrap",
                ...(activeFeature === tab.id
                  ? {
                      bgcolor: "#2E5E99",
                      color: "#fff",
                      boxShadow: "0 4px 14px rgba(46, 94, 153, 0.35)",
                      "&:hover": { bgcolor: "#1D406E" },
                    }
                  : {
                      color: "text.secondary",
                      "&:hover": {
                        color: "text.primary",
                        bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.05)",
                      },
                    }),
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Paper>

        {/* ========================================================================= */}
        {/* 3. ACTIVE FEATURE VIEW (Rendered Right Here in Dashboard)                  */}
        {/* ========================================================================= */}

        {/* --- VIEW: AI EXAM --- */}
        {activeFeature === "exam" && (
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveFeature("overview")}
              sx={{ mb: 2.5, borderRadius: 9999, fontWeight: 700 }}
            >
              Back to Dashboard
            </Button>
            <KnowledgeCheckPage
              onNavigate={(dest) => setActiveFeature(dest === "dashboard" ? "overview" : dest)}
              initialConfig={examConfig}
            />
          </Box>
        )}

        {/* --- VIEW: JD COPILOT --- */}
        {activeFeature === "jd-prep" && (
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveFeature("overview")}
              sx={{ mb: 2.5, borderRadius: 9999, fontWeight: 700 }}
            >
              Back to Dashboard
            </Button>
            <JDInterviewCopilotPage
              onNavigate={(dest) => setActiveFeature(dest === "dashboard" ? "overview" : dest)}
            />
          </Box>
        )}

        {/* --- VIEW: CODING SANDBOX --- */}
        {activeFeature === "practice" && (
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveFeature("overview")}
              sx={{ mb: 2.5, borderRadius: 9999, fontWeight: 700 }}
            >
              Back to Dashboard
            </Button>
            <FrontendPracticePage />
          </Box>
        )}

        {/* --- VIEW: DOCUMENTS VAULT --- */}
        {activeFeature === "documents" && (
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveFeature("overview")}
              sx={{ mb: 2.5, borderRadius: 9999, fontWeight: 700 }}
            >
              Back to Dashboard
            </Button>
            <StudentDocumentsPage
              user={user}
              onNavigate={(dest) => setActiveFeature(dest === "dashboard" ? "overview" : dest)}
            />
          </Box>
        )}

        {/* --- VIEW: DEV SOFTWARES --- */}
        {activeFeature === "softwares" && (
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => setActiveFeature("overview")}
              sx={{ mb: 2.5, borderRadius: 9999, fontWeight: 700 }}
            >
              Back to Dashboard
            </Button>
            <DevSoftwaresPage
              onNavigate={(dest) => setActiveFeature(dest === "dashboard" ? "overview" : dest)}
            />
          </Box>
        )}

        {/* --- VIEW: OVERVIEW OR PLATFORMS --- */}
        {(activeFeature === "overview" || activeFeature === "platforms") && (
          <Box>
            {/* Bento Grid Features (No Roadmap, No Dummy Paragraphs) */}
            {activeFeature === "overview" && (
              <Grid container spacing={2.5} sx={{ mb: 4.5 }}>
                {/* 1. AI Knowledge Exam */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Card
                    className="interactive-card lusion-reveal"
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: isDark ? "rgba(16, 185, 129, 0.25)" : "rgba(16, 185, 129, 0.18)",
                      bgcolor: isDark ? "#132F52" : "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 2.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                            color: "#fff",
                          }}
                        >
                          <QuizIcon fontSize="medium" />
                        </Box>
                        <Chip label="150+ Questions" size="small" color="success" variant="outlined" sx={{ fontWeight: 750 }} />
                      </Stack>
                      <Typography variant="h6" fontWeight={850} sx={{ mb: 2 }}>
                        AI Knowledge Exam
                      </Typography>
                      <Stack spacing={0.8} sx={{ mb: 3 }}>
                        {["Timed Diagnostic MCQs", "Instant Solution Breakdowns", "Topic Performance Scoring"].map((item, i) => (
                          <Stack key={i} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#10B981" }} />
                            <Typography variant="caption" fontWeight={700}>
                              {item}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={() => handleStartExamFromHero({})}
                        sx={{
                          mt: "auto",
                          py: 1,
                          fontWeight: 750,
                          borderRadius: 2.5,
                          bgcolor: "#2E5E99",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(46, 94, 153, 0.25)",
                          "&:hover": { bgcolor: "#1D406E" },
                        }}
                      >
                        Launch Exam
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* 2. AI JD Interview Copilot */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Card
                    className="interactive-card lusion-reveal"
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: isDark ? "rgba(0, 197, 224, 0.25)" : "rgba(0, 197, 224, 0.18)",
                      bgcolor: isDark ? "#132F52" : "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 2.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #00C5E0 0%, #0284C7 100%)",
                            color: "#fff",
                          }}
                        >
                          <AutoAwesomeIcon fontSize="medium" />
                        </Box>
                        <Chip label="AI Powered" size="small" color="info" variant="outlined" sx={{ fontWeight: 750 }} />
                      </Stack>
                      <Typography variant="h6" fontWeight={850} sx={{ mb: 2 }}>
                        AI JD Interview Copilot
                      </Typography>
                      <Stack spacing={0.8} sx={{ mb: 3 }}>
                        {["Job Description Analysis", "STAR Method Response Blueprint", "Technical Interview Prep"].map((item, i) => (
                          <Stack key={i} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#00C5E0" }} />
                            <Typography variant="caption" fontWeight={700}>
                              {item}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={() => setActiveFeature("jd-prep")}
                        sx={{
                          mt: "auto",
                          py: 1,
                          fontWeight: 750,
                          borderRadius: 2.5,
                          bgcolor: "#2E5E99",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(46, 94, 153, 0.25)",
                          "&:hover": { bgcolor: "#1D406E" },
                        }}
                      >
                        Open Copilot
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* 3. Frontend Coding Sandbox */}
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Card
                    className="interactive-card lusion-reveal"
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: isDark ? "rgba(245, 158, 11, 0.25)" : "rgba(245, 158, 11, 0.18)",
                      bgcolor: isDark ? "#132F52" : "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 2.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                            color: "#fff",
                          }}
                        >
                          <CodeIcon fontSize="medium" />
                        </Box>
                        <Chip label="Live Preview" size="small" color="warning" variant="outlined" sx={{ fontWeight: 750 }} />
                      </Stack>
                      <Typography variant="h6" fontWeight={850} sx={{ mb: 2 }}>
                        Frontend Sandbox
                      </Typography>
                      <Stack spacing={0.8} sx={{ mb: 3 }}>
                        {["HTML5, CSS & JS Live Runner", "Real-Time Split-Pane Render", "Challenge Templates Included"].map((item, i) => (
                          <Stack key={i} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#F59E0B" }} />
                            <Typography variant="caption" fontWeight={700}>
                              {item}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={() => setActiveFeature("practice")}
                        sx={{
                          mt: "auto",
                          py: 1,
                          fontWeight: 750,
                          borderRadius: 2.5,
                          bgcolor: "#2E5E99",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(46, 94, 153, 0.25)",
                          "&:hover": { bgcolor: "#1D406E" },
                        }}
                      >
                        Open Sandbox
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* 4. Study Documents Vault */}
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Card
                    className="interactive-card lusion-reveal"
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: isDark ? "rgba(139, 92, 246, 0.25)" : "rgba(139, 92, 246, 0.18)",
                      bgcolor: isDark ? "#132F52" : "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 2.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                            color: "#fff",
                          }}
                        >
                          <DriveFolderUploadIcon fontSize="medium" />
                        </Box>
                        <Chip label="Cloud Vault" size="small" variant="outlined" sx={{ fontWeight: 750, color: "#8B5CF6", borderColor: "#8B5CF6" }} />
                      </Stack>
                      <Typography variant="h6" fontWeight={850} sx={{ mb: 2 }}>
                        Study Documents Vault
                      </Typography>
                      <Stack spacing={0.8} sx={{ mb: 3 }}>
                        {["Upload PDFs & Study Guides", "In-Browser Resource Viewer", "Quick Download Access"].map((item, i) => (
                          <Stack key={i} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#8B5CF6" }} />
                            <Typography variant="caption" fontWeight={700}>
                              {item}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={() => setActiveFeature("documents")}
                        sx={{
                          mt: "auto",
                          py: 1,
                          fontWeight: 750,
                          borderRadius: 2.5,
                          bgcolor: "#2E5E99",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(46, 94, 153, 0.25)",
                          "&:hover": { bgcolor: "#1D406E" },
                        }}
                      >
                        Open Vault
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* 5. Dev Softwares Hub */}
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Card
                    className="interactive-card lusion-reveal"
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: isDark ? "rgba(244, 63, 94, 0.25)" : "rgba(244, 63, 94, 0.18)",
                      bgcolor: isDark ? "#132F52" : "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Box
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: 2.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)",
                            color: "#fff",
                          }}
                        >
                          <DownloadIcon fontSize="medium" />
                        </Box>
                        <Chip label="CLI & Binaries" size="small" variant="outlined" sx={{ fontWeight: 750, color: "#F43F5E", borderColor: "#F43F5E" }} />
                      </Stack>
                      <Typography variant="h6" fontWeight={850} sx={{ mb: 2 }}>
                        Dev Softwares Hub
                      </Typography>
                      <Stack spacing={0.8} sx={{ mb: 3 }}>
                        {["VS Code, Node.js, Git & Docker", "One-Click Direct Downloads", "Winget & NPM Copy Commands"].map((item, i) => (
                          <Stack key={i} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <CheckCircleOutlinedIcon sx={{ fontSize: 16, color: "#F43F5E" }} />
                            <Typography variant="caption" fontWeight={700}>
                              {item}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={() => setActiveFeature("softwares")}
                        sx={{
                          mt: "auto",
                          py: 1,
                          fontWeight: 750,
                          borderRadius: 2.5,
                          bgcolor: "#2E5E99",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(46, 94, 153, 0.25)",
                          "&:hover": { bgcolor: "#1D406E" },
                        }}
                      >
                        Browse Softwares
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {/* ========================================================================= */}
            {/* 4. ESSENTIAL CAREER, CODING & DESIGN PLATFORMS (Dedicated Section)        */}
            {/* ========================================================================= */}
            <Paper
              id="platforms-section"
              elevation={0}
              className="lusion-reveal"
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRadius: 4.5,
                border: "1px solid",
                borderColor: isDark ? "rgba(123, 164, 208, 0.18)" : "rgba(46, 94, 153, 0.14)",
                bgcolor: isDark ? "#132F52" : "#FFFFFF",
              }}
            >
              {/* Section Header */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  mb: 2.5,
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight={850} sx={{ letterSpacing: "-0.025em" }}>
                    Essential Career, Coding & Design Platforms
                  </Typography>
                </Box>

                {/* Instant Search Filter */}
                <TextField
                  size="small"
                  placeholder="Search platform..."
                  value={platformSearch}
                  onChange={(e) => setPlatformSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: { xs: "100%", sm: 260 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 9999,
                      bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#F8FAFC",
                    },
                  }}
                />
              </Stack>

              {/* Category Filter Pills */}
              <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}>
                {[
                  { id: "ALL", label: `All (${PLATFORMS_DATA.length})` },
                  { id: "Career & Jobs", label: "Career & Jobs (5)" },
                  { id: "Coding & Challenges", label: "Coding & Challenges (5)" },
                  { id: "Design & Animation", label: "Design & Animation (7)" },
                ].map((cat) => (
                  <Chip
                    key={cat.id}
                    label={cat.label}
                    onClick={() => setPlatformCategory(cat.id)}
                    variant={platformCategory === cat.id ? "filled" : "outlined"}
                    color={platformCategory === cat.id ? "primary" : "default"}
                    sx={{
                      fontWeight: 750,
                      borderRadius: 9999,
                      cursor: "pointer",
                      px: 0.5,
                    }}
                  />
                ))}
              </Stack>

              {/* Platform Cards Grid */}
              <Grid container spacing={2}>
                {filteredPlatforms.map((platform) => (
                  <Grid key={platform.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: isDark ? "rgba(123, 164, 208, 0.18)" : "rgba(46, 94, 153, 0.14)",
                        bgcolor: isDark ? "rgba(13, 36, 64, 0.7)" : "#F4F7FB",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: platform.color,
                          transform: "translateY(-2px)",
                          boxShadow: `0 8px 20px ${platform.color}20`,
                        },
                      }}
                    >
                      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: `${platform.color}14`,
                            border: `1px solid ${platform.color}40`,
                            flexShrink: 0,
                          }}
                        >
                          {renderPlatformIcon(platform.id, 22, platform.color)}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="subtitle2" fontWeight={800} noWrap>
                            {platform.name}
                          </Typography>
                          <Chip
                            label={platform.tag}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(46, 94, 153, 0.08)",
                            }}
                          />
                        </Box>
                      </Stack>

                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
                        sx={{
                          mt: "auto",
                          borderRadius: 2,
                          py: 0.7,
                          fontSize: "0.78rem",
                          fontWeight: 750,
                          borderColor: "#2E5E99",
                          color: "#2E5E99",
                          "&:hover": {
                            borderColor: "#1D406E",
                            color: "#1D406E",
                            bgcolor: "rgba(46, 94, 153, 0.08)",
                          },
                        }}
                      >
                        Open Platform
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        )}
      </Container>
    </Box>
  );
}
