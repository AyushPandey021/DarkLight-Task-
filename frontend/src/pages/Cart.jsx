import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map((item) => (
        <div
          key={item.productId._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{item.productId.title}</h3>
          <p>Quantity: {item.quantity}</p>

          <button
            onClick={() => removeFromCart(item.productId._id)}
            style={{ background: "red", color: "#fff" }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
