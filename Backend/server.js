import app from "./src/app.js";
import dotenv from "./dotenv.js";
import connectDB from "./src/db/db.js";

connectDB()



const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

server.timeout = 600000; // 10 minutes