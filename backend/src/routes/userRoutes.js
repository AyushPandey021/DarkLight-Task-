import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Signup route
router.post("/signup", signupUser);

// Login route
router.post("/login", loginUser);

export default router;
