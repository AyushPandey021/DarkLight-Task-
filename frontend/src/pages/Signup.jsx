import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // input handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // signup api call
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/user/signup", formData);

      setSuccess(res.data.message || "Signup successful!");
      setError("");

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess("");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSignup}>
        <h2>Signup</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.btn}>Signup</button>

        {/* Alerts */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default Signup;

// Basic styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  btn: {
    padding: "10px",
    background: "black",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};
