import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);          // Add to cart
router.get("/:userId", getCart);         // Get cart items
router.post("/remove", removeFromCart);  // Remove from cart

export default router;
