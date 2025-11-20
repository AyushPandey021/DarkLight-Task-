require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db.js");

const productRoutes = require("./src/routes/productRoutes.js");
const userRoutes = require("./src/routes/userRoutes.js");
const cartRoutes = require("./src/routes/cartRoutes.js");

const app = express();
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
