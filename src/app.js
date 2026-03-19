import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import router from "./routes/auth.routes.js"
import Musicrouter from "./routes/music.routes.js"

const app = express()
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cookieParser())


app.use('/api/auth', router)
app.use('/api/music', Musicrouter)


export default app