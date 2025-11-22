import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (authLoading) return; // WAIT
    if (!user || !user._id) {
      setCart([]);
      return;
    }

    try {
      const res = await api.get(`/cart/${user._id}`);
      setCart(res.data.items || []);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  const addToCart = async (product) => {
    if (!user || !user._id) {
      alert("Please login first!");
      return;
    }

    await api.post("/cart/add", {
      userId: user._id,
      productId: product._id,
      quantity: 1,
    });

    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [user, authLoading]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
