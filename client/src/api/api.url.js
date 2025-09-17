// apiurl.js
export const API_URLS = {
  saveSentEmail: { endpoint: "save", method: "POST" },
  getEmail: { endpoint: "emails", method: "GET" }, // keep it just 'emails'
  saveDraftEmails: { endpoint: "save-draft", method: "POST" },
  moveToBin: { endpoint: "bin", method: "POST" },
  starredEmail: { endpoint: "starred", method: "POST" },
  deleteEmail: { endpoint: "delete", method: "DELETE" },
};

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
