import { useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CreateProduct() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // 🚫 PROTECT PAGE FROM UNAUTHORISED USER
  useEffect(() => {
    if (!user) {
      alert("Please login to create products");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleCreate = async () => {

    // Extra safety → prevent function running if user missing
    if (!user) {
      alert("You must be logged in.");
      return;
    }

    // simple validation
    if (!title || !description || !price || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post(
        "/products",
        { title, description, price, image },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      alert("Product Created!");
      navigate("/");
    } catch (err) {
      console.log("Create error:", err);
      alert("Failed to create product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Product</h2>

      <div className="flex flex-col gap-4">

        <input
          className="border p-2 rounded"
          placeholder="Product Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          disabled={!user}
          className={`py-2 rounded text-white ${
            user
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleCreate}
        >
          {user ? "Create Product" : "Login Required"}
        </button>
      </div>
    </div>
  );
}
0