import express from "express";
import {createMusic,createAlbum, getAllMusics, getAllAlbums, getAlbumById} from "../controllers/music.controller.js";
import {authArtist,authUser} from "../middleware/auth.middleware.js";
import multer from "multer";

const upload = multer({ dest: 'uploads/' })





const Musicrouter = express.Router()


Musicrouter.post("/upload",authArtist,upload.single("music"),createMusic)
Musicrouter.post("/album",authArtist,createAlbum)

Musicrouter.get("/",authUser,getAllMusics)

Musicrouter.get("/album", authUser, getAllAlbums)

Musicrouter.get("/albums/:albumId",authUser,getAlbumById)


export default Musicrouter;