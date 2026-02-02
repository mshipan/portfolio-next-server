"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
const corsConfig = {
    origin: ["http://localhost:3000", "http://192.168.0.111:3000"],
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};
// Middlewires
app.use((0, express_session_1.default)({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.set("trust proxy", 1);
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsConfig));
app.options("", (0, cors_1.default)(corsConfig));
app.use((0, compression_1.default)());
// Root Route
app.get("/", (_req, res) => {
    res.send("Welcome to Portfolio Server");
});
// Routes
app.use("/api/v1", routes_1.router);
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map