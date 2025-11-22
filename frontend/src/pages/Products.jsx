import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaHeart } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [wishlist, setWishlist] = useState({});


  const { user } = useContext(AuthContext);
const { cart, addToCart } = useContext(CartContext);


  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const loadProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);
  const handleAddToCart = (product) => {
  if (!user) {
    alert("Please login first!");
    return;
  }

  if (cart.some((item) => item._id === product._id)) {
    alert("Already in cart");
    return;
  }

  addToCart(product);
  alert("Added to cart!");
};


  const handleCreate = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/products", form);

    setShowCreate(false);
    setForm({ title: "", description: "", price: "", image: "" });

    loadProducts();
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Create Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow p-4 relative hover:shadow-xl transition"
          >
            <button
              onClick={() =>
                setWishlist({ ...wishlist, [p._id]: !wishlist[p._id] })
              }
              className="absolute right-3 top-3"
            >
              <FaHeart
                className={`text-xl ${
                  wishlist[p._id] ? "text-red-500" : "text-gray-400"
                }`}
              />
            </button>

            <img
              src={p.image}
              alt=""
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-lg font-semibold mt-2">{p.title}</h2>
            <p className="text-gray-600 text-sm">{p.description}</p>
            <p className="text-xl font-bold mt-2">₹{p.price}</p>

            <button
              onClick={() => handleAddToCart(p)}
              className={`w-full mt-3 py-2 rounded text-white ${
                cart.some((item) => item._id === p._id)
                  ? "bg-green-600"
                  : "bg-black hover:bg-gray-900"
              }`}
            >
              {cart.some((item) => item._id === p._id)
                ? "Added"
                : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>

      {/* Create Product Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleCreate}
            className="bg-white p-6 rounded-xl w-96"
          >
            <h2 className="text-xl font-bold mb-4">Create Product</h2>

            <input
              type="text"
              placeholder="Title"
              className="w-full mb-3 p-2 border rounded"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              type="text"
              placeholder="Description"
              className="w-full mb-3 p-2 border rounded"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              className="w-full mb-3 p-2 border rounded"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              type="text"
              placeholder="Image URL"
              className="w-full mb-3 p-2 border rounded"
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Create
            </button>

            <button
              onClick={() => setShowCreate(false)}
              type="button"
              className="w-full mt-2 py-2 border rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
