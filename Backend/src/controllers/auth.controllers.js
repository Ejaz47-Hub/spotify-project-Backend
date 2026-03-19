import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

async function registerUser(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;
        console.log("Registering user:", { username, email, role });

        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExists) {
            console.log("Registration failed: User already exists");
            return res.status(409).json({ message: "User Already Exists" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        });

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'lax' });

        return res.status(201).json({
            message: "User created Successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;
        console.log("Login attempt:", { username, email });

        const query = {};
        if (email) query.email = email;
        else if (username) query.username = username;

        if (!query.email && !query.username) {
            return res.status(400).json({ message: "Username or Email is required" });
        }

        const user = await userModel.findOne({
            $or: [
                query.username ? { username: query.username } : null,
                query.email ? { email: query.email } : null
            ].filter(Boolean)
        });

        if (!user) {
            console.log("Login failed: User not found");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log("Login failed: Incorrect password");
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'lax' });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token");
    return res.status(200).json({ message: "User Logged out successfully" });
}
export {registerUser,loginUser, logoutUser} ;