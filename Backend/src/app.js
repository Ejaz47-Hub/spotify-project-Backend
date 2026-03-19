import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/auth.routes.js";
import Musicrouter from "./routes/music.routes.js";

const app = express();

// ✅ CORS FIX (BEST VERSION)
app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin || // Postman / server-to-server
      origin.includes("vercel.app") || // ✅ allow ALL vercel deployments
      origin.includes("localhost")     // ✅ allow local dev
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ✅ VERY IMPORTANT: handle preflight requests
app.options("*", cors());

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', router);
app.use('/api/music', Musicrouter);

export default app;