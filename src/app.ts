import compression from "compression";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const corsConfig = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// Middlewires
app.use(express.json());
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(compression());

app.get("/", (_req, res) => {
  res.send("Welcome to Portfolio Server");
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found.",
  });
});

export default app;
