import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/recipes");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
      else throw new Error("Invalid response from server");

      alert("Login Successful!");
      navigate("/recipes");

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={{
      margin: 0,
      fontFamily: "Arial",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      
      <div style={{
        width: "100%",
        maxWidth: "300px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        
        <h1>Login</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
            style={{
              margin: "5px 0",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            required
            style={{
              margin: "5px 0",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px",
              cursor: "pointer",
              border: "none",
              backgroundColor: "#333",
              color: "white",
              borderRadius: "5px",
              marginTop: "10px"
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate('/register')}
            style={{
              border: "none",
              background: "none",
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            Register here
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;
