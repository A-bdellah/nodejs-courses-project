// Session 5
// https://www.youtube.com/watch?v=Jdch_NmPmbU&list=PLQtNtS-WfRa8OF9juY3k6WUWayMfDKHK2&index=5&ab_channel=codeZone
dotenv.config();
import dotenv from "dotenv";
import express from "express";
import coursesRouter from "./routes/courses.route.js";
import usersRouter from "./routes/users.route.js";
import httpStatusText from "./utils/httpStatusText.js";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const url = process.env.MONGO_URL;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(url).then(() => {
  console.log("mongodb server started");
});

// Use the router middleware

app.use(cors());

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not available",
  });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on Port: 5000");
});
