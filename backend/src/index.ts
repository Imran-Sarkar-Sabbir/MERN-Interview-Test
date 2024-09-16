import express from "express";
import router from "./routes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use("/", express.static(path.join(__dirname, "..", "..", "build")));
app.use("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
});

const url = process.env.MONGO_URI ?? "";
mongoose.connect(url).then(() => {
  console.log("db uri", url);
});

// app.listen(5500);
export default app;
