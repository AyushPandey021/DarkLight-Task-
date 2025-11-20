const Product = require("../models/Product.js");

// ------- Create Product -------
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      image,
    });

    res.json({ msg: "Product created", product });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ------- Get All Products -------
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ------- Get Product By ID -------
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product)
      return res.status(404).json({ msg: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ------- Update Product -------
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updated = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    res.json({ msg: "Product updated", updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ------- Delete Product -------
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.findByIdAndDelete(productId);

    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
