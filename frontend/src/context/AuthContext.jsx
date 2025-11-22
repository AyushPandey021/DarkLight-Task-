import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setCart([]);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const newCart = [...prev, product];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart }}>
      {children}
    </AuthContext.Provider>
  );
};
