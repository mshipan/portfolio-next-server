import dotenv from "dotenv";
dotenv.config();

import compression from "compression";
import cors from "cors";
import express from "express";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express();

const corsConfig = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// Middlewires
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(compression());

// Root Route
app.get("/", (_req, res) => {
  res.send("Welcome to Portfolio Server");
});

// Routes
app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
