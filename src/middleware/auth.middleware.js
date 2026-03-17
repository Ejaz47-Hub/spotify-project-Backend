import jwt, { decode } from "jsonwebtoken"

async function authArtist(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role != "artist"){
            return res.status(403).json({message : "you dont hav access"})
        }
        req.user = decoded ;

        next()
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message : "unauthorized"})
        
    }
}

async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        res.status(401).json({message : "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded

        if(decoded.role !== "user"){
            return res.status(403).json({message : "You dont have access"})
        }

        next()

    } catch (error) {
        console.log(error);
     res.status(401).json({message : "Unauthorized"})   
    }
}

export {authArtist,authUser} ;