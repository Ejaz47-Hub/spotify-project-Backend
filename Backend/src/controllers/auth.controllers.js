import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 🔥 COMMON COOKIE OPTIONS (reuse everywhere)
const cookieOptions = {
  httpOnly: true,
  secure: true,        // ✅ REQUIRED for HTTPS (Render)
  sameSite: "None",    // ✅ REQUIRED for cross-origin (Vercel ↔ Render)
};

// ================= REGISTER =================
async function registerUser(req, res) {
  try {
    const { username, email, password, role = "user" } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
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

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // ✅ SET COOKIE (FIXED)
    res.cookie("token", token, cookieOptions);

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

// ================= LOGIN =================
async function loginUser(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
      $or: [
        username ? { username } : null,
        email ? { email } : null
      ].filter(Boolean)
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // ✅ SET COOKIE (FIXED)
    res.cookie("token", token, cookieOptions);

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

// ================= LOGOUT =================
async function logoutUser(req, res) {
  res.clearCookie("token", cookieOptions); // ✅ FIXED
  return res.status(200).json({ message: "User Logged out successfully" });
}

export { registerUser, loginUser, logoutUser };