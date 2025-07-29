import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
   const [data, setData] = useState({ email: "", password: "" });
  const handleRegisterSubmit  = async (event) => {
    event.preventDefault();
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted:", data);
   try {
      const response = await fetch("http://localhost:3000/users/login", {
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
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="mb-12 pt-8">
        <h1 className="text-2xl font-semibold text-gray-800 px-4">Scatch</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Registration Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-800 mb-2">
                welcome to{" "}
                <span className="text-blue-500 font-medium">Scatch</span>
              </h2>
              <p className="text-gray-600 text-lg">create your account</p>
            </div>

            <form onSubmit={handleRegisterSubmit}>
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"

                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"

                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"

                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 px-8 py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Create My Account
              </button>
            </form>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-medium text-gray-800 mb-6">
                Login Your Account
              </h2>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-lg text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 px-8 py-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Login
              </button>
            </form>

            {/* Additional login options */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 text-sm transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
