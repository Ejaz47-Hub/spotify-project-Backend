import musicModel from "../models/music.model.js";
import jwt, { decode } from "jsonwebtoken"
import uploadFile from "../services/storage.service.js";
import albumModel from "../models/album.model.js";

async function createMusic(req,res){
     const token = req.cookies.token;

     if(!token){
      return  res.status(401).json({message : "Unautorized"})
     }

     try {
      const decoded =  jwt.verify(token, process.env.JWT_SECRET)

      if(decoded.role !== "artist"){
        return res.status(403).json({message : "Unaccess creating music"})
      }
    
      
     const {title} = req.body
     const file = req.file;

     const result = await uploadFile(file.buffer.toString('base64'))

     const music = await musicModel.create({
      uri : result.url,
      title,
      artist : decoded.id
     })

     res.status(201).json({
      message:"Music is created",
      music:{
        id : music._id,
        uri : music.uri,
        title : music.title,
        artist: music.artist
      }
    
     })
    }  catch (error) {
        return res.status(401).json({message : "Unauthorized"})
     }
    

   
     
}

async function  createAlbum(req,res) {
  const token = req.cookies.token;

  if (!token){
    return res.status(401).json({message : "Unauthorized"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(decoded.role !== "artist"){
      return res.status(403).json({message : "Unable to create album"})
    }

    const {title, musics} = req.body

    const album = await albumModel.create({
      title,
      artist:decoded.id,
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
  } catch (error) {
    console.log(error);
     return res.status(401).json({message : "Unauthorized"})
  }

  
}

export {createMusic,createAlbum};