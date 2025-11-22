import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json({
      message: "Signup successful",
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2) Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // 3) Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
