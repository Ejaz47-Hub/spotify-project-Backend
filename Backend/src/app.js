import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/auth.routes.js";
import Musicrouter from "./routes/music.routes.js";

const app = express();

// ✅ CORS
app.use(cors({
  origin: true, // ✅ allow all (best for now)
  credentials: true,
}));

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', router);
app.use('/api/music', Musicrouter);

export default app;