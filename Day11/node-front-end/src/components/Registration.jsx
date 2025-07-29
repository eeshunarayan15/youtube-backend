import { useNavigate } from "react-router-dom";
import App from "../App.jsx";
import { useState } from "react";

const Registration = () => {
const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: "",
        email: "",
        age: ""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);


        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // if (response.ok) {
        //     const result = await response.json();
        //     console.log("Registration successful:", result);
        //     navigate("/"); // Redirect to home page after successful registration
        //     // Optionally, redirect to login or home page
        // } else {
        //     const error = await response.json();
        //     console.error("Registration failed:", error);
        //     navigate('/register'); // Redirect to registration page on error
        //     alert("Registration failed. Please try again.");
      // }

    
  if (response.ok) {
    // ✅ Save token and redirect
    const result = await response.json();
    localStorage.setItem("token", result.token);
    console.log("Registered and logged in:", result);
    navigate("/dashboard"); // or /home
  } else {
        const error = await response.json();
        console.error("Registration failed:", error);
        navigate('/register'); // Redirect to registration page on error
        alert("Registration failed. Please try again.");
  }
      
      
    }
    return (
      <div className="container  text-white flex items-center justify-center h-screen bg-zinc-900">
            <form
                onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-[500px] gap-4 p-4 bg-zinc-800 rounded-lg shadow-lg w-[500px]"
          action=""
        >
          <input
            className="outline-none border   border-gray-300 focus:border-blue-500 rounded-md px-20 py-2"
            type="text"
                    placeholder="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <input
            className="outline-none border  border-gray-300 focus:border-blue-500 rounded-md px-20 py-2"
            type="password"
            placeholder="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <input
            className="outline-none border  border-gray-300 focus:border-blue-500 rounded-md px-20 py-2"
            type="email"
            placeholder="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            className="outline-none border  border-gray-300 focus:border-blue-500 rounded-md px-20 py-2"
            type="text"
            placeholder="age"
            value={data.age}
            onChange={(e) => setData({ ...data, age: e.target.value })}
          />
          <button className="bg-blue-500 p-2  rounded-md px-30 py-2   ">
            Register
          </button>
          <p className="text-red-500">
            Already have an account?{" "}
            <span className="text-blue-500">Login</span>
          </p>
        </form>
      </div>
    );
}
export default Registration;