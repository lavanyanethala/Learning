import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  Paper,
  Divider,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  IconButton,
  Tooltip,
  Alert,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import StarsIcon from "@mui/icons-material/Stars";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import CodeIcon from "@mui/icons-material/Code";

import { aiService } from "../services/aiService";

// Technology catalog with default topics and themes
const TECH_OPTIONS = [
  {
    id: "React",
    label: "React",
    icon: "⚛️",
    color: "#06b6d4",
    topics: ["All Topics", "Hooks & Lifecycle", "State Management & Batching", "Virtual DOM & Reconciliation", "Memoization & Performance", "Custom Hooks"],
  },
  {
    id: "JavaScript",
    label: "JavaScript (ES6+)",
    icon: "🟨",
    color: "#f59e0b",
    topics: ["All Topics", "Event Loop & Asynchronous", "Closures & Scoping", "this & Prototypes", "Array Methods & Objects", "Promises & async/await"],
  },
  {
    id: "HTML & CSS",
    label: "HTML5 & CSS3",
    icon: "🎨",
    color: "#3b82f6",
    topics: ["All Topics", "CSS Box Model", "Flexbox Layout", "CSS Grid", "Specificity & Cascade", "Semantic HTML & Accessibility"],
  },
  {
    id: "TypeScript",
    label: "TypeScript",
    icon: "🔷",
    color: "#2563eb",
    topics: ["All Topics", "Type vs Interface", "Generics", "Union & Intersection Types", "Utility Types", "Narrowing & Guards"],
  },
  {
    id: "Node.js",
    label: "Node.js",
    icon: "🟢",
    color: "#10b981",
    topics: ["All Topics", "Event Loop & Libuv", "Modules & CommonJS/ESM", "Streams & Buffers", "File System & Path", "Process & Clusters"],
  },
  {
    id: "Express.js",
    label: "Express.js",
    icon: "⚡",
    color: "#64748b",
    topics: ["All Topics", "Middleware Architecture", "Routing & Params", "Error Handling (4-params)", "CORS & Security", "REST API Design"],
  },
  {
    id: "MongoDB",
    label: "MongoDB",
    icon: "🍃",
    color: "#16a34a",
    topics: ["All Topics", "Document Schema & Limits", "Aggregation Pipeline", "Indexing (B-Tree)", "Mongoose Schemas", "Embedding vs Referencing"],
  },
  {
    id: "SQL & PostgreSQL",
    label: "SQL & Relational",
    icon: "🐘",
    color: "#0284c7",
    topics: ["All Topics", "Joins (Inner/Left/Right)", "Indexing & Query Plans", "Transactions & ACID", "Normalization", "Grouping & Having"],
  },
  {
    id: "Git & GitHub",
    label: "Git & Version Control",
    icon: "🐙",
    color: "#ea580c",
    topics: ["All Topics", "Branching & Merging", "Rebase vs Merge", "Stashing & Cherry-pick", "HEAD & Reset vs Revert", "Merge Conflicts"],
  },
  {
    id: "System Design",
    label: "System Design",
    icon: "🏛️",
    color: "#8b5cf6",
    topics: ["All Topics", "Caching & Redis/CDN", "Load Balancing", "Horizontal vs Vertical Scaling", "Database Sharding", "CAP Theorem"],
  },
];

export default function KnowledgeCheckPage({ onNavigate, initialConfig = {} }) {
  // App view states: 'config' | 'loading' | 'quiz' | 'report'
  const [viewState, setViewState] = useState("config");

  // Config parameters
  const [selectedTech, setSelectedTech] = useState(() => initialConfig.technology || "React");
  const [selectedTopic, setSelectedTopic] = useState(() => initialConfig.topic || "All Topics");
  const [customTopic, setCustomTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [questionCount, setQuestionCount] = useState(5);
  const [mode, setMode] = useState("instant"); // 'instant' (learn as you go) | 'exam' (diagnostic summary at end)

  // Quiz state
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: 'A' | 'B' ... }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionId]: boolean }
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [reviewFilter, setReviewFilter] = useState("all"); // 'all' | 'missed' | 'flagged'

  // Timer effect for quiz state
  useEffect(() => {
    let timer;
    if (viewState === "quiz") {
      timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [viewState]);

  // Handle pre-filled initial config from props (e.g. if student came from Roadmap)
  useEffect(() => {
    if (initialConfig.technology) {
      const techLower = initialConfig.technology.toLowerCase();
      const matched = TECH_OPTIONS.find(
        (t) => t.id.toLowerCase() === techLower || t.label.toLowerCase().includes(techLower)
      );
      if (matched) {
        setSelectedTech(matched.id);
      } else {
        setSelectedTech(initialConfig.technology);
      }
    }
    if (initialConfig.topic) {
      setSelectedTopic(initialConfig.topic);
      setCustomTopic(initialConfig.topic);
    }
  }, [initialConfig]);

  const activeTechObj = useMemo(() => {
    return TECH_OPTIONS.find((t) => t.id === selectedTech) || TECH_OPTIONS[0];
  }, [selectedTech]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Launch AI Knowledge Check
  const handleStartCheck = async () => {
    setErrorMsg("");
    setViewState("loading");
    setElapsedSeconds(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentIndex(0);

    const topicToUse = customTopic.trim() ? customTopic.trim() : selectedTopic;

    try {
      const result = await aiService.generateMCQKnowledgeCheck({
        technology: selectedTech,
        topic: topicToUse,
        difficulty,
        questionCount,
      });

      if (!result || !result.questions || result.questions.length === 0) {
        throw new Error("Unable to generate questions. Please try again.");
      }

      setQuizData(result);
      setViewState("quiz");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to generate knowledge check questions.");
      setViewState("config");
    }
  };

  // Handle user picking an answer option
  const handleSelectOption = (questionId, key) => {
    // In Instant Mode: Once answered, allow changing only before moving on, or lock
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: key,
    }));
  };

  const handleToggleFlag = (questionId) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleFinishQuiz = () => {
    setViewState("report");
  };

  // Diagnostic Report Computations
  const reportStats = useMemo(() => {
    if (!quizData || !quizData.questions) return null;

    let correctCount = 0;
    const missedList = [];
    const strengthsList = [];

    quizData.questions.forEach((q) => {
      const studentAns = userAnswers[q.id];
      const isCorrect = studentAns === q.correctKey;
      if (isCorrect) {
        correctCount++;
        strengthsList.push(q.subtopic || q.question.slice(0, 40));
      } else {
        missedList.push(q);
      }
    });

    const total = quizData.questions.length;
    const pct = Math.round((correctCount / total) * 100);

    let readinessBadge = {
      title: "Concept Master! 🏆",
      sub: "Outstanding comprehension across core mechanics and edge cases.",
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.15)",
    };
    if (pct < 60) {
      readinessBadge = {
        title: "Active Learning in Progress 🌱",
        sub: "Great diagnostic discovery! Several valuable mental models revealed below to level up.",
        color: "#f59e0b",
        bg: "rgba(245, 158, 11, 0.15)",
      };
    } else if (pct < 85) {
      readinessBadge = {
        title: "Solid Foundation with Minor Gaps ⚡",
        sub: "You understand the key principles well. Polishing the few nuances below will make you interview-ready.",
        color: "#2E5E99",
        bg: "rgba(46, 94, 153, 0.15)",
      };
    }

    return {
      total,
      correctCount,
      pct,
      missedList,
      strengthsList: Array.from(new Set(strengthsList)),
      readinessBadge,
    };
  }, [quizData, userAnswers]);

  // Current active question
  const currentQ = quizData?.questions?.[currentIndex];
  const isCurrentAnswered = currentQ ? Boolean(userAnswers[currentQ.id]) : false;
  const currentSelectedKey = currentQ ? userAnswers[currentQ.id] : null;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* ========================================================================= */}
      {/* STATE 1: SETUP & CONFIGURATION                                            */}
      {/* ========================================================================= */}
      {viewState === "config" && (
        <Box className="animate-fade-in-up">
          {/* Header Banner */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4.5 },
              mb: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.22) 0%, rgba(15, 23, 42, 0.95) 90%)"
                  : "radial-gradient(circle at 10% 20%, rgba(238, 242, 255, 0.95) 0%, #ffffff 90%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
              <Chip
                label="Self-Knowledge Diagnostic"
                color="primary"
                size="small"
                icon={<AutoAwesomeIcon />}
                sx={{ fontWeight: 800, fontSize: "0.75rem" }}
              />
              <Chip
                label="No Stress • Learning Companion"
                size="small"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                }}
              />
            </Stack>

            <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: "-0.02em", mb: 1 }}>
              AI Self-Knowledge Checker & Practice Exam
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 850, lineHeight: 1.6 }}>
              Select any technology and topic. AI automatically generates targeted Multiple Choice Questions (MCQs)
              with deep educational rationales for active recall, uncovering mental blind spots and solidifying your engineering foundation.
            </Typography>
          </Paper>

          {errorMsg && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
              {errorMsg}
            </Alert>
          )}

          <Grid container spacing={3.5}>
            {/* Step 1: Technology Selection */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Card
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: 3.5,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="subtitle2" fontWeight={800} color="text.secondary" sx={{ letterSpacing: 0.5, mb: 1.5 }}>
                  STEP 1: SELECT TECHNOLOGY TO ASSESS
                </Typography>

                <Grid container spacing={1.5} sx={{ mb: 3 }}>
                  {TECH_OPTIONS.map((t) => {
                    const isSelected = selectedTech === t.id;
                    return (
                      <Grid key={t.id} size={{ xs: 6, sm: 4, md: 4 }}>
                        <Paper
                          elevation={0}
                          onClick={() => {
                            setSelectedTech(t.id);
                            setSelectedTopic(t.topics[0]);
                          }}
                          sx={{
                            p: 1.8,
                            borderRadius: 2.8,
                            cursor: "pointer",
                            border: "1.5px solid",
                            borderColor: isSelected ? t.color : "divider",
                            bgcolor: isSelected
                              ? (theme) =>
                                  theme.palette.mode === "dark"
                                    ? "rgba(99, 102, 241, 0.15)"
                                    : "rgba(99, 102, 241, 0.08)"
                              : "transparent",
                            transition: "all 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            "&:hover": {
                              borderColor: t.color,
                              transform: "translateY(-1px)",
                            },
                          }}
                        >
                          <Typography variant="h6">{t.icon}</Typography>
                          <Typography variant="body2" fontWeight={isSelected ? 800 : 600} noWrap>
                            {t.label}
                          </Typography>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Step 2: Topic Selection */}
                <Typography variant="subtitle2" fontWeight={800} color="text.secondary" sx={{ letterSpacing: 0.5, mb: 1.5 }}>
                  STEP 2: FOCUS TOPIC ({activeTechObj.label})
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
                  {activeTechObj.topics.map((top) => {
                    const isSelected = selectedTopic === top && !customTopic;
                    return (
                      <Chip
                        key={top}
                        label={top}
                        onClick={() => {
                          setSelectedTopic(top);
                          setCustomTopic("");
                        }}
                        color={isSelected ? "primary" : "default"}
                        variant={isSelected ? "filled" : "outlined"}
                        sx={{
                          fontWeight: isSelected ? 800 : 600,
                          fontSize: "0.82rem",
                          py: 2,
                          px: 1,
                          borderRadius: 2.5,
                        }}
                      />
                    );
                  })}
                </Stack>

                <TextField
                  fullWidth
                  size="small"
                  label="Or Enter a Specific Custom Topic (Optional)"
                  placeholder="e.g. Redux Toolkit, useReducer, Flexbox gap, Express Rate Limiting"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  slotProps={{
                    input: { sx: { borderRadius: 2.5 } },
                  }}
                />
              </Card>
            </Grid>

            {/* Step 3: Difficulty, Question Count & Learning Mode */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <Card
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: 3.5,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Box>
                  {/* Difficulty */}
                  <Typography variant="subtitle2" fontWeight={800} color="text.secondary" sx={{ letterSpacing: 0.5, mb: 1.5 }}>
                    STEP 3: DIFFICULTY LEVEL
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    {[
                      { id: "Beginner", label: "Foundational 🌱" },
                      { id: "Intermediate", label: "Industry Ready ⚡" },
                      { id: "Advanced", label: "Senior Edge Cases 🔥" },
                    ].map((d) => (
                      <Button
                        key={d.id}
                        fullWidth
                        variant={difficulty === d.id ? "contained" : "outlined"}
                        color={difficulty === d.id ? "primary" : "inherit"}
                        onClick={() => setDifficulty(d.id)}
                        sx={{
                          borderRadius: 2.5,
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          py: 1,
                          textTransform: "none",
                        }}
                      >
                        {d.label}
                      </Button>
                    ))}
                  </Stack>

                  {/* Question Count */}
                  <Typography variant="subtitle2" fontWeight={800} color="text.secondary" sx={{ letterSpacing: 0.5, mb: 1.5 }}>
                    STEP 4: NUMBER OF QUESTIONS
                  </Typography>

                  <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
                    {[
                      { count: 5, label: "5 MCQs (5 mins)" },
                      { count: 10, label: "10 MCQs (Standard)" },
                      { count: 15, label: "15 MCQs (Deep Dive)" },
                    ].map((c) => (
                      <Button
                        key={c.count}
                        fullWidth
                        variant={questionCount === c.count ? "contained" : "outlined"}
                        color={questionCount === c.count ? "secondary" : "inherit"}
                        onClick={() => setQuestionCount(c.count)}
                        sx={{
                          borderRadius: 2.5,
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          py: 1,
                          textTransform: "none",
                        }}
                      >
                        {c.label}
                      </Button>
                    ))}
                  </Stack>

                  {/* Learning Mode */}
                  <Typography variant="subtitle2" fontWeight={800} color="text.secondary" sx={{ letterSpacing: 0.5, mb: 1.5 }}>
                    STEP 5: CHOOSE LEARNING MODE
                  </Typography>

                  <Paper
                    elevation={0}
                    onClick={() => setMode("instant")}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      borderRadius: 2.8,
                      cursor: "pointer",
                      border: "1.5px solid",
                      borderColor: mode === "instant" ? "primary.main" : "divider",
                      bgcolor: mode === "instant" ? "action.hover" : "transparent",
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Radio checked={mode === "instant"} color="primary" />
                      <Box>
                        <Typography variant="body2" fontWeight={800}>
                          Instant Feedback Mode (Practice & Learn)
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          See full explanation & senior pro-tips immediately after answering each question.
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  <Paper
                    elevation={0}
                    onClick={() => setMode("exam")}
                    sx={{
                      p: 2,
                      mb: 3,
                      borderRadius: 2.8,
                      cursor: "pointer",
                      border: "1.5px solid",
                      borderColor: mode === "exam" ? "primary.main" : "divider",
                      bgcolor: mode === "exam" ? "action.hover" : "transparent",
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Radio checked={mode === "exam"} color="primary" />
                      <Box>
                        <Typography variant="body2" fontWeight={800}>
                          Exam Simulation Mode (Diagnostic at End)
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Answer continuously like a mock test, then review your full diagnostic report.
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Box>

                {/* Big Start Button */}
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<AutoAwesomeIcon />}
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleStartCheck}
                  sx={{
                    fontWeight: 900,
                    fontSize: "1rem",
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: "#2E5E99",
                    boxShadow: "0 6px 18px rgba(46, 94, 153, 0.35)",
                    "&:hover": { bgcolor: "#1D406E" },
                  }}
                >
                  Start Self-Knowledge Check 🚀
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* ========================================================================= */}
      {/* STATE 2: LOADING / AI GENERATION                                          */}
      {/* ========================================================================= */}
      {viewState === "loading" && (
        <Box sx={{ textAlign: "center", py: 12 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 10px 30px rgba(79, 70, 229, 0.4)",
              color: "#fff",
            }}
            className="animate-pulse-green"
          >
            <AutoAwesomeIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" fontWeight={900} gutterBottom>
            Curating Knowledge Check for {selectedTech}...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mx: "auto", mb: 3 }}>
            Synthesizing conceptual questions, realistic code scenarios, and senior engineer rationales.
          </Typography>
          <CircularProgress size={36} color="primary" />
        </Box>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: ACTIVE QUIZ / EXAM TAKING                                        */}
      {/* ========================================================================= */}
      {viewState === "quiz" && currentQ && (
        <Box sx={{ maxWidth: 960, mx: "auto" }}>
          {/* Top Progress & Utility Bar */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              px: 3,
              mb: 3,
              borderRadius: 3.5,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Chip
                label={`${selectedTech} • ${quizData.topic}`}
                size="small"
                color="primary"
                sx={{ fontWeight: 800 }}
              />
              <Chip
                label={`Question ${currentIndex + 1} of ${quizData.questions.length}`}
                size="small"
                sx={{ fontWeight: 700 }}
              />
              <Chip
                label={mode === "instant" ? "Instant Mode" : "Exam Mode"}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.72rem" }}
              />
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Stack direction="row" spacing={0.6} alignItems="center">
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="body2" fontFamily='"JetBrains Mono", monospace' fontWeight={700}>
                  {formatTime(elapsedSeconds)}
                </Typography>
              </Stack>

              <Tooltip title={flaggedQuestions[currentQ.id] ? "Remove bookmark" : "Flag for review"}>
                <IconButton
                  size="small"
                  onClick={() => handleToggleFlag(currentQ.id)}
                  color={flaggedQuestions[currentQ.id] ? "warning" : "default"}
                >
                  {flaggedQuestions[currentQ.id] ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              </Tooltip>

              <Button
                size="small"
                variant="outlined"
                color="inherit"
                onClick={() => {
                  if (window.confirm("Leave this assessment and return to configuration?")) {
                    setViewState("config");
                  }
                }}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Quit Check
              </Button>
            </Stack>
          </Paper>

          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={((currentIndex + 1) / quizData.questions.length) * 100}
            sx={{ height: 6, borderRadius: 3, mb: 3 }}
          />

          {/* Question Card */}
          <Card
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              mb: 3,
            }}
          >
            {/* Subtopic Tag */}
            {currentQ.subtopic && (
              <Chip
                label={currentQ.subtopic}
                size="small"
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.08)",
                  color: "primary.main",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  mb: 1.5,
                }}
              />
            )}

            {/* Question Text */}
            <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.4, mb: 2.5 }}>
              {currentQ.question}
            </Typography>

            {/* Code Snippet Box (if any) */}
            {currentQ.codeSnippet && (
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 2.5,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(15, 23, 42, 0.05)",
                  border: "1px solid",
                  borderColor: "divider",
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: "0.86rem",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                <code>{currentQ.codeSnippet}</code>
              </Paper>
            )}

            {/* Option Cards */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              {currentQ.options.map((opt) => {
                const isSelected = currentSelectedKey === opt.key;
                const isCorrect = opt.key === currentQ.correctKey;
                const showInstantResult = mode === "instant" && isCurrentAnswered;

                let borderStyle = "1px solid";
                let borderColor = "divider";
                let bgStyle = "transparent";

                if (showInstantResult) {
                  if (isCorrect) {
                    borderColor = "#10b981";
                    bgStyle = "rgba(16, 185, 129, 0.08)";
                  } else if (isSelected) {
                    borderColor = "#ef4444";
                    bgStyle = "rgba(239, 68, 68, 0.08)";
                  }
                } else if (isSelected) {
                  borderColor = "#2E5E99";
                  bgStyle = (theme) =>
                    theme.palette.mode === "dark" ? "rgba(46, 94, 153, 0.22)" : "rgba(46, 94, 153, 0.08)";
                }

                return (
                  <Paper
                    key={opt.key}
                    elevation={0}
                    onClick={() => handleSelectOption(currentQ.id, opt.key)}
                    sx={{
                      p: 2,
                      px: 2.5,
                      borderRadius: 3,
                      cursor: "pointer",
                      border: borderStyle,
                      borderColor: borderColor,
                      bgcolor: bgStyle,
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      "&:hover": {
                        borderColor: showInstantResult ? borderColor : "primary.main",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1.8} alignItems="center">
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 2,
                          bgcolor: isSelected
                            ? "primary.main"
                            : (theme) =>
                                theme.palette.mode === "dark"
                                  ? "rgba(255,255,255,0.06)"
                                  : "rgba(0,0,0,0.05)",
                          color: isSelected ? "#fff" : "text.secondary",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          flexShrink: 0,
                        }}
                      >
                        {opt.key}
                      </Box>
                      <Typography variant="body2" fontWeight={isSelected ? 800 : 500}>
                        {opt.text}
                      </Typography>
                    </Stack>

                    {showInstantResult && isCorrect && (
                      <CheckCircleIcon sx={{ color: "#10b981", flexShrink: 0 }} />
                    )}
                    {showInstantResult && isSelected && !isCorrect && (
                      <CancelIcon sx={{ color: "#ef4444", flexShrink: 0 }} />
                    )}
                  </Paper>
                );
              })}
            </Stack>

            {/* Instant Mode Educational Breakdown */}
            {mode === "instant" && isCurrentAnswered && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: currentSelectedKey === currentQ.correctKey ? "#10b981" : "divider",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "rgba(15, 23, 42, 0.6)" : "rgba(248, 250, 252, 0.9)",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  {currentSelectedKey === currentQ.correctKey ? (
                    <Chip label="Correct Answer 🎯" color="success" size="small" sx={{ fontWeight: 800 }} />
                  ) : (
                    <Chip label="Learning Opportunity 💡" color="warning" size="small" sx={{ fontWeight: 800 }} />
                  )}
                  <Typography variant="subtitle2" fontWeight={800}>
                    Concept Deep-Dive Breakdown
                  </Typography>
                </Stack>

                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="caption" fontWeight={800} color="success.main" display="block">
                      WHY OPTION {currentQ.correctKey} IS CORRECT:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3, lineHeight: 1.5 }}>
                      {currentQ.explanation?.whyCorrect}
                    </Typography>
                  </Box>

                  {currentQ.explanation?.whyIncorrect && (
                    <Box>
                      <Typography variant="caption" fontWeight={800} color="error.main" display="block">
                        COMMON MISCONCEPTION / TRAP IN OTHER OPTIONS:
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3, lineHeight: 1.5 }}>
                        {currentQ.explanation?.whyIncorrect}
                      </Typography>
                    </Box>
                  )}

                  {currentQ.explanation?.proTip && (
                    <Box sx={{ pt: 1, borderTop: "1px dashed", borderColor: "divider" }}>
                      <Typography variant="caption" fontWeight={800} color="primary.main" display="block">
                        💡 SENIOR ENGINEER PRO-TIP:
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3, lineHeight: 1.5 }}>
                        {currentQ.explanation?.proTip}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Paper>
            )}
          </Card>

          {/* Navigation Controls */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              sx={{ fontWeight: 700, borderRadius: 2.5 }}
            >
              Previous
            </Button>

            <Stack direction="row" spacing={0.8} sx={{ overflowX: "auto", px: 1 }}>
              {quizData.questions.map((q, idx) => {
                const isAns = Boolean(userAnswers[q.id]);
                const isFlag = Boolean(flaggedQuestions[q.id]);
                const isCurr = idx === currentIndex;
                return (
                  <Box
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: 1.5,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      bgcolor: isCurr
                        ? "primary.main"
                        : isAns
                        ? "action.selected"
                        : "transparent",
                      color: isCurr ? "#fff" : "text.secondary",
                      border: "1px solid",
                      borderColor: isFlag ? "warning.main" : isCurr ? "primary.main" : "divider",
                    }}
                  >
                    {idx + 1}
                  </Box>
                );
              })}
            </Stack>

            {currentIndex < quizData.questions.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                sx={{ fontWeight: 800, borderRadius: 2.5, px: 3 }}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={handleFinishQuiz}
                sx={{ fontWeight: 800, borderRadius: 2.5, px: 3 }}
              >
                Finish & View Diagnostic
              </Button>
            )}
          </Box>
        </Box>
      )}

      {/* ========================================================================= */}
      {/* STATE 4: POST-EXAM DIAGNOSTIC KNOWLEDGE REPORT                            */}
      {/* ========================================================================= */}
      {viewState === "report" && reportStats && (
        <Box sx={{ maxWidth: 960, mx: "auto" }} className="animate-fade-in-up">
          {/* Header Summary Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4.5 },
              mb: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.2) 0%, rgba(15, 23, 42, 0.95) 90%)"
                  : "radial-gradient(circle at 10% 20%, rgba(238, 242, 255, 0.95) 0%, #ffffff 90%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Chip
                label={reportStats.readinessBadge.title}
                size="small"
                sx={{
                  bgcolor: reportStats.readinessBadge.bg,
                  color: reportStats.readinessBadge.color,
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  border: `1px solid ${reportStats.readinessBadge.color}`,
                }}
              />
              <Chip
                label={`Time: ${formatTime(elapsedSeconds)}`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
              <Chip
                label={`${selectedTech} • ${difficulty}`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
            </Stack>

            <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: "-0.02em", mb: 1 }}>
              Self-Knowledge Diagnostic Report
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
              {reportStats.readinessBadge.sub}
            </Typography>

            {/* Score Metric Cards */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: "1px solid", borderColor: "divider", textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    CORRECT ANSWERS
                  </Typography>
                  <Typography variant="h4" fontWeight={900} color="primary.main">
                    {reportStats.correctCount} / {reportStats.total}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: "1px solid", borderColor: "divider", textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    READINESS SCORE
                  </Typography>
                  <Typography variant="h4" fontWeight={900} sx={{ color: reportStats.readinessBadge.color }}>
                    {reportStats.pct}%
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: "1px solid", borderColor: "divider", textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    CONCEPTS MASTERED
                  </Typography>
                  <Typography variant="h4" fontWeight={900} color="success.main">
                    {reportStats.strengthsList.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: "1px solid", borderColor: "divider", textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    CONCEPTS TO REVISIT
                  </Typography>
                  <Typography variant="h4" fontWeight={900} color="error.main">
                    {reportStats.missedList.length}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* Supportive Disclaimer Banner */}
          <Alert severity="info" sx={{ mb: 4, borderRadius: 3 }}>
            <strong>💡 Remember:</strong> This check is designed as a learning companion to guide your study focus,
            never as an official exam or barrier. Every missed question is a valuable stepping stone toward mastery!
          </Alert>

          {/* Strengths & Focus Areas Dual Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Strengths */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={0} sx={{ p: 3, borderRadius: 3.5, border: "1px solid", borderColor: "divider", height: "100%" }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <CheckCircleIcon sx={{ color: "#10b981" }} />
                  <Typography variant="subtitle1" fontWeight={800}>
                    Key Concepts Solidly Grasped
                  </Typography>
                </Stack>
                {reportStats.strengthsList.length > 0 ? (
                  <Stack spacing={1}>
                    {reportStats.strengthsList.map((s, idx) => (
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#10b981" }} />
                        <Typography variant="body2" fontWeight={600}>
                          {s}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    Review the questions below to build your core fundamentals.
                  </Typography>
                )}
              </Card>
            </Grid>

            {/* Areas to Revisit */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={0} sx={{ p: 3, borderRadius: 3.5, border: "1px solid", borderColor: "divider", height: "100%" }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <LightbulbIcon sx={{ color: "#f59e0b" }} />
                  <Typography variant="subtitle1" fontWeight={800}>
                    High-Yield Concepts to Polish
                  </Typography>
                </Stack>
                {reportStats.missedList.length > 0 ? (
                  <Stack spacing={1}>
                    {reportStats.missedList.map((m, idx) => (
                      <Stack key={idx} direction="row" spacing={1} alignItems="center">
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#f59e0b" }} />
                        <Typography variant="body2" fontWeight={600}>
                          {m.subtopic || m.question.slice(0, 45)}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                ) : (
                  <Typography variant="body2" color="success.main" fontWeight={700}>
                    🎉 Perfect score! No concept gaps detected in this check.
                  </Typography>
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Action CTAs */}
          <Stack direction="row" spacing={2} sx={{ mb: 5 }} flexWrap="wrap">
            <Button
              variant="contained"
              color="primary"
              startIcon={<RestartAltIcon />}
              onClick={handleStartCheck}
              sx={{ fontWeight: 800, borderRadius: 2.5, px: 3 }}
            >
              Retake This Topic Check
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setViewState("config")}
              sx={{ fontWeight: 700, borderRadius: 2.5, px: 2.5 }}
            >
              Test Another Tech / Topic
            </Button>
            <Button
              variant="text"
              color="primary"
              startIcon={<AltRouteIcon />}
              onClick={() => onNavigate("roadmap")}
              sx={{ fontWeight: 700 }}
            >
              Continue on Learning Roadmap ↗
            </Button>
          </Stack>

          {/* Detailed Question Review List */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
              <Typography variant="h6" fontWeight={800}>
                Question-by-Question Deep Dive ({quizData.questions.length})
              </Typography>
              <Stack direction="row" spacing={1}>
                {["all", "missed", "flagged"].map((f) => (
                  <Button
                    key={f}
                    size="small"
                    variant={reviewFilter === f ? "contained" : "outlined"}
                    color={reviewFilter === f ? "primary" : "inherit"}
                    onClick={() => setReviewFilter(f)}
                    sx={{ textTransform: "capitalize", borderRadius: 2, fontWeight: 700 }}
                  >
                    {f}
                  </Button>
                ))}
              </Stack>
            </Box>

            <Stack spacing={2.5}>
              {quizData.questions
                .filter((q) => {
                  if (reviewFilter === "missed") return userAnswers[q.id] !== q.correctKey;
                  if (reviewFilter === "flagged") return Boolean(flaggedQuestions[q.id]);
                  return true;
                })
                .map((q, idx) => {
                  const studentAns = userAnswers[q.id];
                  const isCorrect = studentAns === q.correctKey;
                  return (
                    <Card
                      key={q.id}
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3.5,
                        border: "1px solid",
                        borderColor: isCorrect ? "divider" : "error.light",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                        <Chip
                          label={`Q${idx + 1}`}
                          size="small"
                          color={isCorrect ? "success" : "error"}
                          sx={{ fontWeight: 800 }}
                        />
                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                          {q.subtopic}
                        </Typography>
                        {flaggedQuestions[q.id] && (
                          <Chip label="Flagged" size="small" color="warning" sx={{ height: 20, fontSize: "0.68rem" }} />
                        )}
                      </Stack>

                      <Typography variant="body1" fontWeight={800} sx={{ mb: 1.5 }}>
                        {q.question}
                      </Typography>

                      {q.codeSnippet && (
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1.5,
                            mb: 2,
                            borderRadius: 2,
                            bgcolor: (theme) =>
                              theme.palette.mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(15, 23, 42, 0.04)",
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: "0.82rem",
                            overflowX: "auto",
                          }}
                        >
                          <code>{q.codeSnippet}</code>
                        </Paper>
                      )}

                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                        Your Choice: <strong>Option {studentAns || "Unanswered"}</strong> &bull; Correct:{" "}
                        <strong style={{ color: "#10b981" }}>Option {q.correctKey}</strong>
                      </Typography>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2.5,
                          bgcolor: (theme) =>
                            theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                          border: "1px dashed",
                          borderColor: "divider",
                        }}
                      >
                        <Typography variant="caption" fontWeight={800} color="success.main" display="block">
                          CONCEPT RATIONALE:
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.3, lineHeight: 1.5 }}>
                          {q.explanation?.whyCorrect}
                        </Typography>
                        {q.explanation?.proTip && (
                          <Typography variant="caption" color="primary.main" sx={{ display: "block", mt: 1, fontWeight: 700 }}>
                            💡 Pro-Tip: {q.explanation?.proTip}
                          </Typography>
                        )}
                      </Paper>
                    </Card>
                  );
                })}
            </Stack>
          </Box>
        </Box>
      )}
    </Container>
  );
}
