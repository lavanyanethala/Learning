import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  TextField,
  MenuItem,
  Paper,
  Divider,
  LinearProgress,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Tooltip,
  Alert,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PsychologyIcon from "@mui/icons-material/Psychology";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CodeIcon from "@mui/icons-material/Code";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyIcon from "@mui/icons-material/Key";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarsIcon from "@mui/icons-material/Stars";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";

import { aiService } from "../services/aiService";

const STORAGE_KEY_PLAN = "JD_INTERVIEW_SAVED_PLAN";
const STORAGE_KEY_CHECKLIST = "JD_INTERVIEW_CHECKLIST";

export default function JDInterviewCopilotPage({ onNavigate }) {
  // Config state - clean without dummy text
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [prepDays, setPrepDays] = useState(7);
  const [dailyHours, setDailyHours] = useState(4);

  // Active Blueprint state
  const [planData, setPlanData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLAN);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (parsed?.company === "Tech Innovators Inc." || parsed?.jobTitle === "Frontend React Developer") {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Completed checklist task keys: set of string IDs e.g. "d1-t0", "d1-t1"
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKLIST);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Practice Answer Modal state
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const [studentDraft, setStudentDraft] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");

  // API Key dialog state
  const [keyDialogOpen, setKeyDialogOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(aiService.getApiKey());
  const [copyFeedback, setCopyFeedback] = useState("");

  // Persist completed tasks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(completedTasks));
    } catch (e) {
      console.warn(e);
    }
  }, [completedTasks]);

  // Persist plan data
  useEffect(() => {
    if (planData) {
      try {
        localStorage.setItem(STORAGE_KEY_PLAN, JSON.stringify(planData));
      } catch (e) {
        console.warn(e);
      }
    }
  }, [planData]);

  // Handle plan generation
  const handleGeneratePlan = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter or select a Job Description first.");
      return;
    }
    setGenerating(true);
    try {
      const result = await aiService.generateJDInterviewPlan({
        jobTitle: jobTitle.trim() || "Software Engineer",
        company: company.trim() || "Target Company",
        jobDescription: jobDescription.trim(),
        prepDays: parseInt(prepDays, 10) || 7,
        dailyHours: parseInt(dailyHours, 10) || 4,
      });
      setPlanData(result);
      setActiveTab(0);
    } catch (err) {
      console.error("Failed to generate plan:", err);
      alert("Failed to generate AI plan. Please check your inputs or try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleTask = (taskKey) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  const handleResetChecklist = () => {
    if (window.confirm("Reset your study checklist progress?")) {
      setCompletedTasks({});
    }
  };

  const handleSaveApiKey = () => {
    aiService.setApiKey(apiKeyInput);
    setKeyDialogOpen(false);
    alert("Gemini API Key saved! Live AI features are now active.");
  };

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(""), 2500);
  };

  // Evaluate student answer inside modal
  const handleEvaluatePractice = async () => {
    if (!studentDraft.trim()) return;
    setEvaluating(true);
    try {
      const res = await aiService.evaluateStudentAnswer(
        practiceQuestion.question,
        studentDraft,
        practiceQuestion.category
      );
      setAiFeedback(res);
    } catch (err) {
      setAiFeedback("Evaluation failed. Please try again.");
    } finally {
      setEvaluating(false);
    }
  };

  // Export Plan to Markdown
  const handleExportMarkdown = () => {
    if (!planData) return;
    const { summary, schedule, questions, project, projectPitch } = planData;
    let md = `# Interview Preparation Blueprint for ${summary.role} at ${summary.company}\n`;
    md += `*Timeline: ${summary.prepDays} Days (${summary.dailyHours} hours/day)*\n\n`;
    md += `## Extracted Key Tech Stack:\n${summary.extractedTechStack.map((t) => `- ${t}`).join("\n")}\n\n`;
    md += `## 1. Day-by-Day Study Schedule:\n`;
    schedule.forEach((day) => {
      md += `### ${day.title}\n**Focus**: ${day.focus}\n`;
      day.timeBlocks.forEach((tb) => {
        md += `- **${tb.time}** (${tb.task}): ${tb.details}\n`;
      });
      md += `*Key Concepts*: ${day.keyConcepts.join(", ")}\n\n`;
    });
    md += `## 2. High-Probability Interview Questions:\n`;
    questions.forEach((q, idx) => {
      md += `### Q${idx + 1} [${q.category} - ${q.difficulty}]: ${q.question}\n`;
      md += `**Elevator Pitch (30s)**: ${q.elevatorPitch}\n`;
      md += `**In-Depth Answer**: ${q.inDepthAnswer}\n\n`;
    });
    md += `## 3. Matched Showcase Project: ${project.projectName}\n`;
    md += `**Tagline**: ${project.tagline}\n`;
    md += `**Tech Stack**: ${JSON.stringify(project.techStack, null, 2)}\n\n`;
    md += `## 4. How to Pitch to Interviewers:\n`;
    md += `### 60-Second Elevator Pitch:\n${projectPitch.elevatorPitch60s}\n\n`;
    md += `### STAR Framework:\n- **Situation**: ${projectPitch.starFramework.situation}\n- **Task**: ${projectPitch.starFramework.task}\n- **Action**: ${projectPitch.starFramework.action}\n- **Result**: ${projectPitch.starFramework.result}\n\n`;

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Interview_Blueprint_${summary.role.replace(/[^a-zA-Z0-9]/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Schedule task counts
  const totalTasksCount = useMemo(() => {
    if (!planData?.schedule) return 0;
    return planData.schedule.reduce((acc, d) => acc + (d.timeBlocks?.length || 0), 0);
  }, [planData]);

  const completedTasksCount = useMemo(() => {
    return Object.values(completedTasks).filter(Boolean).length;
  }, [completedTasks]);

  const scheduleProgressPct = totalTasksCount ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }} className="animate-fade-in-up">
      {/* Top Page Header */}
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
                width: 44,
                height: 44,
                borderRadius: 2.5,
                background: "linear-gradient(135deg, #2E5E99 0%, #7BA4D0 100%)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 18px rgba(46, 94, 153, 0.35)",
              }}
            >
              <AutoAwesomeIcon fontSize="medium" />
            </Box>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: "-0.02em" }}>
                  AI Job Description (JD) Interview Copilot
                </Typography>
                <Chip
                  label="Smart AI Engine"
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 800, fontSize: "0.7rem", height: 20 }}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Turn any job posting into an hour-by-hour schedule, targeted Q&As, a custom project, and a winning pitch script.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <Chip
            icon={<KeyIcon fontSize="small" />}
            label={aiService.getApiKey() ? "Gemini Live API Active" : "Offline Expert Engine"}
            clickable
            onClick={() => setKeyDialogOpen(true)}
            color={aiService.getApiKey() ? "success" : "default"}
            variant="outlined"
            sx={{ fontWeight: 700, fontSize: "0.75rem" }}
          />

          {planData && (
            <>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={handleExportMarkdown}
                sx={{ fontWeight: 700, borderRadius: 2 }}
              >
                Export Blueprint
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<ArrowBackIcon />}
                onClick={() => setPlanData(null)}
                sx={{ fontWeight: 700, borderRadius: 2 }}
              >
                New JD Analysis
              </Button>
            </>
          )}
        </Stack>
      </Box>

      {/* Main View: Setup Config OR Generated Blueprint Dashboard */}
      {!planData ? (
        /* Configuration Setup Panel */
        <Grid container spacing={3.5}>
          {/* Left Column: JD Input & Target Role */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "linear-gradient(90deg, #2E5E99 0%, #7BA4D0 50%, #2E5E99 100%)",
                },
              }}
            >
              <Typography variant="h6" fontWeight={800} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <span>🎯</span> Step 1: Target Position & Job Description (JD)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Paste the target position, company name, and full job requirements from LinkedIn, Indeed, or your recruiter:
              </Typography>

              <Grid container spacing={2} sx={{ mb: 2.5 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Target Job Title / Role"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    InputProps={{
                      startAdornment: <WorkIcon sx={{ mr: 1, color: "text.secondary" }} fontSize="small" />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Target Company / Organization"
                    placeholder="e.g. Google, Swiggy, Stripe, Startup"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    InputProps={{
                      startAdornment: <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} fontSize="small" />,
                    }}
                  />
                </Grid>
              </Grid>

              {/* JD Textarea */}
              <TextField
                fullWidth
                multiline
                rows={9}
                label="Full Job Description (Paste Here)"
                placeholder="Paste the requirements, responsibilities, tech stack, and qualifications..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Typography variant="caption" color="text.secondary" align="right" display="block">
                Character Count: {jobDescription.length} characters
              </Typography>
            </Card>
          </Grid>

          {/* Right Column: Timeline & Preparation Settings */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3.5,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight={800} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>⏱️</span> Step 2: Time Runway & Hours
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  How much time do you have before the actual interview round?
                </Typography>

                {/* Days Selector */}
                <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ display: "block", mb: 1 }}>
                  DAYS REMAINING UNTIL INTERVIEW:
                </Typography>
                <Grid container spacing={1} sx={{ mb: 3 }}>
                  {[
                    { days: 3, label: "3 Days (Crash Sprint)" },
                    { days: 7, label: "7 Days (Targeted)" },
                    { days: 14, label: "14 Days (Standard)" },
                    { days: 30, label: "30 Days (Mastery)" },
                  ].map((item) => (
                    <Grid size={{ xs: 6 }} key={item.days}>
                      <Paper
                        onClick={() => setPrepDays(item.days)}
                        elevation={0}
                        sx={{
                          p: 1.5,
                          borderRadius: 2.5,
                          border: "1.5px solid",
                          borderColor: prepDays === item.days ? "primary.main" : "divider",
                          bgcolor: prepDays === item.days
                            ? (theme) => (theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.08)")
                            : "action.hover",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={800} color={prepDays === item.days ? "primary.main" : "text.primary"}>
                          {item.days} Days
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.68rem" }}>
                          {item.label.split("(")[1]?.replace(")", "") || ""}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                {/* Daily Hours Selector */}
                <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ display: "block", mb: 1 }}>
                  DAILY STUDY TIME COMMITMENT:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                  {[2, 4, 6, 8].map((h) => (
                    <Chip
                      key={h}
                      label={`${h} hrs/day`}
                      clickable
                      onClick={() => setDailyHours(h)}
                      color={dailyHours === h ? "primary" : "default"}
                      variant={dailyHours === h ? "filled" : "outlined"}
                      sx={{ fontWeight: 800, flex: 1, borderRadius: 2 }}
                    />
                  ))}
                </Stack>

                {/* Blueprint Deliverables Preview List */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"),
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 3,
                  }}
                >
                  <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ display: "block", mb: 1 }}>
                    WHAT YOU WILL GET:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="caption" fontWeight={600} color="text.primary">
                      &bull; 📅 {prepDays}-Day Schedule mapped to morning, afternoon & evening blocks
                    </Typography>
                    <Typography variant="caption" fontWeight={600} color="text.primary">
                      &bull; ❓ Curated technical & system design Q&As with senior model answers
                    </Typography>
                    <Typography variant="caption" fontWeight={600} color="text.primary">
                      &bull; 🚀 Tailored portfolio project matching this exact JD with code snippets
                    </Typography>
                    <Typography variant="caption" fontWeight={600} color="text.primary">
                      &bull; 🎙️ 60-second pitch, STAR methodology & answers to 5 tough follow-ups
                    </Typography>
                  </Stack>
                </Paper>
              </Box>

              {/* Generate Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={generating}
                onClick={handleGeneratePlan}
                startIcon={<AutoAwesomeIcon />}
                sx={{
                  py: 1.6,
                  borderRadius: 3,
                  fontWeight: 900,
                  fontSize: "0.95rem",
                  bgcolor: "#2E5E99",
                  boxShadow: "0 6px 18px rgba(46, 94, 153, 0.35)",
                  "&:hover": {
                    bgcolor: "#1D406E",
                  },
                }}
              >
                {generating ? "Analyzing JD & Generating Blueprint..." : "🚀 Generate AI Interview Blueprint"}
              </Button>
            </Card>
          </Grid>
        </Grid>
      ) : (
        /* Results View: Generated Blueprint Dashboard */
        <Box>
          {/* Blueprint Hero Summary Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              mb: 3.5,
              borderRadius: 3.5,
              border: "1px solid",
              borderColor: "divider",
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(19, 47, 82, 0.7) 0%, rgba(13, 36, 64, 0.9) 100%)"
                  : "linear-gradient(135deg, #FFFFFF 0%, #E7F0FA 100%)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, #2E5E99 0%, #7BA4D0 50%, #2E5E99 100%)",
              },
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" sx={{ mb: 1.5, gap: 1 }}>
                  <Chip
                    icon={<WorkIcon fontSize="small" />}
                    label={planData.summary?.role || jobTitle}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 800 }}
                  />
                  <Chip
                    icon={<BusinessIcon fontSize="small" />}
                    label={planData.summary?.company || company}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 700 }}
                  />
                  <Chip
                    icon={<AccessTimeIcon fontSize="small" />}
                    label={`${planData.summary?.prepDays || prepDays} Days Sprint (${planData.summary?.dailyHours || dailyHours}h/day)`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(245, 158, 11, 0.15)",
                      color: "#d97706",
                      fontWeight: 800,
                    }}
                  />
                </Stack>

                <Typography variant="h4" fontWeight={900} gutterBottom sx={{ letterSpacing: "-0.01em" }}>
                  Interview Blueprint: {planData.summary?.role}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Your preparation schedule, core interview questions, portfolio project, and pitch guide are fully assembled below.
                </Typography>

                {/* Detected Tech Stack Tags */}
                <Box>
                  <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ display: "block", mb: 0.8 }}>
                    DETECTED JOB REQUIREMENTS & CORE STACK:
                  </Typography>
                  <Stack direction="row" spacing={0.8} flexWrap="wrap" sx={{ gap: 0.8 }}>
                    {(planData.summary?.extractedTechStack || []).map((t, idx) => (
                      <Chip
                        key={idx}
                        label={t}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.72rem",
                          bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Grid>

              {/* Progress & Checklist Meter */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  sx={{
                    p: 2.8,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 1 }}>
                    <Typography variant="caption" fontWeight={800} color="text.secondary">
                      TIMETABLE COMPLETION
                    </Typography>
                    <Typography variant="h6" fontWeight={900} color="primary.main">
                      {scheduleProgressPct}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={scheduleProgressPct}
                    sx={{ height: 10, borderRadius: 5, mb: 1.5 }}
                    color={scheduleProgressPct === 100 ? "success" : "primary"}
                  />
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={700}>
                      {completedTasksCount} of {totalTasksCount} daily sessions checked off
                    </Typography>
                    <Button
                      size="small"
                      color="inherit"
                      startIcon={<RestartAltIcon fontSize="small" />}
                      onClick={handleResetChecklist}
                      sx={{ fontSize: "0.7rem", fontWeight: 700 }}
                    >
                      Reset
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Navigation Tabs */}
          <Paper
            elevation={0}
            sx={{
              mb: 3.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ px: 2, minHeight: 52 }}
            >
              <Tab
                icon={<CalendarMonthIcon fontSize="small" />}
                iconPosition="start"
                label={`1. Day-by-Day Schedule (${planData.schedule?.length || 0} Days)`}
                sx={{ fontWeight: 800, fontSize: "0.85rem", minHeight: 52 }}
              />
              <Tab
                icon={<PsychologyIcon fontSize="small" />}
                iconPosition="start"
                label={`2. JD Questions & Answers (${planData.questions?.length || 0})`}
                sx={{ fontWeight: 800, fontSize: "0.85rem", minHeight: 52 }}
              />
              <Tab
                icon={<RocketLaunchIcon fontSize="small" />}
                iconPosition="start"
                label="3. Tailored Showcase Project"
                sx={{ fontWeight: 800, fontSize: "0.85rem", minHeight: 52 }}
              />
              <Tab
                icon={<RecordVoiceOverIcon fontSize="small" />}
                iconPosition="start"
                label="4. How to Pitch to Interviewer"
                sx={{ fontWeight: 800, fontSize: "0.85rem", minHeight: 52 }}
              />
            </Tabs>
          </Paper>

          {/* Tab 1: Day-by-Day Study Schedule */}
          {activeTab === 0 && (
            <Stack spacing={2.5}>
              {planData.schedule?.map((day, dIdx) => (
                <Card
                  key={dIdx}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 2,
                          bgcolor: "primary.main",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: "0.9rem",
                        }}
                      >
                        D{day.dayNumber}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={800}>
                          {day.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          Focus Area: {day.focus}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {(day.keyConcepts || []).map((c, i) => (
                        <Chip
                          key={i}
                          label={c}
                          size="small"
                          sx={{ height: 20, fontSize: "0.68rem", fontWeight: 700 }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <CardContent sx={{ p: 2.5 }}>
                    <Grid container spacing={2}>
                      {day.timeBlocks?.map((block, bIdx) => {
                        const taskKey = `d${day.dayNumber}-t${bIdx}`;
                        const isDone = Boolean(completedTasks[taskKey]);

                        return (
                          <Grid size={{ xs: 12, md: 4 }} key={bIdx}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                borderRadius: 2.5,
                                border: "1px solid",
                                borderColor: isDone ? "success.main" : "divider",
                                bgcolor: isDone
                                  ? (theme) =>
                                      theme.palette.mode === "dark"
                                        ? "rgba(16, 185, 129, 0.08)"
                                        : "rgba(16, 185, 129, 0.04)"
                                  : "action.hover",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <Box sx={{ mb: 1.5 }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                  <Chip
                                    label={block.time}
                                    size="small"
                                    color={isDone ? "success" : "primary"}
                                    sx={{ fontWeight: 800, fontSize: "0.68rem", height: 20 }}
                                  />
                                  <IconButton
                                    size="small"
                                    onClick={() => handleToggleTask(taskKey)}
                                    color={isDone ? "success" : "default"}
                                  >
                                    {isDone ? (
                                      <CheckCircleIcon fontSize="small" />
                                    ) : (
                                      <RadioButtonUncheckedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                                    )}
                                  </IconButton>
                                </Box>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={800}
                                  gutterBottom
                                  sx={{
                                    textDecoration: isDone ? "line-through" : "none",
                                    color: isDone ? "text.secondary" : "text.primary",
                                  }}
                                >
                                  {block.task}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: "block" }}>
                                  {block.details}
                                </Typography>
                              </Box>

                              <Button
                                size="small"
                                variant={isDone ? "outlined" : "text"}
                                color={isDone ? "success" : "inherit"}
                                onClick={() => handleToggleTask(taskKey)}
                                sx={{ fontSize: "0.72rem", fontWeight: 700, alignSelf: "flex-start" }}
                              >
                                {isDone ? "Completed ✓" : "Mark Done"}
                              </Button>
                            </Paper>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          {/* Tab 2: High-Probability JD Questions & Answers */}
          {activeTab === 1 && (
            <Stack spacing={2.5}>
              {planData.questions?.map((item, qIdx) => (
                <Accordion
                  key={item.id || qIdx}
                  defaultExpanded={qIdx === 0}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    "&::before": { display: "none" },
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", width: "100%", pr: 2 }}>
                      <Chip
                        label={item.category}
                        size="small"
                        color={item.category.includes("Design") ? "secondary" : item.category.includes("Behavioral") ? "warning" : "primary"}
                        sx={{ fontWeight: 800, fontSize: "0.68rem", height: 22 }}
                      />
                      <Chip
                        label={item.difficulty}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 700, fontSize: "0.68rem", height: 22 }}
                      />
                      <Typography variant="subtitle1" fontWeight={800} sx={{ flex: 1, minWidth: 260 }}>
                        {item.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ p: 3, pt: 1, borderTop: "1px solid", borderColor: "divider" }}>
                    <Stack spacing={2.5}>
                      {/* Interviewer Intent */}
                      <Alert severity="info" sx={{ borderRadius: 2 }}>
                        <strong>What the Interviewer is Really Testing:</strong> {item.interviewerIntent}
                      </Alert>

                      {/* 30-Second Elevator Pitch */}
                      <Box>
                        <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ display: "block", mb: 0.8 }}>
                          🎙️ THE 30-SECOND ELEVATOR PITCH:
                        </Typography>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(46, 94, 153, 0.15)" : "rgba(46, 94, 153, 0.06)"),
                            borderLeft: "4px solid #2E5E99",
                          }}
                        >
                          <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.6 }}>
                            &ldquo;{item.elevatorPitch}&rdquo;
                          </Typography>
                        </Paper>
                      </Box>

                      {/* In-Depth Technical Answer */}
                      <Box>
                        <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ display: "block", mb: 0.8 }}>
                          🔍 IN-DEPTH TECHNICAL EXPLANATION:
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
                          {item.inDepthAnswer}
                        </Typography>
                      </Box>

                      {/* Code Snippet if present */}
                      {item.codeSnippet && (
                        <Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.8 }}>
                            <Typography variant="caption" fontWeight={800} color="text.secondary">
                              💻 PRODUCTION CODE PATTERN:
                            </Typography>
                            <Button
                              size="small"
                              startIcon={<ContentCopyIcon fontSize="small" />}
                              onClick={() => handleCopyText(item.codeSnippet, `code-${qIdx}`)}
                              sx={{ fontSize: "0.7rem", fontWeight: 700 }}
                            >
                              {copyFeedback === `code-${qIdx}` ? "Copied!" : "Copy Code"}
                            </Button>
                          </Box>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              bgcolor: (theme) => (theme.palette.mode === "dark" ? "#090d16" : "#f1f5f9"),
                              fontFamily: '"JetBrains Mono", monospace',
                              fontSize: "0.82rem",
                              overflowX: "auto",
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{item.codeSnippet}</pre>
                          </Paper>
                        </Box>
                      )}

                      {/* Pitfalls to Avoid */}
                      {item.pitfalls && (
                        <Box>
                          <Typography variant="caption" fontWeight={800} color="error.main" sx={{ display: "block", mb: 0.5 }}>
                            ⚠️ PITFALLS & MISTAKES TO AVOID:
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                            {item.pitfalls}
                          </Typography>
                        </Box>
                      )}

                      {/* Test Answer Button */}
                      <Box sx={{ pt: 1, display: "flex", justifyContent: "flex-end" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<PsychologyIcon />}
                          onClick={() => {
                            setPracticeQuestion(item);
                            setStudentDraft("");
                            setAiFeedback("");
                          }}
                          sx={{ fontWeight: 800, borderRadius: 2 }}
                        >
                          Test My Answer With AI Coach
                        </Button>
                      </Box>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}

          {/* Tab 3: Tailored Showcase Project */}
          {activeTab === 2 && planData.project && (
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
              <Box sx={{ mb: 3 }}>
                <Chip
                  label="Curated for this JD"
                  size="small"
                  color="success"
                  sx={{ mb: 1.5, fontWeight: 800, fontSize: "0.72rem" }}
                />
                <Typography variant="h4" fontWeight={900} gutterBottom sx={{ letterSpacing: "-0.01em" }}>
                  {planData.project.projectName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" fontWeight={600} sx={{ mb: 2 }}>
                  {planData.project.tagline}
                </Typography>

                <Alert severity="info" sx={{ borderRadius: 2.5, mb: 3 }}>
                  <strong>Problem Statement:</strong> {planData.project.problemStatement}
                </Alert>
              </Box>

              {/* Tech Stack Matrix Table */}
              <Box sx={{ mb: 3.5 }}>
                <Typography variant="subtitle2" fontWeight={800} color="text.secondary" gutterBottom>
                  TECH STACK & ARCHITECTURE COMPONENTS:
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(planData.project.techStack || {}).map(([layer, tech], i) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.8,
                          borderRadius: 2,
                          bgcolor: "action.hover",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography variant="caption" fontWeight={800} color="primary.main" sx={{ textTransform: "uppercase" }}>
                          {layer}
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                          {tech}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Core Features */}
              <Box sx={{ mb: 3.5 }}>
                <Typography variant="subtitle2" fontWeight={800} color="text.secondary" gutterBottom>
                  CORE FEATURES IMPLEMENTED:
                </Typography>
                <Stack spacing={1}>
                  {(planData.project.coreFeatures || []).map((feat, idx) => (
                    <Paper
                      key={idx}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <CheckCircleIcon color="success" fontSize="small" />
                      <Typography variant="body2" fontWeight={600}>
                        {feat}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Architecture Data Flow */}
              <Box sx={{ mb: 3.5 }}>
                <Typography variant="subtitle2" fontWeight={800} color="text.secondary" gutterBottom>
                  SYSTEM ARCHITECTURE & DATA FLOW PIPELINE:
                </Typography>
                <Stack spacing={1}>
                  {(planData.project.architectureFlow || []).map((step, idx) => (
                    <Paper
                      key={idx}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.04)"),
                        border: "1px solid",
                        borderColor: "rgba(99, 102, 241, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          color: "#fff",
                          fontSize: "0.75rem",
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography variant="body2" fontWeight={700}>
                        {step}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Critical Implementation Code Snippet */}
              {planData.project.codeSnippet && (
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={800} color="text.secondary">
                        KEY IMPLEMENTATION FILE: {planData.project.codeSnippet.fileName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {planData.project.codeSnippet.explanation}
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      startIcon={<ContentCopyIcon fontSize="small" />}
                      onClick={() => handleCopyText(planData.project.codeSnippet.code, "proj-code")}
                      sx={{ fontWeight: 700, borderRadius: 2 }}
                    >
                      {copyFeedback === "proj-code" ? "Copied!" : "Copy Code"}
                    </Button>
                  </Box>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 2.5,
                      bgcolor: (theme) => (theme.palette.mode === "dark" ? "#090d16" : "#f1f5f9"),
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: "0.82rem",
                      overflowX: "auto",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{planData.project.codeSnippet.code}</pre>
                  </Paper>
                </Box>
              )}
            </Card>
          )}

          {/* Tab 4: How to Pitch & Explain to Interviewer */}
          {activeTab === 3 && planData.projectPitch && (
            <Stack spacing={3}>
              {/* 60-Second Elevator Pitch Card */}
              <Card
                elevation={0}
                className="glow-card-indigo"
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: 3.5,
                  border: "1.5px solid",
                  borderColor: "primary.main",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "linear-gradient(145deg, rgba(79, 70, 229, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%)"
                      : "linear-gradient(145deg, rgba(238, 242, 255, 0.9) 0%, #ffffff 100%)",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box>
                    <Chip
                      icon={<RecordVoiceOverIcon fontSize="small" />}
                      label="60-SECOND ELEVATOR PITCH SCRIPT"
                      size="small"
                      color="primary"
                      sx={{ fontWeight: 800, fontSize: "0.72rem", mb: 1 }}
                    />
                    <Typography variant="h5" fontWeight={900}>
                      When Interviewer Asks: &ldquo;Tell me about a project you built.&rdquo;
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon fontSize="small" />}
                    onClick={() => handleCopyText(planData.projectPitch.elevatorPitch60s, "pitch-script")}
                    sx={{ fontWeight: 700 }}
                  >
                    {copyFeedback === "pitch-script" ? "Copied Script!" : "Copy Pitch"}
                  </Button>
                </Box>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2.5,
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.85)"),
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ lineHeight: 1.8, fontStyle: "italic", fontWeight: 500 }}>
                    {planData.projectPitch.elevatorPitch60s}
                  </Typography>
                </Paper>

                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  💡 Delivery Advice: Speak calmly at ~130 words per minute. Pause for 2 seconds after finishing to invite follow-up questions from the interviewer.
                </Typography>
              </Card>

              {/* STAR Framework Breakdown */}
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
                <Typography variant="h6" fontWeight={800} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>⭐</span> The STAR Methodology Breakdown
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Use this structured breakdown if the interviewer digs deeper into your specific contribution:
                </Typography>

                <Grid container spacing={2}>
                  {[
                    { key: "situation", title: "S - Situation (Context & Need)", text: planData.projectPitch.starFramework?.situation, color: "#2E5E99" },
                    { key: "task", title: "T - Task (Your Responsibility)", text: planData.projectPitch.starFramework?.task, color: "#06b6d4" },
                    { key: "action", title: "A - Action (Technical Execution)", text: planData.projectPitch.starFramework?.action, color: "#10b981" },
                    { key: "result", title: "R - Result (Measurable Impact)", text: planData.projectPitch.starFramework?.result, color: "#ec4899" },
                  ].map((item) => (
                    <Grid size={{ xs: 12, md: 6 }} key={item.key}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.5,
                          borderRadius: 2.5,
                          border: "1px solid",
                          borderColor: "divider",
                          borderTop: `4px solid ${item.color}`,
                          bgcolor: "action.hover",
                          height: "100%",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={800} sx={{ color: item.color, mb: 1 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, whiteSpace: "pre-line" }}>
                          {item.text}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Card>

              {/* Top 5 Anticipated Interviewer Follow-Up Questions with Winning Answers */}
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
                <Typography variant="h6" fontWeight={800} gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>🎯</span> Top 5 Follow-Up Questions Interviewers Will Ask You
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Memorize these answers so you are never caught off-guard during technical drill-downs:
                </Typography>

                <Stack spacing={2}>
                  {planData.projectPitch.anticipatedQuestions?.map((fq, fIdx) => (
                    <Accordion
                      key={fIdx}
                      elevation={0}
                      sx={{
                        borderRadius: 2.5,
                        border: "1px solid",
                        borderColor: "divider",
                        "&::before": { display: "none" },
                        overflow: "hidden",
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle2" fontWeight={800}>
                          {fIdx + 1}. {fq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 2.5, pt: 0, borderTop: "1px solid", borderColor: "divider" }}>
                        <Alert severity="warning" sx={{ mb: 1.5, py: 0.5, borderRadius: 2 }}>
                          <Typography variant="caption" fontWeight={700}>
                            Why Interviewer Asks: {fq.whyAsked}
                          </Typography>
                        </Alert>
                        <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                          WINNING SENIOR-LEVEL RESPONSE:
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                          {fq.modelAnswer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              </Card>
            </Stack>
          )}
        </Box>
      )}

      {/* Interactive Practice Answer Modal */}
      <Dialog
        open={Boolean(practiceQuestion)}
        onClose={() => setPracticeQuestion(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3.5, p: 1 } }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PsychologyIcon color="primary" />
            <Typography variant="h6" fontWeight={800}>
              Practice Interview Answer
            </Typography>
          </Stack>
          <IconButton onClick={() => setPracticeQuestion(null)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 2.5 }}>
          {practiceQuestion && (
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="caption" fontWeight={800} color="text.secondary">
                  QUESTION:
                </Typography>
                <Typography variant="subtitle1" fontWeight={800}>
                  {practiceQuestion.question}
                </Typography>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={5}
                label="Your Spoken Answer Draft"
                placeholder="Draft how you would answer this out loud to the interviewer (e.g. concept, how it works, practical project example, tradeoffs)..."
                value={studentDraft}
                onChange={(e) => setStudentDraft(e.target.value)}
              />

              <Button
                variant="contained"
                onClick={handleEvaluatePractice}
                disabled={evaluating || !studentDraft.trim()}
                startIcon={<SendIcon />}
                sx={{ alignSelf: "flex-start", fontWeight: 800, borderRadius: 2 }}
              >
                {evaluating ? "Evaluating Answer..." : "Analyze My Answer With AI Coach"}
              </Button>

              {aiFeedback && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2.5,
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.04)"),
                    border: "1px solid",
                    borderColor: "primary.main",
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
                    {aiFeedback}
                  </Typography>
                </Paper>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPracticeQuestion(null)} sx={{ fontWeight: 700 }}>
            Done Practicing
          </Button>
        </DialogActions>
      </Dialog>

      {/* Gemini API Key Dialog */}
      <Dialog
        open={keyDialogOpen}
        onClose={() => setKeyDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3.5, p: 1 } }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <KeyIcon color="primary" />
            <Typography variant="h6" fontWeight={800}>
              Google Gemini API Key
            </Typography>
          </Stack>
          <IconButton onClick={() => setKeyDialogOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 2.5 }}>
          <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
            A Gemini API key is completely optional! The YouCan Copilot already includes a comprehensive <strong>100% offline local expert engine</strong>. Adding a key enables live generative AI responses from Gemini 1.5 Flash.
          </Alert>
          <TextField
            fullWidth
            label="Google Gemini API Key"
            placeholder="AIzaSy..."
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            helperText="Stored locally in your browser localStorage only."
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setKeyDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveApiKey} sx={{ fontWeight: 800 }}>
            Save Key
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
