import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-950 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h2 className="text-2xl font-bold">DarkLight Store</h2>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-cyan-400 transition">
          Products
        </Link>
        <Link to="/cart" className="hover:text-cyan-400 transition">
          Cart
        </Link>

        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded-lg font-semibold text-black"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
