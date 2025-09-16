import express from "express";
import connect from "./config/db.js";
import routes from "./routes/route.js";
import cors from "cors";
import path from "path";

const app = express();

// Use Render's PORT environment variable or fallback to 3001 locally
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use("/api", routes);

// Serve React Frontend
const __dirname = path.resolve(); // Get current directory
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// Start server and connect to MongoDB
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connect();
  console.log("MongoDB connected");
});
