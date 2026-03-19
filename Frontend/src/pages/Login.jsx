import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser} from "../utils/api";
const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // ✅ If already logged in, redirect to recipes
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
      // axios.post("http://localhost:4090/api/v1/auth/login", form);

      if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
      else throw new Error("Invalid response from server");

      alert("Login Successful!");
      navigate("/recipes");

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
        <br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={()=>navigate('/register')}>Register here</button></p>
    </div>
  );
};

export default Login;