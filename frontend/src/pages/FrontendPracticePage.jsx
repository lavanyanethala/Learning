import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Paper,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import DevicesIcon from "@mui/icons-material/Devices";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CodeIcon from "@mui/icons-material/Code";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  LEVELS,
  getTemplatesByLevel,
  getRandomTemplate,
  getTemplateById,
} from "../utils/templateGenerator";

const HTML5_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Practice</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, sans-serif;
      padding: 20px;
      background: #f8fafc;
      color: #0f172a;
    }
  </style>
</head>
<body>
  
</body>
</html>`;

const VOID_TAGS = new Set(["img", "input", "br", "hr", "meta", "link"]);

const COMMON_TAGS = new Set([
  "div", "p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "button", "a",
  "input", "form", "label", "textarea", "select", "option", "ul", "ol", "li",
  "table", "thead", "tbody", "tr", "th", "td", "header", "footer", "nav",
  "main", "section", "article", "aside", "style", "script", "link", "meta",
  "img", "video", "audio", "iframe", "canvas", "svg", "code", "pre", "b", "i",
  "strong", "em", "small", "hr", "br"
]);

function getEmmetExpansion(abbrev) {
  if (!abbrev) return null;
  const trimmed = abbrev.trim();

  if (trimmed === "!" || trimmed === "!doctype" || trimmed === "html:5") {
    const cursorOffset = HTML5_BOILERPLATE.indexOf("<body>\n  ") + "<body>\n  ".length;
    return { text: HTML5_BOILERPLATE, cursorOffset };
  }

  const lower = trimmed.toLowerCase();
  if (lower === "a") return { text: '<a href="#"></a>', cursorOffset: 9 };
  if (lower === "input") return { text: '<input type="text" placeholder="" />', cursorOffset: 26 };
  if (lower === "img") return { text: '<img src="" alt="" />', cursorOffset: 10 };
  if (lower === "style") return { text: "<style>\n  \n</style>", cursorOffset: 10 };
  if (lower === "script") return { text: "<script>\n  \n</script>", cursorOffset: 11 };
  if (lower === "ul") return { text: "<ul>\n  <li></li>\n</ul>", cursorOffset: 11 };
  if (lower === "ol") return { text: "<ol>\n  <li></li>\n</ol>", cursorOffset: 11 };
  if (lower === "form") return { text: "<form>\n  \n</form>", cursorOffset: 9 };
  if (lower === "table") {
    return {
      text: "<table>\n  <thead>\n    <tr>\n      <th></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td></td>\n    </tr>\n  </tbody>\n</table>",
      cursorOffset: 34,
    };
  }

  if (trimmed.includes(".") || trimmed.includes("#")) {
    const parts = trimmed.split(/([.#][a-zA-Z0-9_-]+)/).filter(Boolean);
    let parsedTag = "div";
    let classes = [];
    let idName = "";

    parts.forEach((p) => {
      if (p.startsWith(".")) {
        classes.push(p.slice(1));
      } else if (p.startsWith("#")) {
        idName = p.slice(1);
      } else if (p) {
        parsedTag = p;
      }
    });

    let attrs = "";
    if (idName) attrs += ` id="${idName}"`;
    if (classes.length > 0) attrs += ` class="${classes.join(" ")}"`;

    const isBlock = ["div", "section", "article", "header", "footer", "nav", "main", "aside"].includes(
      parsedTag.toLowerCase()
    );
    if (isBlock) {
      return {
        text: `<${parsedTag}${attrs}>\n  \n</${parsedTag}>`,
        cursorOffset: `<${parsedTag}${attrs}>\n  `.length,
      };
    }
    return {
      text: `<${parsedTag}${attrs}></${parsedTag}>`,
      cursorOffset: `<${parsedTag}${attrs}>`.length,
    };
  }

  if (COMMON_TAGS.has(lower)) {
    if (VOID_TAGS.has(lower)) {
      const text = `<${lower} />`;
      return { text, cursorOffset: text.length };
    }
    const isBlock = ["div", "section", "article", "header", "footer", "nav", "main", "aside"].includes(lower);
    if (isBlock) {
      return {
        text: `<${lower}>\n  \n</${lower}>`,
        cursorOffset: `<${lower}>\n  `.length,
      };
    }
    return {
      text: `<${lower}></${lower}>`,
      cursorOffset: `<${lower}>`.length,
    };
  }

  return null;
}

const EMPTY_PREVIEW_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, sans-serif;
      color: #94a3b8;
      background: #f8fafc;
      font-size: 14px;
    }
  </style>
</head>
<body>
  No code written yet. Start typing on the right side.
</body>
</html>`;

export default function FrontendPracticePage() {
  const [selectedLevel, setSelectedLevel] = useState("Basic");
  const [template, setTemplate] = useState(() => getRandomTemplate("Basic"));

  // Editor code state
  const [code, setCode] = useState("");
  const [debouncedCode, setDebouncedCode] = useState("");

  // Left panel view: 'template' | 'output' | 'compare'
  const [leftView, setLeftView] = useState("template");
  // Right panel view: 'code' | 'output'
  const [rightView, setRightView] = useState("code");

  const [deviceMode, setDeviceMode] = useState("desktop"); // desktop, tablet, mobile
  const [previewKey, setPreviewKey] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const [solutionDialogOpen, setSolutionDialogOpen] = useState(false);

  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCode(code);
    }, 300);
    return () => clearTimeout(timer);
  }, [code]);

  const availableTemplates = getTemplatesByLevel(selectedLevel);

  const handleLevelChange = (newLevel) => {
    setSelectedLevel(newLevel);
    const next = getRandomTemplate(newLevel);
    setTemplate(next);
    setCode("");
    setDebouncedCode("");
    setPreviewKey((k) => k + 1);
  };

  const handleSelectTemplate = (id) => {
    const selected = getTemplateById(id);
    if (!selected) return;
    setTemplate(selected);
    setCode("");
    setDebouncedCode("");
    setPreviewKey((k) => k + 1);
  };

  const handleRandomizeTemplate = () => {
    const next = getRandomTemplate(selectedLevel, template.id);
    setTemplate(next);
    setCode("");
    setDebouncedCode("");
    setPreviewKey((k) => k + 1);
  };

  const handleClearCode = () => {
    if (code.trim() && !window.confirm("Clear editor code?")) return;
    setCode("");
    setDebouncedCode("");
    setPreviewKey((k) => k + 1);
  };

  const handleInsertSkeleton = () => {
    setCode(HTML5_BOILERPLATE);
    setDebouncedCode(HTML5_BOILERPLATE);
    setPreviewKey((k) => k + 1);
    setToastMsg("Inserted HTML5 boilerplate");
  };

  const handleCopyCode = (textToCopy = code) => {
    navigator.clipboard.writeText(textToCopy);
    setToastMsg("Copied to clipboard");
  };

  const handleDownload = () => {
    const content = code.trim() || "<!DOCTYPE html><html><body></body></html>";
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.id}-solution.html`;
    a.click();
    URL.revokeObjectURL(url);
    setToastMsg("Downloaded HTML file");
  };

  const handleKeyDown = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Shift + 1 shortcut on empty editor
    if (e.key === "!" && code.trim() === "") {
      e.preventDefault();
      setCode(HTML5_BOILERPLATE);
      const cursorOffset = HTML5_BOILERPLATE.indexOf("<body>\n  ") + "<body>\n  ".length;
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = cursorOffset;
        }
      }, 0);
      return;
    }

    // Tab Key -> Emmet Abbreviation or 2-space Indent
    if (e.key === "Tab") {
      e.preventDefault();
      const textBefore = code.substring(0, start);
      const match = textBefore.match(/([a-zA-Z0-9_\-.#:>]|!)+$/);

      if (match) {
        const token = match[1];
        const expansion = getEmmetExpansion(token);
        if (expansion) {
          const tokenStart = start - token.length;
          const newCode = code.substring(0, tokenStart) + expansion.text + code.substring(end);
          setCode(newCode);
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
                tokenStart + expansion.cursorOffset;
              textareaRef.current.focus();
            }
          }, 0);
          return;
        }
      }

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
      return;
    }

    // Enter Key -> Check for ! or auto-indent newline between tags/braces
    if (e.key === "Enter") {
      const textBefore = code.substring(0, start);
      if (textBefore.trimEnd().endsWith("!")) {
        const lastWord = textBefore.match(/!$/);
        if (lastWord) {
          e.preventDefault();
          const tokenStart = start - 1;
          const newCode = code.substring(0, tokenStart) + HTML5_BOILERPLATE + code.substring(end);
          setCode(newCode);
          const cursorOffset = HTML5_BOILERPLATE.indexOf("<body>\n  ") + "<body>\n  ".length;
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = tokenStart + cursorOffset;
            }
          }, 0);
          return;
        }
      }

      if (start === end && start > 0 && start < code.length) {
        const prev = code[start - 1];
        const next = code[start];
        if ((prev === ">" && next === "<") || (prev === "{" && next === "}")) {
          e.preventDefault();
          const newCode = code.substring(0, start) + "\n  \n" + code.substring(end);
          setCode(newCode);
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 3;
            }
          }, 0);
          return;
        }
      }
    }

    // Auto-Closing Tags
    if (e.key === ">") {
      const textBefore = code.substring(0, start);
      const tagMatch = textBefore.match(/<([a-zA-Z][a-zA-Z0-9-]*)([^<>]*)?$/);
      if (tagMatch) {
        const tagName = tagMatch[1].toLowerCase();
        if (!VOID_TAGS.has(tagName) && !tagMatch[0].startsWith("</")) {
          e.preventDefault();
          const closeTag = `></${tagName}>`;
          const newCode = code.substring(0, start) + closeTag + code.substring(end);
          setCode(newCode);
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
            }
          }, 0);
          return;
        }
      }
    }

    // Auto-Closing Pairs
    const PAIRS = {
      '"': '"',
      "'": "'",
      "(": ")",
      "[": "]",
      "{": "}",
    };

    if (PAIRS[e.key] && !e.ctrlKey && !e.altKey && !e.metaKey) {
      const char = e.key;
      const closeChar = PAIRS[char];

      if (start !== end) {
        e.preventDefault();
        const selectedText = code.substring(start, end);
        const newCode = code.substring(0, start) + char + selectedText + closeChar + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = start + 1;
            textareaRef.current.selectionEnd = end + 1;
          }
        }, 0);
        return;
      }

      if (code[start] === char && (char === '"' || char === "'")) {
        e.preventDefault();
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        return;
      }

      e.preventDefault();
      const newCode = code.substring(0, start) + char + closeChar + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
      }, 0);
      return;
    }

    // Backspace Deletion of Empty Pairs
    if (e.key === "Backspace" && start === end && start > 0) {
      const prev = code[start - 1];
      const next = code[start];
      const matchPairs = {
        '"': '"',
        "'": "'",
        "(": ")",
        "[": "]",
        "{": "}",
        ">": "<",
      };
      if (matchPairs[prev] === next) {
        e.preventDefault();
        const newCode = code.substring(0, start - 1) + code.substring(start + 1);
        setCode(newCode);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start - 1;
          }
        }, 0);
      }
    }
  };

  const getDeviceWidth = () => {
    if (deviceMode === "mobile") return "375px";
    if (deviceMode === "tablet") return "768px";
    return "100%";
  };

  const getLevelColor = (level) => {
    if (level === "Basic") return "success";
    if (level === "Moderate") return "warning";
    return "secondary";
  };

  const lineCount = Math.max(1, code.split("\n").length);
  const liveSrcDoc = debouncedCode.trim() ? debouncedCode : EMPTY_PREVIEW_HTML;

  return (
    <Container maxWidth="xl" sx={{ py: 2 }} className="animate-fade-in-up">
      {/* Top Header Toolbar - Clean, concise without extra text */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 1.5,
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#131b2e" : "#ffffff"),
        }}
      >
        {/* Challenge Selection Controls */}
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="level-label">Level</InputLabel>
            <Select
              labelId="level-label"
              value={selectedLevel}
              label="Level"
              onChange={(e) => handleLevelChange(e.target.value)}
            >
              {["All", ...LEVELS].map((lvl) => (
                <MenuItem key={lvl} value={lvl}>
                  {lvl}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 260 }}>
            <InputLabel id="challenge-label">Template</InputLabel>
            <Select
              labelId="challenge-label"
              value={template.id}
              label="Template"
              onChange={(e) => handleSelectTemplate(e.target.value)}
            >
              {availableTemplates.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      size="small"
                      label={t.difficulty}
                      color={getLevelColor(t.difficulty)}
                      sx={{ height: 18, fontSize: "0.68rem" }}
                    />
                    <span>{t.name}</span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            size="small"
            variant="outlined"
            startIcon={<CasinoIcon />}
            onClick={handleRandomizeTemplate}
            sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
          >
            Random
          </Button>

          <Chip
            label={`${template.difficulty} • ${template.category}`}
            size="small"
            color={getLevelColor(template.difficulty)}
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Stack>

        {/* Global Action Buttons */}
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PlayArrowIcon />}
            onClick={() => {
              setDebouncedCode(code);
              setPreviewKey((k) => k + 1);
              setToastMsg("Output updated");
            }}
            sx={{ fontWeight: 700 }}
          >
            Run
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<PostAddIcon />}
            onClick={handleInsertSkeleton}
          >
            Boilerplate
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleClearCode}
          >
            Clear
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<VisibilityIcon />}
            onClick={() => setSolutionDialogOpen(true)}
          >
            Solution
          </Button>

          <Tooltip title="Copy Code">
            <IconButton size="small" onClick={() => handleCopyCode(code)}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download HTML">
            <IconButton size="small" onClick={handleDownload}>
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Paper>

      {/* Main Split-Screen Workspace: One Side Template, Another Side Write Code */}
      <Grid container spacing={2}>
        {/* SIDE 1: TEMPLATE */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 210px)",
              minHeight: 560,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* Template Card Header */}
            <Box
              sx={{
                px: 2,
                py: 1,
                bgcolor: (theme) => (theme.palette.mode === "dark" ? "#1e293b" : "#f1f5f9"),
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2" fontWeight={700}>
                  Template
                </Typography>
                <ToggleButtonGroup
                  size="small"
                  value={leftView}
                  exclusive
                  onChange={(e, val) => {
                    if (val) setLeftView(val);
                  }}
                  sx={{ height: 26 }}
                >
                  <ToggleButton value="template" sx={{ px: 1, py: 0, fontSize: "0.75rem", fontWeight: 600 }}>
                    Template
                  </ToggleButton>
                  <ToggleButton value="output" sx={{ px: 1, py: 0, fontSize: "0.75rem", fontWeight: 600 }}>
                    My Output
                  </ToggleButton>
                  <ToggleButton value="compare" sx={{ px: 1, py: 0, fontSize: "0.75rem", fontWeight: 600 }}>
                    Compare
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>

              {/* Viewport size buttons */}
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Tooltip title="Desktop view">
                  <IconButton
                    size="small"
                    color={deviceMode === "desktop" ? "primary" : "default"}
                    onClick={() => setDeviceMode("desktop")}
                  >
                    <DevicesIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Tablet view (768px)">
                  <IconButton
                    size="small"
                    color={deviceMode === "tablet" ? "primary" : "default"}
                    onClick={() => setDeviceMode("tablet")}
                  >
                    <TabletMacIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Mobile view (375px)">
                  <IconButton
                    size="small"
                    color={deviceMode === "mobile" ? "primary" : "default"}
                    onClick={() => setDeviceMode("mobile")}
                  >
                    <SmartphoneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>

            {/* Template Render Area */}
            {leftView === "compare" ? (
              // Compare Split: Template on top, Output on bottom
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", borderBottom: "1px solid", borderColor: "divider", minHeight: 0 }}>
                  <Box sx={{ px: 1.5, py: 0.3, bgcolor: "action.hover", fontSize: "0.72rem", fontWeight: 600, color: "text.secondary" }}>
                    Target Template
                  </Box>
                  <Box sx={{ flex: 1, display: "flex", justifyContent: "center", bgcolor: "#fff", overflow: "hidden" }}>
                    <Box sx={{ width: getDeviceWidth(), height: "100%", transition: "width 0.2s" }}>
                      <iframe
                        srcDoc={template.targetHtml}
                        title="Template Target"
                        sandbox="allow-scripts allow-modals"
                        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
                  <Box sx={{ px: 1.5, py: 0.3, bgcolor: "action.hover", fontSize: "0.72rem", fontWeight: 600, color: "text.secondary" }}>
                    My Output
                  </Box>
                  <Box sx={{ flex: 1, display: "flex", justifyContent: "center", bgcolor: "#fff", overflow: "hidden" }}>
                    <Box sx={{ width: getDeviceWidth(), height: "100%", transition: "width 0.2s" }}>
                      <iframe
                        key={`${previewKey}-compare-output`}
                        srcDoc={liveSrcDoc}
                        title="My Code Output"
                        sandbox="allow-scripts allow-modals"
                        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              // Single full view: Template or Output
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "stretch",
                  bgcolor: (theme) => (theme.palette.mode === "dark" ? "#090d16" : "#e2e8f0"),
                  overflow: "hidden",
                  p: deviceMode === "desktop" ? 0 : 2,
                }}
              >
                <Box
                  sx={{
                    width: getDeviceWidth(),
                    height: "100%",
                    bgcolor: "#fff",
                    borderRadius: deviceMode === "desktop" ? 0 : 2,
                    boxShadow: deviceMode === "desktop" ? "none" : "0 4px 14px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    transition: "width 0.2s ease-in-out",
                  }}
                >
                  <iframe
                    key={`${previewKey}-${leftView}`}
                    srcDoc={leftView === "output" ? liveSrcDoc : template.targetHtml}
                    title="Template View"
                    sandbox="allow-scripts allow-modals"
                    style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  />
                </Box>
              </Box>
            )}
          </Card>
        </Grid>

        {/* SIDE 2: WRITE THE CODE */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100vh - 210px)",
              minHeight: 560,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* Editor Header */}
            <Box
              sx={{
                px: 2,
                py: 1,
                bgcolor: (theme) => (theme.palette.mode === "dark" ? "#1e293b" : "#f1f5f9"),
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2" fontWeight={700}>
                  Write Code
                </Typography>
                <ToggleButtonGroup
                  size="small"
                  value={rightView}
                  exclusive
                  onChange={(e, val) => {
                    if (val) setRightView(val);
                  }}
                  sx={{ height: 26 }}
                >
                  <ToggleButton value="code" sx={{ px: 1, py: 0, fontSize: "0.75rem", fontWeight: 600 }}>
                    Editor
                  </ToggleButton>
                  <ToggleButton value="output" sx={{ px: 1, py: 0, fontSize: "0.75rem", fontWeight: 600 }}>
                    Live Preview
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>

              <Typography variant="caption" color="text.secondary">
                {lineCount} lines &bull; {code.length} chars
              </Typography>
            </Box>

            {/* Editor Body or Live Preview */}
            {rightView === "code" ? (
              <Box sx={{ flex: 1, display: "flex", position: "relative", overflow: "hidden" }}>
                {/* Line Numbers Gutter */}
                <Box
                  ref={lineNumbersRef}
                  sx={{
                    width: 44,
                    py: "16px",
                    px: "6px",
                    textAlign: "right",
                    userSelect: "none",
                    bgcolor: (theme) => (theme.palette.mode === "dark" ? "#0b1120" : "#f8fafc"),
                    color: "text.disabled",
                    fontFamily: '"JetBrains Mono", Consolas, monospace',
                    fontSize: "13.5px",
                    lineHeight: "1.5",
                    overflowY: "hidden",
                    borderRight: "1px solid",
                    borderColor: "divider",
                    flexShrink: 0,
                  }}
                >
                  {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i + 1}>{i + 1}</div>
                  ))}
                </Box>

                {/* Textarea Code Input */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={handleScroll}
                  onKeyDown={handleKeyDown}
                  spellCheck="false"
                  placeholder="<!-- Type your HTML & CSS here to replicate the template on the left... -->"
                  style={{
                    flex: 1,
                    width: "100%",
                    resize: "none",
                    border: "none",
                    outline: "none",
                    padding: "16px",
                    fontFamily: '"JetBrains Mono", Consolas, monospace',
                    fontSize: "13.5px",
                    lineHeight: "1.5",
                    backgroundColor: "transparent",
                    color: "inherit",
                    boxSizing: "border-box",
                    whiteSpace: "pre",
                    overflowWrap: "normal",
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ flex: 1, display: "flex", bgcolor: "#fff", overflow: "hidden" }}>
                <iframe
                  key={`${previewKey}-right-preview`}
                  srcDoc={liveSrcDoc}
                  title="My Live Output"
                  sandbox="allow-scripts allow-modals"
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Solution Dialog */}
      <Dialog
        open={solutionDialogOpen}
        onClose={() => setSolutionDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Reference Solution: {template.name}</span>
          <Chip label={`${template.difficulty} Level`} color={getLevelColor(template.difficulty)} size="small" />
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="pre"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: (theme) => (theme.palette.mode === "dark" ? "#0f172a" : "#f1f5f9"),
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12.5px",
              overflowX: "auto",
              maxHeight: "450px",
              color: "text.primary",
            }}
          >
            {template.targetHtml}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSolutionDialogOpen(false)}>Close</Button>
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() => handleCopyCode(template.targetHtml)}
          >
            Copy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCode(template.targetHtml);
              setDebouncedCode(template.targetHtml);
              setPreviewKey((k) => k + 1);
              setSolutionDialogOpen(false);
              setToastMsg("Solution loaded into editor");
            }}
          >
            Load into Editor
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Feedback */}
      <Snackbar
        open={Boolean(toastMsg)}
        autoHideDuration={2500}
        onClose={() => setToastMsg("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="info" onClose={() => setToastMsg("")} sx={{ borderRadius: 2 }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
