import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MyForm = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state;
  const [data, setData] = useState({
    name: "",
    email: "",
    imgurl: "",
  });
  useEffect(() => {
    if (editData) {
      setData({
        name: editData.name,
        email: editData.email,
        imgurl: editData.imgurl,
      });
    }
  }, [editData]);

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    let response;

    if (editData && editData._id) {
      // Update request
      response = await fetch(`http://localhost:3000/update/${editData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      // Create request
      response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    if (response.ok) {
      console.log("Success:", await response.json());
      navigate("/"); // ✅ Go to home after success
    } else {
      console.error("Server error:", response.status);
    }
  } catch (e) {
    console.error("Error:", e.message);
  }
};

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Contact Form
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              onChange={(event) =>
                setData({ ...data, name: event.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              onChange={(event) =>
                setData({ ...data, email: event.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="imgurl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              value={data.imgurl}
              type="text"
              id="imgurl"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter img url"
              onChange={(e) => setData({ ...data, imgurl: e.target.value })}
            />
          </div>

          <div></div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyForm;
