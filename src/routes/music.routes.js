import express from "express";
import {createMusic,createAlbum} from "../controllers/music.controller.js";
import multer from "multer";

const upload = multer({storage:multer.memoryStorage()})





const Musicrouter = express.Router()


Musicrouter.post("/upload",upload.single("music"),createMusic)
Musicrouter.post("/album",createAlbum)



export default Musicrouter;