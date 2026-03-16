import ImageKit from "@imagekit/nodejs";
import dotenv from "../../dotenv.js";
const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(file){
    const result = await imagekit.files.upload({
        file,
        fileName:"music_" + Date.now(),
        folder : "yt-complete-backend/music"
    })
    return result
}

export default uploadFile;