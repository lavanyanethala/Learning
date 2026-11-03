import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  IconButton,
  Chip,
  Stack,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import KeyIcon from "@mui/icons-material/Key";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { aiService } from "../services/aiService";

export default function AICoachDialog({ open, onClose, questionItem }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [blueprint, setBlueprint] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");
  const [studentDraft, setStudentDraft] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(aiService.getApiKey());
  const [keySavedMsg, setKeySavedMsg] = useState(false);

  useEffect(() => {
    if (open && questionItem) {
      loadInitialData();
    }
  }, [open, questionItem]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const bp = await aiService.getAnswerBlueprint(
        questionItem.question,
        questionItem.category
      );
      setBlueprint(bp);

      const ma = await aiService.generateModelAnswer(
        questionItem.question,
        questionItem.category,
        questionItem.answer
      );
      setModelAnswer(ma);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!studentDraft.trim()) return;
    setEvaluating(true);
    try {
      const res = await aiService.evaluateStudentAnswer(
        questionItem.question,
        studentDraft,
        questionItem.category
      );
      setEvaluation(res);
    } catch (err) {
      console.error(err);
      setEvaluation("Failed to evaluate answer. Please try again.");
    } finally {
      setEvaluating(false);
    }
  };

  const handleSaveApiKey = () => {
    aiService.setApiKey(apiKeyInput);
    setKeySavedMsg(true);
    setTimeout(() => setKeySavedMsg(false), 3000);
    setShowKeyConfig(false);
    loadInitialData();
  };

  if (!questionItem) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 2.5,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1e1e38 0%, #171d34 100%)"
              : "linear-gradient(135deg, #eef2ff 0%, #f0fdfa 100%)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2,
                bgcolor: "primary.main",
                color: "#fff",
                display: "flex",
              }}
            >
              <PsychologyIcon fontSize="medium" />
            </Box>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  AI Interview Coach
                </Typography>
                <Chip
                  icon={<AutoAwesomeIcon sx={{ fontSize: "14px !important" }} />}
                  label="AI Active"
                  size="small"
                  color="secondary"
                  className="animate-pulse-glow"
                  sx={{ fontWeight: 700 }}
                />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                Question: <strong>{questionItem.question}</strong>
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            <IconButton
              size="small"
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              title="Configure Gemini API Key"
              color={aiService.getApiKey() ? "primary" : "default"}
            >
              <KeyIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {showKeyConfig && (
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 2,
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Google Gemini API Key (Optional)
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1.5 }}>
              By default, the AI Coach uses a built-in expert engine. You can also provide a Gemini API
              key to connect live to Gemini 1.5 Flash.
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                fullWidth
                placeholder="AIzaSy..."
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                type="password"
              />
              <Button variant="contained" size="small" onClick={handleSaveApiKey}>
                Save Key
              </Button>
            </Stack>
            {keySavedMsg && (
              <Typography variant="caption" color="success.main" sx={{ mt: 1, display: "block" }}>
                API key saved successfully!
              </Typography>
            )}
          </Paper>
        )}
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2, bgcolor: "background.paper" }}>
        <Tabs
          value={tabIndex}
          onChange={(e, val) => setTabIndex(val)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<AutoAwesomeIcon />} iconPosition="start" label="1. Answer Strategy" />
          <Tab icon={<SendIcon />} iconPosition="start" label="2. Practice My Answer" />
          <Tab icon={<CheckCircleOutlinedIcon />} iconPosition="start" label="3. Senior Model Answer" />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 3, flex: 1, overflowY: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 8 }}>
            <CircularProgress size={40} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Consulting AI Interview Coach...
            </Typography>
          </Box>
        ) : (
          <>
            {/* TAB 0: ANSWER STRATEGY */}
            {tabIndex === 0 && (
              <Box>
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                  Use this blueprint to structure your response systematically when interviewers ask this
                  question.
                </Alert>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: "background.default",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    "& h3": { fontSize: "1.2rem", fontWeight: 700, mb: 1.5, color: "primary.main" },
                    "& h4": { fontSize: "1rem", fontWeight: 600, mt: 2, mb: 1 },
                    "& p": { mb: 1.5, lineHeight: 1.6 },
                    "& ul, & ol": { pl: 3, mb: 2 },
                    "& li": { mb: 0.8 },
                    "& code": {
                      bgcolor: "action.hover",
                      px: 0.8,
                      py: 0.3,
                      borderRadius: 1,
                      fontFamily: '"JetBrains Mono", monospace',
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: blueprint
                      .replace(/### (.*?)\n/g, "<h3>$1</h3>")
                      .replace(/#### (.*?)\n/g, "<h4>$1</h4>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>")
                      .replace(/`(.*?)`/g, "<code>$1</code>")
                      .replace(/\n\n/g, "<br/><br/>"),
                  }}
                />
              </Box>
            )}

            {/* TAB 1: PRACTICE MY ANSWER */}
            {tabIndex === 1 && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Draft Your Response
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Type your attempt below. The AI coach will evaluate your technical precision, identify
                  missing architectural concepts, and provide an upgraded version.
                </Typography>

                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  placeholder="e.g., In React, reconciliation is the algorithm used to diff the virtual DOM trees..."
                  value={studentDraft}
                  onChange={(e) => setStudentDraft(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={evaluating ? <CircularProgress size={18} color="inherit" /> : <AutoAwesomeIcon />}
                  disabled={evaluating || !studentDraft.trim()}
                  onClick={handleEvaluate}
                  sx={{ mb: 3 }}
                >
                  {evaluating ? "Evaluating Your Answer..." : "Analyze My Answer"}
                </Button>

                {evaluation && (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      bgcolor: "background.default",
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "secondary.main",
                      "& h3": { fontSize: "1.2rem", fontWeight: 700, mb: 1.5, color: "secondary.main" },
                      "& h4": { fontSize: "1rem", fontWeight: 600, mt: 2, mb: 1 },
                      "& blockquote": {
                        borderLeft: "4px solid",
                        borderColor: "primary.main",
                        pl: 2,
                        py: 1,
                        my: 2,
                        fontStyle: "italic",
                        bgcolor: "action.hover",
                        borderRadius: "0 8px 8px 0",
                      },
                      "& p": { mb: 1.5, lineHeight: 1.6 },
                      "& ul": { pl: 3, mb: 2 },
                      "& li": { mb: 0.8 },
                    }}
                    dangerouslySetInnerHTML={{
                      __html: evaluation
                        .replace(/### (.*?)\n/g, "<h3>$1</h3>")
                        .replace(/#### (.*?)\n/g, "<h4>$1</h4>")
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/> "(.*?)"/g, "<blockquote>\"$1\"</blockquote>")
                        .replace(/\n\n/g, "<br/><br/>"),
                    }}
                  />
                )}
              </Box>
            )}

            {/* TAB 2: SENIOR MODEL ANSWER */}
            {tabIndex === 2 && (
              <Box>
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  Here is an exemplary, battle-tested answer tailored to impress technical hiring managers.
                </Alert>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: "background.default",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    "& h3": { fontSize: "1.2rem", fontWeight: 700, mb: 1.5, color: "primary.main" },
                    "& h4": { fontSize: "1rem", fontWeight: 600, mt: 2, mb: 1 },
                    "& blockquote": {
                      borderLeft: "4px solid",
                      borderColor: "success.main",
                      pl: 2,
                      py: 1,
                      my: 2,
                      fontStyle: "italic",
                      bgcolor: "action.hover",
                      borderRadius: "0 8px 8px 0",
                    },
                    "& p": { mb: 1.5, lineHeight: 1.6 },
                    "& ul, & ol": { pl: 3, mb: 2 },
                    "& li": { mb: 0.8 },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: modelAnswer
                      .replace(/### (.*?)\n/g, "<h3>$1</h3>")
                      .replace(/#### (.*?)\n/g, "<h4>$1</h4>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/> "(.*?)"/g, "<blockquote>\"$1\"</blockquote>")
                      .replace(/\n\n/g, "<br/><br/>"),
                  }}
                />
              </Box>
            )}
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid", borderColor: "divider" }}>
        <Button onClick={loadInitialData} startIcon={<RefreshIcon />} size="small" sx={{ mr: "auto" }}>
          Regenerate AI Tips
        </Button>
        <Button onClick={onClose} variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
