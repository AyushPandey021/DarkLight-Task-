const Cart = require("../models/Cart");

// -------- Add to Cart --------
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    // Create new cart if user has no cart yet
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, qty: 1 }],
      });

      return res.json({ msg: "Product added to cart", cart });
    }

    // If product already exists, increase qty
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += 1;
    } else {
      cart.items.push({ product: productId, qty: 1 });
    }

    await cart.save();
    res.json({ msg: "Added to cart", cart });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// -------- Get Cart --------
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// -------- Remove Item --------
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.json({ msg: "Cart is empty" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json({ msg: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
