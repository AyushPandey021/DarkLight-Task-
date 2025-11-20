import React from 'react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div
      style={{
        width: "250px",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "10px",
        background: "#f5f5f5",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />

      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <strong>₹{product.price}</strong>

      <button
        onClick={() => onAdd(product)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          background: "black",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}


