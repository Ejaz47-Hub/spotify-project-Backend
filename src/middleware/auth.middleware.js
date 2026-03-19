import jwt, { decode } from "jsonwebtoken"

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "Access denied: Artist role required" });
        }
        req.user = decoded;
        return next();

    } catch (error) {
        console.log("Auth error (Artist):", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Allow both 'user' and 'artist' to access 'user' routes
        if (decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({ message: "Access denied: User role required" });
        }

        return next();

    } catch (error) {
        console.log("Auth error (User):", error.message);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

export {authArtist,authUser} ;