import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Chip,
  Paper,
  Divider,
  LinearProgress,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CodeIcon from "@mui/icons-material/Code";
import PsychologyIcon from "@mui/icons-material/Psychology";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarsIcon from "@mui/icons-material/Stars";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import QuizIcon from "@mui/icons-material/Quiz";

import { ROADMAP_TRACKS, getTrackTopics, getTrackTopicCount } from "../data/roadmapData";

const STORAGE_KEY = "STUDENT_ROADMAP_PROGRESS";

export default function RoadmapPage({ onNavigate, role = "student", onStartExam }) {
  const [selectedTrackId, setSelectedTrackId] = useState("frontend");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | COMPLETED | PENDING
  const [expandedStages, setExpandedStages] = useState({
    "stage-1": true,
    "stage-2": true,
    "stage-3": true,
    "stage-4": true,
    "stage-5": true,
    "fs-stage-1": true,
    "fs-stage-2": true,
    "fs-stage-3": true,
    "fs-stage-4": true,
    "int-stage-1": true,
    "int-stage-2": true,
    "int-stage-3": true,
  });

  // Track completed topic IDs in localStorage
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 2 && parsed.includes("fe-html5") && parsed.includes("fe-css-layout")) {
        return [];
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTopicIds));
    } catch (e) {
      console.warn("Failed to persist roadmap progress", e);
    }
  }, [completedTopicIds]);

  const activeTrack = useMemo(() => {
    return ROADMAP_TRACKS.find((t) => t.id === selectedTrackId) || ROADMAP_TRACKS[0];
  }, [selectedTrackId]);

  const trackTopics = useMemo(() => {
    return getTrackTopics(activeTrack);
  }, [activeTrack]);

  const completedCount = useMemo(() => {
    return trackTopics.filter((t) => completedTopicIds.includes(t.id)).length;
  }, [trackTopics, completedTopicIds]);

  const progressPercent = useMemo(() => {
    if (!trackTopics.length) return 0;
    return Math.round((completedCount / trackTopics.length) * 100);
  }, [completedCount, trackTopics]);

  const studentXP = completedTopicIds.length * 50;
  const studentLevel = useMemo(() => {
    if (completedTopicIds.length >= 15) return { level: 5, title: "Code Wizard 👑", color: "#ec4899", bg: "rgba(236, 72, 153, 0.15)" };
    if (completedTopicIds.length >= 10) return { level: 4, title: "Full Stack Warrior 🔥", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" };
    if (completedTopicIds.length >= 6) return { level: 3, title: "Frontend Apprentice ⚡", color: "#6366f1", bg: "rgba(99, 102, 241, 0.15)" };
    if (completedTopicIds.length >= 3) return { level: 2, title: "Web Adventurer 🚀", color: "#06b6d4", bg: "rgba(6, 182, 212, 0.15)" };
    return { level: 1, title: "Code Novice 🌱", color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" };
  }, [completedTopicIds.length]);

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopicIds((prev) => {
      if (prev.includes(topicId)) {
        return prev.filter((id) => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const handleMarkStageComplete = (stage) => {
    const stageTopicIds = (stage.topics || []).map((t) => t.id);
    setCompletedTopicIds((prev) => {
      const set = new Set([...prev, ...stageTopicIds]);
      return Array.from(set);
    });
  };

  const handleResetTrack = () => {
    if (window.confirm(`Reset progress for ${activeTrack.title}?`)) {
      const trackTopicIdSet = new Set(trackTopics.map((t) => t.id));
      setCompletedTopicIds((prev) => prev.filter((id) => !trackTopicIdSet.has(id)));
    }
  };

  const toggleStageAccordion = (stageId) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "primary";
      case "Advanced":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }} className="animate-fade-in-up">
      {/* Page Title & Subtitle */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 3.5,
          gap: 2,
        }}
      >
        <Box>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                bgcolor: "primary.main",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(79, 70, 229, 0.35)",
              }}
            >
              <AltRouteIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: "-0.02em" }}>
                Student Learning Roadmap
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Curated step-by-step career syllabi, milestones, checklist tracking & deep learning links.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            startIcon={<RestartAltIcon />}
            onClick={handleResetTrack}
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            Reset Track
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            startIcon={<CodeIcon />}
            onClick={() => onNavigate("practice")}
            sx={{ fontWeight: 700, borderRadius: 2 }}
          >
            Open Sandbox
          </Button>
        </Stack>
      </Box>

      {/* Track Selector Tabs */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          mb: 3.5,
          borderRadius: 3.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Grid container spacing={1}>
          {ROADMAP_TRACKS.map((track) => {
            const active = track.id === selectedTrackId;
            const allTopics = getTrackTopics(track);
            const done = allTopics.filter((t) => completedTopicIds.includes(t.id)).length;
            const pct = allTopics.length ? Math.round((done / allTopics.length) * 100) : 0;

            return (
              <Grid size={{ xs: 12, md: 4 }} key={track.id}>
                <Paper
                  onClick={() => setSelectedTrackId(track.id)}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: "1px solid",
                    borderColor: active ? "primary.main" : "transparent",
                    bgcolor: active
                      ? (theme) => (theme.palette.mode === "dark" ? "rgba(79, 70, 229, 0.16)" : "rgba(79, 70, 229, 0.08)")
                      : "transparent",
                    "&:hover": {
                      bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"),
                    },
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight={800} color={active ? "primary.main" : "text.primary"}>
                      {track.title}
                    </Typography>
                    <Chip
                      size="small"
                      label={`${pct}% Done`}
                      color={pct === 100 ? "success" : active ? "primary" : "default"}
                      sx={{ fontWeight: 700, fontSize: "0.72rem" }}
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5, minHeight: 32 }}>
                    {track.tagline}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    sx={{ height: 6, borderRadius: 3 }}
                    color={pct === 100 ? "success" : active ? "primary" : "inherit"}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Track Overview & Hero Stats Bar */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 3.5 },
          mb: 4,
          borderRadius: 3.5,
          border: "1px solid",
          borderColor: "divider",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%)"
              : "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%)",
          },
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ mb: 1.5, gap: 1 }}>
              <Chip
                label={`Level ${studentLevel.level}: ${studentLevel.title}`}
                size="small"
                sx={{
                  bgcolor: studentLevel.bg,
                  color: studentLevel.color,
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  border: `1px solid ${studentLevel.color}`,
                }}
              />
              <Chip
                label={`⭐ ${studentXP} XP Earned`}
                size="small"
                sx={{
                  bgcolor: "rgba(245, 158, 11, 0.15)",
                  color: "#d97706",
                  fontWeight: 800,
                  fontSize: "0.72rem",
                }}
              />
              <Chip
                icon={<AccessTimeIcon fontSize="small" />}
                label={activeTrack.duration}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
              <Chip
                icon={<StarsIcon fontSize="small" />}
                label={`${activeTrack.stages.length} Structured Phases`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
              {progressPercent === 100 && (
                <Chip
                  icon={<EmojiEventsIcon fontSize="small" />}
                  label="Track Completed! 🏆"
                  size="small"
                  color="success"
                  sx={{ fontWeight: 800 }}
                />
              )}
            </Stack>
            <Typography variant="h4" fontWeight={900} gutterBottom sx={{ letterSpacing: "-0.01em" }}>
              {activeTrack.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check off modules as you learn. Click on any topic to jump directly into Daily Class Notes, practice in the Frontend Sandbox, or check your understanding with the AI Self-Knowledge Exam.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<QuizIcon fontSize="small" />}
                onClick={() => {
                  if (onStartExam) {
                    onStartExam({
                      technology: activeTrack.title.includes("Full Stack") ? "Node.js" : activeTrack.title.includes("Interview") ? "JavaScript" : "React",
                    });
                  } else {
                    onNavigate("exam");
                  }
                }}
                sx={{
                  fontWeight: 800,
                  borderRadius: 2.5,
                  background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                  boxShadow: "0 4px 14px rgba(236, 72, 153, 0.35)",
                  px: 2,
                }}
              >
                Test This Track with AI Exam
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                p: 2.8,
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 6px 18px rgba(0,0,0,0.03)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 1 }}>
                <Typography variant="caption" fontWeight={800} color="text.secondary">
                  CURRICULUM MASTERY
                </Typography>
                <Typography variant="h6" fontWeight={900} color="primary.main">
                  {progressPercent}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{ height: 10, borderRadius: 5, mb: 1.5 }}
                color={progressPercent === 100 ? "success" : "primary"}
              />
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                {completedCount} of {trackTopics.length} core competencies completed ({trackTopics.length - completedCount} remaining)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Filter and Search Controls */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <TextField
          size="small"
          placeholder="Search syllabus topics, keywords or concepts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: { sm: 380 }, bgcolor: "background.paper" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ mr: 0.5 }}>
            FILTER:
          </Typography>
          <Chip
            label="All Topics"
            size="small"
            clickable
            color={statusFilter === "ALL" ? "primary" : "default"}
            onClick={() => setStatusFilter("ALL")}
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="Completed"
            size="small"
            clickable
            color={statusFilter === "COMPLETED" ? "success" : "default"}
            onClick={() => setStatusFilter("COMPLETED")}
            sx={{ fontWeight: 600 }}
          />
          <Chip
            label="In Progress"
            size="small"
            clickable
            color={statusFilter === "PENDING" ? "warning" : "default"}
            onClick={() => setStatusFilter("PENDING")}
            sx={{ fontWeight: 600 }}
          />
        </Stack>
      </Stack>

      {/* Stages Accordion List */}
      <Stack spacing={2.5}>
        {activeTrack.stages.map((stage) => {
          // Filter topics within stage
          const filteredTopics = (stage.topics || []).filter((topic) => {
            const matchesSearch =
              topic.title.toLowerCase().includes(search.toLowerCase()) ||
              topic.description.toLowerCase().includes(search.toLowerCase()) ||
              (topic.keyTakeaways && topic.keyTakeaways.some((k) => k.toLowerCase().includes(search.toLowerCase())));

            const isDone = completedTopicIds.includes(topic.id);
            let matchesStatus = true;
            if (statusFilter === "COMPLETED") matchesStatus = isDone;
            if (statusFilter === "PENDING") matchesStatus = !isDone;

            return matchesSearch && matchesStatus;
          });

          if (filteredTopics.length === 0 && search.trim() !== "") {
            return null;
          }

          const stageTopicIds = (stage.topics || []).map((t) => t.id);
          const stageCompletedCount = stageTopicIds.filter((id) => completedTopicIds.includes(id)).length;
          const stageTotal = stageTopicIds.length;
          const stageDone = stageTotal > 0 && stageCompletedCount === stageTotal;

          return (
            <Card
              key={stage.id}
              elevation={0}
              sx={{
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: stageDone ? "success.main" : "divider",
                bgcolor: "background.paper",
                overflow: "hidden",
                transition: "border-color 0.2s ease",
              }}
            >
              {/* Stage Header */}
              <Box
                sx={{
                  p: { xs: 2, sm: 2.8 },
                  bgcolor: (theme) =>
                    stageDone
                      ? theme.palette.mode === "dark"
                        ? "rgba(16, 185, 129, 0.12)"
                        : "rgba(16, 185, 129, 0.08)"
                      : theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(0, 0, 0, 0.02)",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      bgcolor: stageDone ? "success.main" : "primary.main",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      boxShadow: stageDone
                        ? "0 4px 12px rgba(16, 185, 129, 0.4)"
                        : "0 4px 12px rgba(79, 70, 229, 0.3)",
                    }}
                  >
                    {stageDone ? "✓" : stage.stageNumber}
                  </Box>

                  <Box>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Typography variant="h6" fontWeight={800}>
                        {stage.title}
                      </Typography>
                      <Chip
                        size="small"
                        label={stage.duration}
                        variant="outlined"
                        sx={{ fontWeight: 600, fontSize: "0.72rem" }}
                      />
                      {stageDone && (
                        <Chip
                          size="small"
                          label="Stage Mastered"
                          color="success"
                          sx={{ fontWeight: 700, fontSize: "0.72rem" }}
                        />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {stage.description}
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography variant="caption" fontWeight={700} color="text.secondary">
                    {stageCompletedCount} / {stageTotal} Done
                  </Typography>
                  {!stageDone && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="inherit"
                      startIcon={<DoneAllIcon />}
                      onClick={() => handleMarkStageComplete(stage)}
                      sx={{ fontSize: "0.75rem", fontWeight: 700 }}
                    >
                      Mark Stage Done
                    </Button>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => toggleStageAccordion(stage.id)}
                    sx={{
                      transform: expandedStages[stage.id] ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Stack>
              </Box>

              {/* Topics Grid / List */}
              {expandedStages[stage.id] !== false && (
                <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                  <Stack spacing={2}>
                    {filteredTopics.map((topic) => {
                      const isComplete = completedTopicIds.includes(topic.id);

                      return (
                        <Paper
                          key={topic.id}
                          elevation={0}
                          sx={{
                            p: 2.2,
                            borderRadius: 2.5,
                            border: "1px solid",
                            borderColor: isComplete ? "success.main" : "divider",
                            bgcolor: isComplete
                              ? (theme) => (theme.palette.mode === "dark" ? "rgba(16, 185, 129, 0.05)" : "rgba(16, 185, 129, 0.03)")
                              : "background.paper",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: isComplete ? "success.main" : "primary.main",
                              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                            },
                          }}
                        >
                          <Grid container spacing={2} alignItems="flex-start">
                            {/* Checkbox & Topic Info */}
                            <Grid size={{ xs: 12, md: 7 }}>
                              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                <IconButton
                                  size="small"
                                  onClick={() => toggleTopicCompletion(topic.id)}
                                  color={isComplete ? "success" : "default"}
                                  sx={{ mt: 0.2 }}
                                >
                                  {isComplete ? (
                                    <CheckCircleIcon sx={{ fontSize: 24 }} />
                                  ) : (
                                    <RadioButtonUncheckedIcon sx={{ fontSize: 24, color: "text.secondary" }} />
                                  )}
                                </IconButton>

                                <Box sx={{ flex: 1 }}>
                                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" sx={{ mb: 0.5 }}>
                                    <Typography
                                      variant="subtitle1"
                                      fontWeight={800}
                                      sx={{
                                        textDecoration: isComplete ? "line-through" : "none",
                                        color: isComplete ? "text.secondary" : "text.primary",
                                      }}
                                    >
                                      {topic.title}
                                    </Typography>
                                    <Chip
                                      label={topic.difficulty}
                                      size="small"
                                      color={getDifficultyColor(topic.difficulty)}
                                      sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700 }}
                                    />
                                    <Chip
                                      label={topic.duration}
                                      size="small"
                                      variant="outlined"
                                      sx={{ height: 20, fontSize: "0.68rem", fontWeight: 600 }}
                                    />
                                    <Chip
                                      label="+50 XP"
                                      size="small"
                                      sx={{
                                        height: 20,
                                        fontSize: "0.68rem",
                                        fontWeight: 800,
                                        bgcolor: isComplete ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                                        color: isComplete ? "#059669" : "#d97706",
                                      }}
                                    />
                                  </Stack>

                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                                    {topic.description}
                                  </Typography>

                                  {/* Key Takeaways */}
                                  {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
                                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 0.8 }}>
                                      {topic.keyTakeaways.map((k, idx) => (
                                        <Chip
                                          key={idx}
                                          label={`✓ ${k}`}
                                          size="small"
                                          sx={{
                                            bgcolor: (theme) =>
                                              theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                                            fontSize: "0.7rem",
                                            fontWeight: 600,
                                          }}
                                        />
                                      ))}
                                    </Stack>
                                  )}
                                </Box>
                              </Stack>
                            </Grid>

                            {/* Direct Action Deep-Links */}
                            <Grid size={{ xs: 12, md: 5 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  justifyContent: { xs: "flex-start", md: "flex-end" },
                                  gap: 1,
                                  pt: { xs: 1, md: 0 },
                                }}
                              >
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="success"
                                  startIcon={<CodeIcon fontSize="small" />}
                                  onClick={() => onNavigate("practice")}
                                  sx={{ fontSize: "0.75rem", fontWeight: 700, borderRadius: 2 }}
                                >
                                  Sandbox Code
                                </Button>

                                <Button
                                  size="small"
                                  variant="contained"
                                  startIcon={<QuizIcon fontSize="small" />}
                                  onClick={() => {
                                    if (onStartExam) {
                                      onStartExam({
                                        technology: activeTrack.title.includes("Full Stack") ? "Node.js" : activeTrack.title.includes("Interview") ? "JavaScript" : "React",
                                        topic: topic.title,
                                      });
                                    } else {
                                      onNavigate("exam");
                                    }
                                  }}
                                  sx={{
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                                    color: "#fff",
                                  }}
                                >
                                  AI Exam
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Paper>
                      );
                    })}
                  </Stack>
                </Box>
              )}
            </Card>
          );
        })}
      </Stack>

      {/* External Career & Coding Tools: Overleaf, LeetCode, HackerRank */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3.5,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%)"
              : "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <Box sx={{ mb: 2.5 }}>
          <Typography variant="h6" fontWeight={800} gutterBottom>
            Essential Career, Coding & Design Platforms
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complement your syllabus roadmap with industry-standard resume building, competitive coding, Font Awesome icons, Google Fonts & AOS scroll animations.
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {/* Overleaf */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              elevation={0}
              className="interactive-card glow-card-emerald lusion-reveal"
              sx={{
                p: 2.8,
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(16, 185, 129, 0.25)" : "rgba(16, 185, 129, 0.35)",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)"
                    : "linear-gradient(145deg, rgba(236, 253, 245, 0.8) 0%, #ffffff 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="LaTeX Resume Builder"
                  size="small"
                  sx={{
                    bgcolor: "rgba(16, 185, 129, 0.16)",
                    color: "#10b981",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h6" fontWeight={900} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>📄</span> Overleaf Resume Creator
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  100+ Free ATS-friendly Developer CV templates, cloud LaTeX compiler & instant PDF downloads.
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                endIcon={<OpenInNewIcon />}
                href="https://www.overleaf.com/latex/templates/tagged/cv"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  borderRadius: 2.5,
                  py: 1.2,
                  boxShadow: "0 6px 18px rgba(16, 185, 129, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  },
                }}
              >
                Launch Overleaf Templates ↗
              </Button>
            </Card>
          </Grid>

          {/* LeetCode */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              elevation={0}
              className="interactive-card glow-card-amber lusion-reveal"
              sx={{
                p: 2.8,
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(245, 158, 11, 0.25)" : "rgba(245, 158, 11, 0.35)",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(245, 158, 11, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)"
                    : "linear-gradient(145deg, rgba(254, 243, 199, 0.8) 0%, #ffffff 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="DSA & Problem Solving"
                  size="small"
                  sx={{
                    bgcolor: "rgba(245, 158, 11, 0.16)",
                    color: "#d97706",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    border: "1px solid rgba(245, 158, 11, 0.3)",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h6" fontWeight={900} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>⚡</span> LeetCode Coding Arena
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Blind 75 & Top 150 curated interview problems, daily challenges & company-tagged solutions.
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                endIcon={<OpenInNewIcon />}
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  borderRadius: 2.5,
                  py: 1.2,
                  boxShadow: "0 6px 18px rgba(245, 158, 11, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                  },
                }}
              >
                Launch LeetCode Arena ↗
              </Button>
            </Card>
          </Grid>

          {/* HackerRank */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              elevation={0}
              className="interactive-card glow-card-cyan lusion-reveal"
              sx={{
                p: 2.8,
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(6, 182, 212, 0.25)" : "rgba(6, 182, 212, 0.35)",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(6, 182, 212, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)"
                    : "linear-gradient(145deg, rgba(207, 250, 254, 0.8) 0%, #ffffff 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="Skill Certifications"
                  size="small"
                  sx={{
                    bgcolor: "rgba(6, 182, 212, 0.16)",
                    color: "#0891b2",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h6" fontWeight={900} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>🎯</span> HackerRank Challenges
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  Verified developer skill badges, language certification tracks, and technical screening prep.
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                endIcon={<OpenInNewIcon />}
                href="https://www.hackerrank.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  borderRadius: 2.5,
                  py: 1.2,
                  boxShadow: "0 6px 18px rgba(6, 182, 212, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
                  },
                }}
              >
                Launch HackerRank Official ↗
              </Button>
            </Card>
          </Grid>

          {/* Font Awesome */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              elevation={0}
              className="interactive-card glow-card-blue lusion-reveal"
              sx={{
                p: 2.8,
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(37, 99, 235, 0.25)" : "rgba(37, 99, 235, 0.35)",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(37, 99, 235, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)"
                    : "linear-gradient(145deg, rgba(239, 246, 255, 0.85) 0%, #ffffff 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="Icons & Web Assets"
                  size="small"
                  sx={{
                    bgcolor: "rgba(37, 99, 235, 0.16)",
                    color: "#2563eb",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    border: "1px solid rgba(37, 99, 235, 0.3)",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h6" fontWeight={900} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>🌟</span> Font Awesome Icons
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  2,000+ free modern vector SVG icons, brand logos, CDN kits & React component snippets.
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                endIcon={<OpenInNewIcon />}
                href="https://fontawesome.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  borderRadius: 2.5,
                  py: 1.2,
                  boxShadow: "0 6px 18px rgba(37, 99, 235, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                  },
                }}
              >
                Launch Font Awesome Official ↗
              </Button>
            </Card>
          </Grid>

          {/* Google Fonts */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              elevation={0}
              className="interactive-card glow-card-rose lusion-reveal"
              sx={{
                p: 2.8,
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(244, 63, 94, 0.25)" : "rgba(244, 63, 94, 0.35)",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)"
                    : "linear-gradient(145deg, rgba(255, 241, 242, 0.85) 0%, #ffffff 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="Typography & Fonts"
                  size="small"
                  sx={{
                    bgcolor: "rgba(244, 63, 94, 0.16)",
                    color: "#f43f5e",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    border: "1px solid rgba(244, 63, 94, 0.3)",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h6" fontWeight={900} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>🔤</span> Google Fonts & Symbols
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  1,500+ free open-source typefaces (Inter, Poppins, Roboto), optical weights & Material Symbols.
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                endIcon={<OpenInNewIcon />}
                href="https://fonts.google.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  borderRadius: 2.5,
                  py: 1.2,
                  boxShadow: "0 6px 18px rgba(244, 63, 94, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                  },
                }}
              >
                Launch Google Fonts Official ↗
              </Button>
            </Card>
          </Grid>

          {/* AOS - Animate On Scroll */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Card
              elevation={0}
              className="interactive-card glow-card-indigo lusion-reveal"
              sx={{
                p: 2.8,
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.25)" : "rgba(99, 102, 241, 0.35)",
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(145deg, rgba(99, 102, 241, 0.08) 0%, rgba(15, 23, 42, 0.8) 100%)"
                    : "linear-gradient(145deg, rgba(238, 242, 255, 0.85) 0%, #ffffff 100%)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Chip
                  label="Scroll Animations & CSS3"
                  size="small"
                  sx={{
                    bgcolor: "rgba(99, 102, 241, 0.16)",
                    color: "#6366f1",
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    mb: 1.5,
                  }}
                />
                <Typography variant="h6" fontWeight={900} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>✨</span> AOS - Animate On Scroll
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  CSS3-driven scroll animation library with interactive demo playground, easing curves & data-aos integration.
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                endIcon={<OpenInNewIcon />}
                href="https://michalsnik.github.io/aos/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  borderRadius: 2.5,
                  py: 1.2,
                  boxShadow: "0 6px 18px rgba(46, 94, 153, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2E5E99 0%, #1D406E 100%)",
                  },
                }}
              >
                Launch AOS Animation Library ↗
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
