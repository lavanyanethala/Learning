import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, "db.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Ensure db.json exists with clean structure (no dummy data)
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify({ notes: [], interviewQuestions: [], studentDocuments: [] }, null, 2),
    "utf-8"
  );
}

// Helpers to read/write DB
function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const data = JSON.parse(raw);
    return {
      notes: data.notes || [],
      interviewQuestions: data.interviewQuestions || [],
      studentDocuments: data.studentDocuments || [],
    };
  } catch (err) {
    console.error("Error reading db.json:", err);
    return { notes: [], interviewQuestions: [], studentDocuments: [] };
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing db.json:", err);
    return false;
  }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOADS_DIR));

// Multer storage configuration for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    cb(null, `${base}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
});

// Helper to determine file category
function determineFileType(ext, mimeType) {
  ext = (ext || "").toLowerCase();
  mimeType = (mimeType || "").toLowerCase();

  if (ext === ".pdf" || mimeType.includes("pdf")) return "pdf";
  if (
    [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp"].includes(ext) ||
    mimeType.startsWith("image/")
  )
    return "image";
  if (
    [".doc", ".docx", ".txt", ".rtf", ".odt", ".md", ".ppt", ".pptx", ".xls", ".xlsx"].includes(ext) ||
    mimeType.includes("document") ||
    mimeType.includes("word") ||
    mimeType.includes("text")
  )
    return "document";
  return "other";
}

// --- Routes: Health Check ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- Routes: Authentication ---
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const u = username.trim().toLowerCase();
  const p = password.trim();

  // Trainer Credentials
  if ((u === "trainer" || u === "trainer@youcan.com" || u === "trainer@notebook.com") && p === "trainer123") {
    return res.json({
      user: {
        id: "trainer-1",
        username: "trainer",
        name: "Trainer",
        role: "trainer",
        email: "trainer@youcan.com",
      },
    });
  }

  // Student Credentials
  if ((u === "student" || u === "student@youcan.com" || u === "student@notebook.com") && p === "student123") {
    return res.json({
      user: {
        id: "student-1",
        username: "student",
        name: "Student",
        role: "student",
        email: "student@youcan.com",
      },
    });
  }

  return res.status(401).json({
    error: "Invalid credentials. Please enter valid Student or Trainer details.",
  });
});

// --- Routes: Daily Notes ---
app.get("/api/notes", (req, res) => {
  const db = readDb();
  // Sort descending by note date, then by creation date
  const sorted = [...(db.notes || [])].sort((a, b) => {
    const dateComp = new Date(b.date || 0) - new Date(a.date || 0);
    if (dateComp !== 0) return dateComp;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
  res.json(sorted);
});

app.post("/api/notes", upload.single("file"), (req, res) => {
  try {
    const db = readDb();
    const {
      title,
      date,
      subject,
      description,
      noteType, // 'file' or 'drive'
      driveUrl,
    } = req.body;

    if (!title || !date) {
      return res.status(400).json({ error: "Title and Date are required." });
    }

    const id = crypto.randomUUID();
    let fileInfo = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const computedType = determineFileType(ext, req.file.mimetype);
      fileInfo = {
        fileName: req.file.originalname,
        storedName: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        format: computedType,
      };
    }

    const newNote = {
      id,
      title: title.trim(),
      date: date.trim(), // YYYY-MM-DD
      subject: (subject || "General").trim(),
      description: (description || "").trim(),
      noteType: noteType === "drive" ? "drive" : "file",
      driveUrl: noteType === "drive" ? (driveUrl || "").trim() : null,
      file: fileInfo,
      createdAt: new Date().toISOString(),
    };

    db.notes = db.notes || [];
    db.notes.unshift(newNote);
    writeDb(db);

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to upload note." });
  }
});

app.delete("/api/notes/:id", (req, res) => {
  try {
    const db = readDb();
    const noteIndex = (db.notes || []).findIndex((n) => n.id === req.params.id);

    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found." });
    }

    const [deleted] = db.notes.splice(noteIndex, 1);

    // If there was a physical file, clean it up from disk
    if (deleted.file && deleted.file.storedName) {
      const filePath = path.join(UPLOADS_DIR, deleted.file.storedName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn("Could not delete physical file:", err);
        }
      }
    }

    writeDb(db);
    res.json({ message: "Note deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note." });
  }
});

// --- Routes: Interview Questions ---
app.get("/api/questions", (req, res) => {
  const db = readDb();
  res.json(db.interviewQuestions || []);
});

app.post("/api/questions", upload.single("file"), (req, res) => {
  try {
    const db = readDb();
    const {
      question,
      category,
      difficulty,
      answer,
      attachmentType, // 'none' | 'file' | 'drive'
      driveUrl,
    } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question text is required." });
    }

    const id = crypto.randomUUID();
    let fileInfo = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const computedType = determineFileType(ext, req.file.mimetype);
      fileInfo = {
        fileName: req.file.originalname,
        storedName: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        format: computedType,
      };
    }

    const newQuestion = {
      id,
      question: question.trim(),
      category: (category || "Frontend").trim(),
      difficulty: (difficulty || "Medium").trim(),
      answer: (answer || "").trim(),
      attachmentType: attachmentType || (req.file ? "file" : driveUrl ? "drive" : "none"),
      driveUrl: driveUrl ? driveUrl.trim() : null,
      file: fileInfo,
      createdAt: new Date().toISOString(),
    };

    db.interviewQuestions = db.interviewQuestions || [];
    db.interviewQuestions.unshift(newQuestion);
    writeDb(db);

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Failed to create question." });
  }
});

app.delete("/api/questions/:id", (req, res) => {
  try {
    const db = readDb();
    const qIndex = (db.interviewQuestions || []).findIndex((q) => q.id === req.params.id);

    if (qIndex === -1) {
      return res.status(404).json({ error: "Question not found." });
    }

    const [deleted] = db.interviewQuestions.splice(qIndex, 1);

    // If there was an attached physical file, delete it from uploads folder
    if (deleted.file && deleted.file.storedName) {
      const filePath = path.join(UPLOADS_DIR, deleted.file.storedName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn("Could not delete physical file:", err);
        }
      }
    }

    writeDb(db);
    res.json({ message: "Question deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Failed to delete question." });
  }
});

// --- Routes: Student Study Documents ---
app.get("/api/student-documents", (req, res) => {
  const db = readDb();
  let list = db.studentDocuments || [];
  const requestedUser = req.query.user;
  if (requestedUser) {
    list = list.filter(
      (d) =>
        d.uploadedBy &&
        d.uploadedBy.toLowerCase() === requestedUser.trim().toLowerCase()
    );
  }
  const sorted = [...list].sort((a, b) => {
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });
  res.json(sorted);
});

app.post("/api/student-documents", upload.single("file"), (req, res) => {
  try {
    const db = readDb();
    const {
      title,
      subject,
      description,
      documentType, // 'file' or 'drive'
      driveUrl,
      uploadedBy,
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Document title is required." });
    }

    const id = crypto.randomUUID();
    let fileInfo = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const computedType = determineFileType(ext, req.file.mimetype);
      fileInfo = {
        fileName: req.file.originalname,
        storedName: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        format: computedType,
      };
    }

    const newDoc = {
      id,
      title: title.trim(),
      subject: (subject || "General").trim(),
      description: (description || "").trim(),
      documentType: documentType === "drive" ? "drive" : "file",
      driveUrl: documentType === "drive" ? (driveUrl || "").trim() : null,
      file: fileInfo,
      uploadedBy: (uploadedBy || "Student").trim(),
      createdAt: new Date().toISOString(),
    };

    db.studentDocuments = db.studentDocuments || [];
    db.studentDocuments.unshift(newDoc);
    writeDb(db);

    res.status(201).json(newDoc);
  } catch (error) {
    console.error("Error creating student document:", error);
    res.status(500).json({ error: "Failed to upload student study document." });
  }
});

app.delete("/api/student-documents/:id", (req, res) => {
  try {
    const db = readDb();
    const docIndex = (db.studentDocuments || []).findIndex((d) => d.id === req.params.id);

    if (docIndex === -1) {
      return res.status(404).json({ error: "Study document not found." });
    }

    const [deleted] = db.studentDocuments.splice(docIndex, 1);

    // If there was a physical file, clean it up from disk
    if (deleted.file && deleted.file.storedName) {
      const filePath = path.join(UPLOADS_DIR, deleted.file.storedName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn("Could not delete physical file:", err);
        }
      }
    }

    writeDb(db);
    res.json({ message: "Study document deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting study document:", error);
    res.status(500).json({ error: "Failed to delete study document." });
  }
});

app.listen(PORT, () => {
  console.log(`YouCan Backend JSON Database server running on http://localhost:${PORT}`);
});
