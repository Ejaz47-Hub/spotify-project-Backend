import express from "express"
import cookieParser from "cookie-parser"
import router from "./routes/auth.routes.js"
import Musicrouter from "./routes/music.routes.js"

const app = express()
import cors from "cors";

app.use(cors({
  origin: "https://spotify-project-backend.vercel.app", // ⚠️ replace with your real URL
  credentials: true
}));
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())


app.use('/api/auth', router)
app.use('/api/music', Musicrouter)


export default app