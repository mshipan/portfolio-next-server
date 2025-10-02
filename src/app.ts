import compression from "compression";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

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

// Root Route
app.get("/", (_req, res) => {
  res.send("Welcome to Portfolio Server");
});

// Routes

app.use(globalErrorHandler);
app.use(notFound);

export default app;
