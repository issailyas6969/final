import express from "express";
import connect from "./config/db.js";
import routes from "./routes/route.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.listen(3001, async () => {
  console.log("server running on port ${PORT}");
  await connect();
  console.log("mongoDB connected");
});
