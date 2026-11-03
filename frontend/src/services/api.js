const BASE_URL = "/api";

export const api = {
  // --- Authentication ---
  async login(username, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }
    return data.user;
  },

  // --- Daily Notes ---
  async getNotes() {
    const res = await fetch(`${BASE_URL}/notes`);
    if (!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
  },

  async uploadNote(formData) {
    const res = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      body: formData, // FormData contains file or noteType
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to upload note");
    }
    return res.json();
  },

  async deleteNote(id) {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete note");
    return res.json();
  },

  // --- Interview Questions ---
  async getQuestions() {
    const res = await fetch(`${BASE_URL}/questions`);
    if (!res.ok) throw new Error("Failed to fetch interview questions");
    return res.json();
  },

  async createQuestion(data) {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    const res = await fetch(`${BASE_URL}/questions`, {
      method: "POST",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to create question");
    }
    return res.json();
  },

  async deleteQuestion(id) {
    const res = await fetch(`${BASE_URL}/questions/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete question");
    return res.json();
  },

  // --- Student Study Documents ---
  async getStudentDocuments(username) {
    const url = username
      ? `${BASE_URL}/student-documents?user=${encodeURIComponent(username)}`
      : `${BASE_URL}/student-documents`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch student study documents");
    return res.json();
  },

  async uploadStudentDocument(formData) {
    const res = await fetch(`${BASE_URL}/student-documents`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Failed to upload study document");
    }
    return res.json();
  },

  async deleteStudentDocument(id) {
    const res = await fetch(`${BASE_URL}/student-documents/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete study document");
    return res.json();
  },
};
