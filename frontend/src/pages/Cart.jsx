import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  // Total calculation
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold">🛒 Your Cart is Empty</h2>
        <p className="text-gray-600 mt-2">Add items to continue shopping.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🛍 Shopping Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center bg-white p-4 rounded-2xl shadow-lg"
          >
            {/* Product Image */}
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-24 h-24 object-cover rounded-xl"
            />

            {/* Details */}
            <div className="ml-4 flex-1">
              <h2 className="text-xl font-semibold">{item.product.title}</h2>
              <p className="text-gray-600 text-sm">
                {item.product.description}
              </p>

              {/* Price */}
              <p className="text-lg font-bold mt-2 text-blue-600">
                ₹{item.product.price}
              </p>

              {/* Quantity */}
              <div className="mt-3">
                <span className="text-lg font-semibold">
                  Qty: {item.quantity}
                </span>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="mt-3 text-red-500 underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-8 text-right">
        <h2 className="text-3xl font-bold">
          Total Amount:{" "}
          <span className="text-green-600">₹{totalPrice}</span>
        </h2>
      </div>
    </div>
  );
}
