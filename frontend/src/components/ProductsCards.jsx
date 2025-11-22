import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-900 rounded-xl p-4 shadow-lg hover:shadow-2xl transition relative border border-gray-700">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-56 object-cover rounded-lg"
      />

      {/* ❤️ Heart Button */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 text-2xl transition"
      >
        <span className={liked ? "text-red-500" : "text-gray-300"}>♥</span>
      </button>

      <h3 className="text-lg font-bold text-white mt-3">{product.title}</h3>
      <p className="text-gray-400 text-sm mt-1">{product.description}</p>

      <p className="text-xl font-semibold text-cyan-400 mt-3">
        ₹{product.price}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded-lg transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
