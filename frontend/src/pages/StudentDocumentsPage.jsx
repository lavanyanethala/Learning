import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  IconButton,
  InputAdornment,
  Alert,
  Paper,
  Tooltip,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { api } from "../services/api";
import FileViewerDialog from "../components/FileViewerDialog";

export default function StudentDocumentsPage({ user }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Upload Dialog State
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("file"); // 'file' | 'drive'
  const [driveUrl, setDriveUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Preview Dialog State
  const [viewingDoc, setViewingDoc] = useState(null);

  const studentUsername = user?.username || "Student";

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getStudentDocuments(studentUsername);
      // Ensure only this student's individual documents are displayed
      const personalDocs = (data || []).filter(
        (doc) =>
          !doc.uploadedBy ||
          doc.uploadedBy.toLowerCase() === studentUsername.toLowerCase()
      );
      setDocuments(personalDocs);
    } catch (err) {
      console.error("Failed to load documents", err);
    } finally {
      setLoading(false);
    }
  }, [studentUsername]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Auto-fill title with filename (without extension) if title is currently empty
      if (!title.trim()) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setTitle(nameWithoutExt);
      }
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Please enter a document name.");
      return;
    }
    if (docType === "file" && !selectedFile) {
      setErrorMsg("Please choose a file to upload.");
      return;
    }
    if (docType === "drive" && !driveUrl.trim()) {
      setErrorMsg("Please enter a link to your document or Google Drive.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("subject", "General");
      formData.append("description", "");
      formData.append("documentType", docType);
      formData.append("uploadedBy", studentUsername);

      if (docType === "file" && selectedFile) {
        formData.append("file", selectedFile);
      } else if (docType === "drive") {
        formData.append("driveUrl", driveUrl.trim());
      }

      await api.uploadStudentDocument(formData);
      // Reset form
      setTitle("");
      setSelectedFile(null);
      setDriveUrl("");
      setUploadDialogOpen(false);
      fetchDocuments();
    } catch (err) {
      setErrorMsg(err.message || "Failed to upload document");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this document?")) return;
    try {
      await api.deleteStudentDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      alert("Failed to delete document: " + err.message);
    }
  };

  const getFormatIcon = (doc) => {
    if (doc.documentType === "drive") {
      return <AddToDriveIcon sx={{ color: "#f59e0b", fontSize: 24 }} />;
    }
    const fmt = doc.file?.format;
    if (fmt === "pdf") return <PictureAsPdfIcon sx={{ color: "#ef4444", fontSize: 24 }} />;
    if (fmt === "image") return <ImageIcon sx={{ color: "#3b82f6", fontSize: 24 }} />;
    return <DescriptionIcon sx={{ color: "#10b981", fontSize: 24 }} />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredDocuments = documents.filter((doc) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      doc.title?.toLowerCase().includes(q) ||
      doc.file?.fileName?.toLowerCase().includes(q)
    );
  });

  return (
    <Container maxWidth="xl" sx={{ py: 3.5 }}>
      {/* Simple, Clean Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="h5" fontWeight={800}>
            My Documents
          </Typography>
          <Chip
            label={`${documents.length} ${documents.length === 1 ? "file" : "files"}`}
            size="small"
            sx={{ fontWeight: 700, borderRadius: 1.5 }}
          />
        </Stack>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setErrorMsg("");
            setTitle("");
            setSelectedFile(null);
            setDriveUrl("");
            setUploadDialogOpen(true);
          }}
          sx={{ fontWeight: 700, borderRadius: 2, px: 2.2 }}
        >
          Upload Document
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search documents by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 420,
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Document List / Grid */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <CircularProgress size={32} />
        </Box>
      ) : filteredDocuments.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            py: 7,
            px: 3,
            textAlign: "center",
            borderRadius: 3,
            border: "1px dashed",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <FolderOpenIcon sx={{ fontSize: 48, color: "text.secondary", opacity: 0.6, mb: 1.5 }} />
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            {documents.length === 0 ? "No personal documents uploaded" : "No documents match your search"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            {documents.length === 0
              ? "Store your personal notes, study PDFs, images, or links here."
              : "Try searching with a different filename."}
          </Typography>
          {documents.length === 0 && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                setErrorMsg("");
                setUploadDialogOpen(true);
              }}
              sx={{ fontWeight: 700, borderRadius: 2 }}
            >
              Upload Document
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {filteredDocuments.map((doc) => {
            const isDrive = doc.documentType === "drive";
            const file = doc.file;
            const uploadDate = doc.createdAt
              ? new Date(doc.createdAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={doc.id}>
                <Card
                  elevation={0}
                  onClick={() => setViewingDoc(doc)}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.15s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
                    },
                  }}
                >
                  <Box>
                    {/* Top Row: Icon + Delete */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: 2,
                          bgcolor: (theme) =>
                            theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {getFormatIcon(doc)}
                      </Box>

                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="default"
                          onClick={(e) => handleDelete(doc.id, e)}
                          sx={{
                            "&:hover": { color: "error.main" },
                          }}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Document Title */}
                    <Typography variant="subtitle2" fontWeight={800} noWrap title={doc.title}>
                      {doc.title}
                    </Typography>

                    {/* File name or link */}
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      display="block"
                      sx={{ mt: 0.3 }}
                      title={isDrive ? doc.driveUrl : file?.fileName}
                    >
                      {isDrive ? "External Cloud Link" : file?.fileName || "File"}
                    </Typography>
                  </Box>

                  {/* Bottom Row: Metadata & Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: 2,
                      pt: 1.5,
                      borderTop: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {isDrive
                        ? uploadDate
                        : `${uploadDate ? uploadDate + " • " : ""}${formatFileSize(file?.fileSize)}`}
                    </Typography>

                    <Stack direction="row" spacing={0.5} onClick={(e) => e.stopPropagation()}>
                      <Tooltip title={isDrive ? "Open Link" : "Preview"}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => setViewingDoc(doc)}
                        >
                          {isDrive ? <OpenInNewIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                        </IconButton>
                      </Tooltip>

                      {!isDrive && file?.fileUrl && (
                        <Tooltip title="Download">
                          <IconButton
                            size="small"
                            color="inherit"
                            href={file.fileUrl}
                            download={file.fileName}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Simple Upload Modal */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => !submitting && setUploadDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" fontWeight={800}>
            Upload Document
          </Typography>
          <IconButton onClick={() => setUploadDialogOpen(false)} size="small" disabled={submitting}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleUploadSubmit}>
          <DialogContent dividers sx={{ p: 2.5 }}>
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 2, py: 0.5 }}>
                {errorMsg}
              </Alert>
            )}

            <Stack spacing={2}>
              {/* Type Selection */}
              <RadioGroup
                row
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                name="docType"
              >
                <FormControlLabel
                  value="file"
                  control={<Radio size="small" />}
                  label={<Typography variant="body2" fontWeight={600}>File (PDF, Doc, Image)</Typography>}
                  disabled={submitting}
                />
                <FormControlLabel
                  value="drive"
                  control={<Radio size="small" />}
                  label={<Typography variant="body2" fontWeight={600}>Drive / URL Link</Typography>}
                  disabled={submitting}
                />
              </RadioGroup>

              {/* File Upload Picker */}
              {docType === "file" && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    border: "2px dashed",
                    borderColor: selectedFile ? "primary.main" : "divider",
                    borderRadius: 2,
                    textAlign: "center",
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                  }}
                >
                  <UploadFileIcon sx={{ fontSize: 36, color: selectedFile ? "primary.main" : "text.secondary", mb: 0.5 }} />
                  <Typography variant="body2" fontWeight={700} noWrap sx={{ px: 1 }}>
                    {selectedFile ? selectedFile.name : "Select a document to upload"}
                  </Typography>
                  {selectedFile && (
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                      {formatFileSize(selectedFile.size)}
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    component="label"
                    size="small"
                    disabled={submitting}
                    sx={{ mt: 1, borderRadius: 1.5, fontWeight: 700 }}
                  >
                    {selectedFile ? "Change File" : "Choose File"}
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Paper>
              )}

              {/* Drive Link Input */}
              {docType === "drive" && (
                <TextField
                  fullWidth
                  size="small"
                  label="Document Link / Google Drive URL"
                  placeholder="https://..."
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  disabled={submitting}
                />
              )}

              {/* Document Title */}
              <TextField
                fullWidth
                size="small"
                required
                label="Document Name"
                placeholder="e.g. My Resume, React Notes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setUploadDialogOpen(false)} disabled={submitting} size="small">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              size="small"
              sx={{ fontWeight: 700, borderRadius: 1.5, px: 2.5 }}
            >
              {submitting ? "Uploading..." : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Built-in File Viewer Dialog */}
      <FileViewerDialog
        open={Boolean(viewingDoc)}
        onClose={() => setViewingDoc(null)}
        note={viewingDoc}
      />
    </Container>
  );
}
