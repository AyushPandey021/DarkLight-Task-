import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Fetch user cart
  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      return;
    }

    try {
      const res = await api.get(`/cart/${user._id}`);

      console.log("Cart Fetch Response:", res.data); // DEBUG

      // Accept any backend format
      const items =
        res.data.items ||
        res.data.cart?.items ||
        res.data.cart ||
        [];

      setCart(items);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    if (!user) {
      alert("Please login to add items");
      return;
    }

    try {
      const res = await api.post("/cart/add", {
        userId: user._id,
        productId: product._id,
        quantity: 1,
      });

      console.log("Add Cart Response:", res.data);

      fetchCart(); // Refresh cart
    } catch (err) {
      console.log("Add to cart error:", err);
    }
  };

  // Remove item
  const removeFromCart = async (productId) => {
    try {
      const res = await api.post("/cart/remove", {
        userId: user._id,
        productId,
      });

      console.log("Remove Response:", res.data);

      fetchCart();
    } catch (err) {
      console.log("Remove cart item error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
