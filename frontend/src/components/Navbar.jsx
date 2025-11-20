import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "15px", background: "#111", color: "#fff" }}>
      <h2 style={{ display: "inline-block", marginRight: "20px" }}>
        DarkLight Products
      </h2>

      <Link to="/" style={{ marginRight: "20px", color: "#fff" }}>Products</Link>
      <Link to="/cart" style={{ marginRight: "20px", color: "#fff" }}>Cart</Link>

      {user ? (
        <button onClick={logout} style={{ background: "red", color: "#fff" }}>
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ color: "#fff" }}>Login</Link>
      )}
    </nav>
  );
}
