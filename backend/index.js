import express from "express";
import mongoose from "mongoose";
import { port, mongoDBURL } from "./config.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to Full Stack MERN Application!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
