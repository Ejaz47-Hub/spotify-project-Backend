import ImageKit from "@imagekit/nodejs";
import dotenv from "../../dotenv.js";
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file){
    try {
        console.log("ImageKit upload began...");
        const result = await imagekit.files.upload({
            file,
            fileName:"music_" + Date.now(),
            folder : "yt-complete-backend/music"
        })
        console.log("ImageKit upload finished successfully.");
        return result
    } catch (error) {
        console.error("DEBUG: ImageKit upload error:", error);
        throw error;
    }
}

export default uploadFile;