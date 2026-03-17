import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

async function registerUser(req,res){
    const {username,email,password,role = "user"} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })
    if (isUserAlreadyExists){
        return res.status(409).json({messags : "User Already EXists"})
    }
    if(!password){
     return res.status(401).json({message:"Enter the password"})
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password : hash,
        role
    })

    const token = jwt.sign({
        id : user._id,
        role : user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(201).json({message : "User created Successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })
    


}

async function loginUser(req,res) {
    const {username,email,password} = req.body;
      

    const user = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({message : "Invalid credential"})
    }
    
    const isPasswordValid  = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid credential "
        })
    }

    const token = jwt.sign({id : user._id,
        role : user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)
    res.status(200).json({
        message : "User logged in sucessfully",
        user:{
            id : user._id,
            username: user.username,
            email : user.email,
            role : user.role
        }
    })
}

async function logoutUser(req,res){
    res.clearCookie("token")
        res.status(200).json({message : "User Logged out successfully"})
}
export {registerUser,loginUser, logoutUser} ;