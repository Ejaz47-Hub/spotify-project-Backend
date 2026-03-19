import express from "express"
import cookieParser from "cookie-parser"
import router from "./routes/auth.routes.js"
import Musicrouter from "./routes/music.routes.js"

const app = express()
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://spotify-project-backend.vercel.app",
  "https://spotify-project-backend-ejaz47-hubs-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())


app.use('/api/auth', router)
app.use('/api/music', Musicrouter)


export default app