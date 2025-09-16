import express from "express";
import connect from "./config/db.js";
import routes from "./routes/route.js";
import cors from "cors";

const app = express();

// Use Render's PORT environment variable or fallback to 3001 locally
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`); // backticks for interpolation
  await connect();
  console.log("mongoDB connected");
});
