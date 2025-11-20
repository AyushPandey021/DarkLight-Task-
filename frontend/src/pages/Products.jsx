import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductsCards";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onAdd={addToCart} />
      ))}
    </div>
  );
}
