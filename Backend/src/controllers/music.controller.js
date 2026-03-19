import musicModel from "../models/music.model.js";
import jwt, { decode } from "jsonwebtoken"
import uploadFile from "../services/storage.service.js";
import albumModel from "../models/album.model.js";
import fs from "fs";

async function createMusic(req, res) {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No music file provided" });
    }

    if (!title) {
        return res.status(400).json({ message: "Song title is required" });
    }

    console.log("Music creation started for title:", title);
    if (file) {
      console.log("File received:", file.originalname, "Size:", file.size);
    }

    console.log("Starting upload to ImageKit...");
    const fileStream = fs.createReadStream(file.path);
    const result = await uploadFile(fileStream);
    console.log("ImageKit upload successful. URL:", result.url);

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: req.user.id
    });

    console.log("Music record created in database with ID:", music._id);

    return res.status(201).json({
      message: "Music is created",
      music: {
        id: music._id,
        uri: music.uri,
        title: music.title,
        artist: music.artist
      }
    });
  } catch (error) {
    console.error("DEBUG: Error creating music:", error);
    if (error.stack) console.error("DEBUG: Error Stack:", error.stack);
    return res.status(500).json({ message: "Internal server error during upload" });
  } finally {
    // Always clean up temporary file from disk if it exists
    if (file && file.path && fs.existsSync(file.path)) {
      try {
        fs.unlinkSync(file.path);
        console.log("Temporary file cleaned up from disk (finally).");
      } catch (err) {
        console.error("DEBUG: Error deleting temp file:", err);
      }
    }
  }
}

async function  createAlbum(req,res) {
  

    const {title, musics} = req.body

    const album = await albumModel.create({
      title,
      artist:req.user.id,
      musics : musics
    })

    res.status(201).json({message:"Album created",
      album:{
        id:album._id,
        title:album.title,
        artist:album.artist,
        musics:album.musics
      }
    }) 
}

async function getAllMusics(req,res){
  const musics = await musicModel.find().populate("artist","-password")
  res.status(200).json({
    message : "Musics fetched successfully",
    musics : musics
  })
}

async function getAllAlbums(req,res){
  const albums = await albumModel.find().populate("artist","-password").populate("musics");

  res.status(200).json({
    message : "Album fetched successfully",
    albums:albums
  })
}

async function getAlbumById(req,res){
  const albumId = req.params.albumId;
  const album = await albumModel.findById(albumId).populate("artist","username email").populate("musics")

  return res.status(200).json({
    message : "Album fetched successfully",
    album : album
  })

}

export {createMusic,createAlbum, getAllMusics,getAllAlbums, getAlbumById};