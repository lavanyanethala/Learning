import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";

export default function FileViewerDialog({ open, onClose, note }) {
  if (!note) return null;

  const isDrive = note.noteType === "drive" || note.attachmentType === "drive" || Boolean(note.driveUrl);
  const file = note.file;
  const format = file ? file.format : isDrive ? "drive" : "unknown";
  const itemTitle = note.title || note.question || "Attachment";
  const itemBadge = note.subject || note.category || "";
  const itemDateOrDiff = note.date || note.difficulty || "";
  const itemDetails = note.description || note.answer || "";

  const getFormatIcon = () => {
    if (isDrive) return <AddToDriveIcon color="warning" />;
    if (format === "pdf") return <PictureAsPdfIcon color="error" />;
    if (format === "image") return <ImageIcon color="primary" />;
    return <DescriptionIcon color="secondary" />;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: format === "pdf" || format === "image" ? "80vh" : "auto",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ overflow: "hidden" }}>
          {getFormatIcon()}
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
              {itemTitle}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              {itemDateOrDiff && <Chip size="small" label={itemDateOrDiff} variant="outlined" />}
              {itemBadge && <Chip size="small" label={itemBadge} color="primary" variant="outlined" />}
              {isDrive && <Chip size="small" label="Google Drive Link" color="warning" />}
            </Stack>
          </Box>
        </Stack>
        <IconButton onClick={onClose} aria-label="close" size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2, display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
        {itemDetails && (
          <Box sx={{ mb: 2, p: 2, bgcolor: "background.paper", borderRadius: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {note.question ? "Interview Answer / Notes:" : "Trainer Instructions / Description:"}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {itemDetails}
            </Typography>
          </Box>
        )}

        {/* Content Viewer depending on type */}
        {isDrive && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <AddToDriveIcon sx={{ fontSize: 64, color: "warning.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              External Google Drive Document
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This resource is hosted on Google Drive or an external cloud workspace.
            </Typography>
            <Button
              variant="contained"
              color="warning"
              size="large"
              startIcon={<OpenInNewIcon />}
              href={note.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Drive
            </Button>
          </Box>
        )}

        {!isDrive && file && format === "image" && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 2,
              overflow: "auto",
            }}
          >
            <img
              src={file.fileUrl}
              alt={file.fileName}
              style={{
                maxWidth: "100%",
                maxHeight: "65vh",
                objectFit: "contain",
                borderRadius: 8,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        )}

        {!isDrive && file && format === "pdf" && (
          <Box sx={{ flex: 1, height: "65vh", borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
            <iframe
              src={file.fileUrl}
              title={file.fileName}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </Box>
        )}

        {!isDrive && file && format === "document" && (
          <Box sx={{ textAlign: "center", py: 6, bgcolor: "background.paper", borderRadius: 2 }}>
            <DescriptionIcon sx={{ fontSize: 64, color: "secondary.main", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {file.fileName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              File Size: {(file.fileSize / 1024).toFixed(1)} KB &bull; Type: Document
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<DownloadIcon />}
              href={file.fileUrl}
              download={file.fileName}
            >
              Download Document
            </Button>
          </Box>
        )}

        {!isDrive && !file && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">No attachment attached to this note.</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {!isDrive && file && (
          <Button
            startIcon={<DownloadIcon />}
            href={file.fileUrl}
            download={file.fileName}
            variant="outlined"
            size="small"
          >
            Download File
          </Button>
        )}
        {isDrive && (
          <Button
            startIcon={<OpenInNewIcon />}
            href={note.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
          >
            Open Link
          </Button>
        )}
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
