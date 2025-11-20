const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController.js");

const router = express.Router();

// Signup route
router.post("/signup", signupUser);

// Login route
router.post("/login", loginUser);

module.exports = router;
