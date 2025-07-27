import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // ✅ Save token to localStorage
        localStorage.setItem("token", result.token);

        // Optionally save user data
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect to dashboard
        navigate("/");
      } else {
        alert(result.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-800 p-8 rounded-lg shadow-lg w-[400px] flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Login</h2>
        <input
          className="px-4 py-2 border rounded"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          className="px-4 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 p-2 rounded text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
