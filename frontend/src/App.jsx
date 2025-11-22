import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
                    <Route path="/create-product" element={<CreateProduct />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
