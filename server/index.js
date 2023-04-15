import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import { connectDB } from "./config/database.js";
import dalleRouter from "./routes/dalleRoute.js";
import postRouter from "./routes/postRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E! 😍");
});

app.use("/api/v1/post", postRouter);
app.use("/api/v1/dalle", dalleRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Server started at port:8080");
    });
  } catch (error) {
    console.log("error:", error);
  }
};

startServer();
