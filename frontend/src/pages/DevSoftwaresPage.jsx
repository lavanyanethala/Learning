import React, { useState, useMemo } from "react";
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
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Tooltip,
} from "@mui/material";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import TerminalIcon from "@mui/icons-material/Terminal";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import AppleIcon from "@mui/icons-material/Apple";
import ComputerIcon from "@mui/icons-material/Computer";

import { SOFTWARE_CATEGORIES, SOFTWARE_LIST } from "../data/softwareData";
import { renderSoftwareIcon } from "../components/BrandIcons";

export default function DevSoftwaresPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [os, setOs] = useState("windows");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredSoftwares = useMemo(() => {
    return SOFTWARE_LIST.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Top Header Row: Title & OS Switcher */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={850} sx={{ letterSpacing: "-0.02em" }}>
            Developer Tools & Softwares
          </Typography>
        </Box>

        {/* OS Switcher */}
        <ToggleButtonGroup
          value={os}
          exclusive
          onChange={(e, newOs) => {
            if (newOs) setOs(newOs);
          }}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              borderRadius: 2,
              px: 1.8,
              py: 0.6,
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "none",
              gap: 0.8,
              "&.Mui-selected": {
                bgcolor: "#2E5E99",
                color: "#fff",
                "&:hover": { bgcolor: "#1D406E" },
              },
            },
          }}
        >
          <ToggleButton value="windows">
            <LaptopWindowsIcon fontSize="small" /> Windows
          </ToggleButton>
          <ToggleButton value="mac">
            <AppleIcon fontSize="small" /> macOS
          </ToggleButton>
          <ToggleButton value="linux">
            <ComputerIcon fontSize="small" /> Linux
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Filter Chips & Search Bar Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Category Pills */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {SOFTWARE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === "all"
                ? SOFTWARE_LIST.length
                : SOFTWARE_LIST.filter((s) => s.category === cat.id).length;
            return (
              <Chip
                key={cat.id}
                label={`${cat.label} (${count})`}
                onClick={() => setSelectedCategory(cat.id)}
                variant={isSelected ? "filled" : "outlined"}
                sx={{
                  fontWeight: 750,
                  fontSize: "0.8rem",
                  borderRadius: 9999,
                  cursor: "pointer",
                  ...(isSelected
                    ? {
                        bgcolor: "#2E5E99",
                        color: "#fff",
                        "&:hover": { bgcolor: "#1D406E" },
                      }
                    : {
                        borderColor: "divider",
                      }),
                }}
              />
            );
          })}
        </Stack>

        {/* Quick Search */}
        <TextField
          size="small"
          placeholder="Search software..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: { xs: "100%", md: 260 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 9999,
            },
          }}
        />
      </Box>

      {/* Clean Software Cards Grid */}
      <Grid container spacing={2.5}>
        {filteredSoftwares.map((software) => {
          const download = software.downloads[os] || software.downloads.windows;
          const isCopied = copiedId === software.id;

          return (
            <Grid key={software.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                elevation={0}
                className="interactive-card"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3.5,
                  border: "1px solid",
                  borderColor: "divider",
                  p: 2.5,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#2E5E99",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(46, 94, 153, 0.16)",
                  },
                }}
              >
                <CardContent sx={{ p: 0, flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Top Row: Icon, Name & Version */}
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(15,23,42,0.05)",
                        border: "1px solid",
                        borderColor: "divider",
                        flexShrink: 0,
                      }}
                    >
                      {renderSoftwareIcon(software.id, 26)}
                    </Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight={800} noWrap>
                        {software.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {software.version}
                      </Typography>
                    </Box>
                    <Chip
                      label={software.badge}
                      size="small"
                      sx={{
                        fontWeight: 750,
                        fontSize: "0.68rem",
                        height: 22,
                        borderRadius: 1.5,
                      }}
                    />
                  </Stack>

                  {/* Tagline */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, fontSize: "0.82rem", lineHeight: 1.4 }}
                  >
                    {software.tagline}
                  </Typography>

                  {/* CLI Terminal Command Box */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      px: 1.4,
                      borderRadius: 2,
                      bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                          ? "rgba(0, 0, 0, 0.4)"
                          : "rgba(15, 23, 42, 0.05)",
                      border: "1px solid",
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                      mb: 2,
                      mt: "auto",
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
                      <TerminalIcon sx={{ fontSize: 16, color: "text.secondary", flexShrink: 0 }} />
                      <Typography
                        variant="caption"
                        sx={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {download.cmd}
                      </Typography>
                    </Stack>
                    <Tooltip title={isCopied ? "Copied!" : "Copy command"}>
                      <IconButton
                        size="small"
                        onClick={() => handleCopy(download.cmd, software.id)}
                        sx={{
                          color: isCopied ? "success.main" : "text.secondary",
                          p: 0.4,
                          flexShrink: 0,
                        }}
                      >
                        {isCopied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </Paper>

                  {/* Actions: Direct Download Button & Website Link */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      href={download.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontWeight: 750,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "0.82rem",
                        py: 0.8,
                        bgcolor: "#2E5E99",
                        color: "#fff",
                        "&:hover": { bgcolor: "#1D406E" },
                      }}
                    >
                      Download Installer
                    </Button>
                    <Tooltip title="Official Website">
                      <IconButton
                        href={software.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          p: 0.8,
                        }}
                      >
                        <OpenInNewIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
