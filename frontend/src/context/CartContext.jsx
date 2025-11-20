import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!user) return;
    const res = await api.get(`/cart/${user._id}`);
    setCart(res.data.items || []);
  };

  const addToCart = async (product) => {
    const res = await api.post("/cart/add", {
      userId: user._id,
      productId: product._id,
      quantity: 1,
    });
    fetchCart();
  };

  const removeFromCart = async (productId) => {
    await api.post("/cart/remove", {
      userId: user._id,
      productId,
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
